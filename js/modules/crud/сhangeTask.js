'use strict';

import renderTasks from '../rendetTasks';
import { postData } from '../../services/data';
import {modalOpen, modalClose} from '../../services/modal';

function changeDone() {
	let doneBtnList = document.querySelectorAll('.doneBtn');

	doneBtnList.forEach((item) => {
		let idTask = item.dataset.taskid;

		item.addEventListener('click', () => {
			let task = document.querySelector(`[data-task="${idTask}"]`);
			const modalDone = document.querySelector('#changeDoneForm'),
				  btnYes = modalDone.querySelector('[data-done="true"]'),
				  btnNo = modalDone.querySelector('[data-done="false"]');

			modalOpen(modalDone);

			btnYes.addEventListener('click', (event) => {
				event.preventDefault();

				modalClose(modalDone);

				let json = {
					isDone: 'true'
				}
			
				//превращение данных в json
				json = JSON.stringify(json);
	
				postData(`http://localhost:8080/api/task/${task.dataset.task}`, json, 'PUT')
					.then((res) => {
						console.log('Отмечено сделанным успешно');
						renderTasks();
					}).catch((error) => {
						console.log('Ошибка fetch:' + error);
					});
			});

			btnNo.addEventListener('click', (event) => {
				event.preventDefault();

				modalClose(modalDone);
			});
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

		//обработка строк для человеческого вида, если пользователь страдает от психических расстройств и вводит не пойми что
		json.name = S(`${json.name}`).replaceAll('_', '').s;
		json.description = S(`${json.description}`).replaceAll('_', '').s;
		json.name = S(`${json.name}`).humanize().s;
		json.description = S(`${json.description}`).humanize().s;

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