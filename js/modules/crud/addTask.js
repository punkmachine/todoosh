'use strict';

import {modalOpen, modalClose} from '../../services/modal';
import renderTasks from '../rendetTasks';
import { postData } from '../../services/data';

function addTask() {
	const modalAdd = document.querySelector('#add'),
		  modalAddClose = modalAdd.querySelector('.modal__close'),
		  modalAddOpen = document.querySelector('.main__add-tasks');

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

		//обработка промиса
		postData('http://localhost:8080/api/task/new', json, 'POST')
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
				alert('Сервер временно не доступен');
				console.log(error);
			}).finally(() => {
				form.reset();
			});
	});
}

export default addTask;