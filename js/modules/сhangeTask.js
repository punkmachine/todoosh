'use strict';

import renderTasks from './rendetTasks';
import { postData } from '../services/data';
import {modalOpen, modalClose} from '../services/modal';

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

export { changeDone };