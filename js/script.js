'use strict';

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

	//modal add 
	const modalAdd = document.querySelector('#add'),
		  modalAddClose = modalAdd.querySelector('.modal__close'),
		  modalAddOpen = document.querySelector('.main__add-tasks'),
		  addTasksBtn = modalAdd.querySelector('button');

	//настройка запроса, посыл запроса на сервер и получение ответа
	async function postData(url, data) {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			mode: 'no-cors',
			body: data
		});

		return await res.json();
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

		//обработка для заглавной буквы
		json.name = S(`${json.name}`).capitalize().s;

		//превращение данных в json
		json = JSON.stringify(json);

		console.log(json);

		//обработка промиса
		postData('http://localhost:8080/task/create-task', json)
			.then(() => {
				alert('ВСЕ ЧУДЕСНО!');
			}).catch((error) => {
				alert('Все плохо!');
				console.log(error);
			}).finally(() => {
				form.reset();
			});
	});

	
	
	// раскрытие таска 
	let tasks = document.querySelectorAll('.main__task');
	
	tasks.forEach(function(task) {
		let taskTitle = task.querySelector('.main__task-title');
		let taskDescr = task.querySelector('.main__task-descr');
		let triangle = task.querySelector('svg');

		taskDescr.style.display = 'none';

		taskTitle.addEventListener('click', () => {
			if (taskDescr.style.display == 'none') {
				taskDescr.style.display = 'block';
			} else {
				taskDescr.style.display = 'none';
			}

			if (triangle.style.transform == 'rotateZ(180deg)') {
				triangle.style.transform = 'rotateZ(90deg)';
			} else {
				triangle.style.transform = 'rotateZ(180deg)';
			}
 			
		});
	});
});