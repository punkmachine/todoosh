'use strict';

import {modalOpen, modalClose} from '../../services/modal';
import renderTasks from '../rendetTasks';
import { postData } from '../../services/data';

function create() {
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

	function submitForm(event) {
		event.preventDefault();

		const form = modalAdd.querySelector('form');

		const formData = new FormData(form);
		let json = Object.fromEntries(formData.entries());
		json = JSON.stringify(json);

		postData('http://localhost:8080/api/task/new', json, 'POST')
			.then((res) => {
				if (res.status === 200) {
					renderTasks();
					modalClose(modalAdd);
				} else if (res.status === 401) {
					alert(`Авторизуйтесь, чтобы добавлять задачи.`);
				} else if (res.status === 400) {
					alert(`Данная задача уже внесена в ваш список.`);
				} else {
					alert(`Отправка данных не произошла, код ошибки ${res.status}`);
				}
			}).catch((error) => {
				alert('Сервер временно не доступен');
				console.log(error);
			}).finally(() => {
				form.reset();
			});
	}

	modalAdd.addEventListener('submit', submitForm);
}

export default create;