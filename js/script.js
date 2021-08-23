'use strict';

// TODO: Сделать всё модульно и собирать с помощью webpack
// TODO: Навесить обработчики закрытия форм на них с помощью forEach

document.addEventListener('DOMContentLoaded', () => {
	function modalOpen(modal) {
		modal.classList.remove('modal_hide');
		modal.classList.add('modal_show');
	}

	function modalClose(modal) {
		modal.classList.add('modal_hide');
		modal.classList.remove('modal_show');
	}

	//Modal Register
	const modalRegister = document.querySelector('#register'),
		modalRegisterClose = modalRegister.querySelector('.modal__close'),
		modalRegisterOpen = document.querySelector('.header__register');

	modalRegisterOpen.addEventListener('click', () => {
		modalOpen(modalRegister);
	});

	document.addEventListener('keydown', function(event) {
		if (event.code === 'Escape' && modalRegister.classList.contains('modal_show')) {
			modalClose(modalRegister);
		}
	});

	modalRegister.addEventListener('click', function(event) {
		if (event.target === modalRegister || event.target === modalRegisterClose) {
			modalClose(modalRegister);
		}
	});

	// Modal Login
	const modalLogin = document.querySelector('#login'),
		modalLoginClose = modalLogin.querySelector('.modal__close'),
		modalLoginOpen = document.querySelector('.header__login');

	modalLoginOpen.addEventListener('click', () => {
		modalOpen(modalLogin);
	});

	document.addEventListener('keydown', function(event) {
		if (event.code === 'Escape' && modalLogin.classList.contains('modal_show')) {
			modalClose(modalLogin);
		}
	});

	modalLogin.addEventListener('click', function(event) {
		if (event.target === modalLogin || event.target === modalLoginClose) {
			modalClose(modalLogin);
		}
	});

	//получени всех тасков
	let arrayTasks = [];

	async function getData(url) {
		const myHeaders = new Headers();

		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMzQxMiJ9.95ohW9ypI-87m3P6H-otIpPM-5W2iqeTucSWIdst8OU');

		const res = await fetch(url, {
			method: 'GET',
			headers: myHeaders,
		});

		if (!res.ok) {
			throw new Error(`Не получается обработать fetch ${url}, статус: ${res.status}`);
		}

		return res.json();
	}

	getData('http://localhost:8080/api/tasks')
		.then((res) => {
			arrayTasks = res;
		}).catch((error) => {
			console.log(error);
		});

	//modal add 
	const modalAdd = document.querySelector('#add'),
		  modalAddClose = modalAdd.querySelector('.modal__close'),
		  modalAddOpen = document.querySelector('.main__add-tasks');

	//настройка запроса, посыл запроса на сервер и получение ответа
	async function postData(url, data) {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				"alg": "HS256",
  				"typ": "JWT",
				"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMzQxMiJ9.95ohW9ypI-87m3P6H-otIpPM-5W2iqeTucSWIdst8OU"
			},
			mode: 'cors',
			body: data
		});

		return await res;
	}

	modalAddOpen.addEventListener('click', () => {
		modalOpen(modalAdd);
	});

	document.addEventListener('keydown', function(event) {
		if (event.code === 'Escape' && modalAdd.classList.contains('modal_show')) {
			modalClose(modalAdd);
		}
	});

	modalAdd.addEventListener('click', function(event) {
		if (event.target === modalAdd || event.target === modalAddClose) {
			modalClose(modalAdd);
		}
	});

	modalAdd.addEventListener('submit', function(event) {
		event.preventDefault();

		const form = modalAdd.querySelector('form');

		//конструкция данных из форм
		const formData = new FormData(form);

		//Превращение данных в матрицу, потом в объект.
		let json = Object.fromEntries(formData.entries());

		//обработка строк для человеческого вида, если пользователь страдает от психических расстройств и вводит не пойми что
		json.name = S(`${json.name}`).replaceAll('_', '').s;
		json.description = S(`${json.description}`).replaceAll('_', '').s;
		json.name = S(`${json.name}`).humanize().s;
		json.description = S(`${json.description}`).humanize().s;

		//превращение данных в json
		json = JSON.stringify(json);

		console.log(json);

		//обработка промиса
		postData('http://localhost:8080/api/create-task', json)
			.then((res) => {
				if (res.status === 200) {
					alert('Успешно отправлено!');
				} else {
					alert(`Отправка данных не произошла, код ошибки ${res.status}`)
				}
			}).catch((error) => {
				alert('Все плохо!');
				console.log(error);
			}).finally(() => {
				form.reset();
			});
	});
	
	// раскрытие таска 
	let tasksTitle = document.querySelectorAll('.main__task-title');
	let tasksDescr = document.querySelectorAll('.main__task-block-two');

	tasksDescr.forEach(function(item) {
		item.style.display = 'none';
	});

	tasksTitle.forEach(function(item) {
		item.addEventListener('click', () => {
			let itemDescr = tasksDescr[item.dataset.task-1];
			let triangle = item.querySelector('svg');

			if (itemDescr.style.display == 'none') {
				itemDescr.style.display = 'block';
			} else {
				itemDescr.style.display = 'none';
			}

			if (triangle.style.transform == 'rotateZ(180deg)') {
				triangle.style.transform = 'rotateZ(90deg)';
			} else {
				triangle.style.transform = 'rotateZ(180deg)';
			}
		});
	});
});