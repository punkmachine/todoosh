'use strict';

import {modalOpen, modalClose} from '../services/modal';
import renderTasks from './rendetTasks';

function addTask() {
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
				"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIzNDEyfQ.FGIdlz8lSwIByLlbX2K9Qp5xgZTtLuhD3YlH5yLq9NA"
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
	postData('http://localhost:8080/api/task/new', json)
		.then((res) => {
			if (res.status === 200) {
				renderTasks();
				modalClose(modalAdd);
			} else if (res.status === 401) {
				alert(`Авторизуйтесь, чтобы добавлять задачи.`);
			} else {
				alert(`Отправка данных не произошла, код ошибки ${res.status}`);
			}
		}).catch((error) => {
			alert('Все плохо!');
			console.log(error);
		}).finally(() => {
			form.reset();
		});
	});
}

export default addTask;