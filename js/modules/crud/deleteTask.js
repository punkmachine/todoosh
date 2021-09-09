'use strict';

import renderTasks from '../rendetTasks';
import { getData } from '../../services/data';
import {modalOpen, modalClose} from '../../services/modal';

function deleteTask() {
	let deleteBtn = document.querySelectorAll('.deleteBtn');

	deleteBtn.forEach((item) => {
		let idTask = item.dataset.taskid;

		item.addEventListener('click', () => {
			let task = document.querySelector(`[data-task="${idTask}"]`);
			const modalDel = document.querySelector('#deleteForm'),
				  btnYes = modalDel.querySelector('[data-delete="true"]'),
				  btnNo = modalDel.querySelector('[data-delete="false"]');

			modalOpen(modalDel);

			btnYes.addEventListener('click', (event) => {
				event.preventDefault();

				modalClose(modalDel);

				getData(`http://localhost:8080/api/task/${task.dataset.task}`, 'DELETE')
					.then((res) => {
						console.log('Удалено успешно');
						renderTasks();
					}).catch((error) => {
						console.log('Ошибка fetch:' + error);
						alert('При попытке удалить данные произошла ошибка.');
					});
			});

			btnNo.addEventListener('click', (event) => {
				event.preventDefault();

				modalClose(modalDel);
			});
		});
	});
}

export default deleteTask;