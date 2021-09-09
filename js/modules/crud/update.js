'use strict';

import renderTasks from '../rendetTasks';
import { postData } from '../../services/data';
import {modalOpen, modalClose} from '../../services/modal';

function changeDone() {
	const taskList = document.querySelectorAll('.main__task');

	taskList.forEach((item) => {
		let doneBtn = item.querySelector('.doneBtn');
		const modalDone = document.querySelector('#changeDoneForm'),
			  btnYes = modalDone.querySelector('[data-done="true"]'),
			  btnNo = modalDone.querySelector('[data-done="false"]'),
			  modalDoneClose = modalDone.querySelector('.modal__close');

		function doneYesClick(event) {
			event.preventDefault();

			let json = {
				isDone: 'true'
			}
		
			json = JSON.stringify(json);

			postData(`http://localhost:8080/api/task/${item.dataset.taskid}`, json, 'PUT')
				.then((res) => {
					console.log('Отмечено сделанным успешно');
					renderTasks();
				}).catch((error) => {
					console.log('Ошибка fetch:' + error);
				});

			modalClose(modalDone);
			btnYes.removeEventListener('click', doneYesClick);
		}

		doneBtn.addEventListener('click', () => {
			modalOpen(modalDone);

			btnNo.addEventListener('click', (event) => {
				event.preventDefault();

				modalClose(modalDone);
			});

			modalDone.addEventListener('click', (event) => {
				if (event.target === modalDone || event.target === modalDoneClose) {
					modalClose(modalDone);
				}
			});

			document.addEventListener('keydown', (event) => {
				if (event.code === 'Escape' && modalDone.classList.contains('modal_show')) {
					modalClose(modalDone);
				}
			});

			btnYes.addEventListener('click', doneYesClick);
		});
	});
}

function changeDataTasks() {
	const taskList = document.querySelectorAll('.main__task');

	taskList.forEach((item) => {
		let updateBtn = item.querySelector('.pencilBtn');

		updateBtn.addEventListener('click', () => {
			const modalUpdate = document.querySelector('#changeTask'),
				  modalUpdateClose = modalUpdate.querySelector('.modal__close'),
				  titleTask = item.querySelector('.main__task-title>span'),
				  descrTask = item.querySelector('.main__task-descr');
			let titleModal = modalUpdate.querySelector('input'),
				descrModal = modalUpdate.querySelector('textarea');

			function changeDataClick(event) {
				event.preventDefault();
				
				const form = modalUpdate.querySelector('form');

				const formData = new FormData(form);
				let json = Object.fromEntries(formData.entries());
				json = JSON.stringify(json);

				postData(`http://localhost:8080/api/task/${item.dataset.taskid}`, json, 'PUT')
					.then((res) => {
						console.log('Отредактировано успешно');
						renderTasks();
					}).catch((error) => {
						console.log('Ошибка fetch:' + error);
					}).finally(() => {
						modalClose(modalUpdate);
						form.reset();
					});	
				
				modalUpdate.removeEventListener('submit', changeDataClick);
			}

			modalOpen(modalUpdate);

			titleModal.value = titleTask.innerHTML;
			if (descrTask.innerHTML != 'Описание не задано.') {
				descrModal.value = descrTask.innerHTML;
			}

			modalUpdate.addEventListener('submit', changeDataClick);

			document.addEventListener('keydown', (event) => {
				if (event.code === 'Escape' && modalUpdate.classList.contains('modal_show')) {
					modalClose(modalUpdate);
				}
			});

			modalUpdate.addEventListener('click', (event) => {
				if (event.target === modalUpdate || event.target === modalUpdateClose) {
					modalClose(modalUpdate);
				}
			});
		});
	});
}

export { changeDone, changeDataTasks };