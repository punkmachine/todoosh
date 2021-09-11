'use strict';

import renderTasks from '../rendetTasks';
import { getData } from '../../services/data';
import { modalOpen, modalClose } from '../../services/modal';

function deleteTask() {
	const taskList = document.querySelectorAll('.main__task');

	taskList.forEach((item) => {
		let deleteBtn = item.querySelector('.deleteBtn');

		deleteBtn.addEventListener('click', () => {
			const modalDel = document.querySelector('#deleteForm'),
				  modalDelClose = modalDel.querySelector('.modal__close'),
				  btnYes = modalDel.querySelector('[data-delete="true"]'),
				  btnNo = modalDel.querySelector('[data-delete="false"]');

			function btnYesClick(event) {
				event.preventDefault();

				getData(`http://localhost:8080/api/task/${item.dataset.taskid}`, 'DELETE')
					.then((res) => {
						console.log('Удалено успешно');
						renderTasks();
					}).catch((error) => {
						console.log('Ошибка fetch:' + error);
						alert('При попытке удалить данные произошла ошибка.');
					});
	
				modalClose(modalDel);

				btnYes.removeEventListener('click', btnYesClick);
			}

			modalOpen(modalDel);

			btnYes.addEventListener('click', btnYesClick);
	
			btnNo.addEventListener('click', (event) => {
				event.preventDefault();
	
				modalClose(modalDel);
			});
	
			document.addEventListener('keydown', (event) => {
				if (event.code === 'Escape' && modalDel.classList.contains('modal_show')) {
					modalClose(modalDel);
				}
			});
	
			modalDel.addEventListener('click', (event) => {
				if (event.target === modalDel || event.target === modalDelClose) {
					modalClose(modalDel);
				}
			});
		});
	});
}

function deleteAll() {
	const btnDel = document.querySelector('.done__delete-wrapper');

	btnDel.addEventListener('click', () => {
		const doneTasks = document.querySelectorAll('.done__task');

		doneTasks.forEach((item) => {
			getData(`http://localhost:8080/api/task/${item.dataset.taskid}`, 'DELETE')
				.then((res) => {
					console.log('Удалено успешно');
					renderTasks();
				}).catch((error) => {
					console.log('Ошибка fetch:' + error);
					alert('При попытке удалить данные произошла ошибка.');
				});
		});
	});
}

export {deleteTask, deleteAll};