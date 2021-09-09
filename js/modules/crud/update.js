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
		
			//превращение данных в json
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
	let pencilBtn = document.querySelectorAll('.pencilBtn');
	const modalChange = document.querySelector('#changeTask'),
		  titleInput = modalChange.querySelector('input'),
		  descrTextarea = modalChange.querySelector('textarea');

	function handler(event) {
		event.preventDefault();
		
		const form = modalChange.querySelector('form'),
			  idTask = form.dataset.taskid;	

		const formData = new FormData(form);

		let json = Object.fromEntries(formData.entries());

		//превращение данных в json
		json = JSON.stringify(json);
		console.log(json);

		postData(`http://localhost:8080/api/task/${idTask}`, json, 'PUT')
			.then((res) => {
				console.log('Отредактировано успешно');
				renderTasks();
			}).catch((error) => {
				console.log('Ошибка fetch:' + error);
			}).finally(() => {
				modalClose(modalChange);
				form.reset();
			});	
		
		modalChange.removeEventListener('submit', handler);
	}

	pencilBtn.forEach((item) => {
		let idTask = item.dataset.taskid;

		item.addEventListener('click', () => {	
			const taskTitle = document.querySelector(`.main__task-title[data-task="${idTask}"]>span`),
				  taskDescr = document.querySelector(`.main__task-block-two[data-task="${idTask}"]>.main__task-descr`);
			let itemForm = document.querySelector('#changeTask');
			
			itemForm = itemForm.querySelector('form');

			itemForm.dataset.taskid = idTask;

			titleInput.value = taskTitle.innerHTML;

			if (taskDescr.innerHTML != 'Описание не задано.') {
				descrTextarea.value = taskDescr.innerHTML;
			}

			modalOpen(modalChange);

			modalChange.addEventListener('submit', handler);
		});
	});
}

export { changeDone, changeDataTasks };