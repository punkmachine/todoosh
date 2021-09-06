'use strict';

import renderTasks from './rendetTasks';
import { getData } from '../services/data'

function deleteTask() {
	let deleteBtn = document.querySelectorAll('.deleteBtn');

	deleteBtn.forEach((item) => {
		let idTask = item.dataset.taskid;

		item.addEventListener('click', () => {
			let task = document.querySelector(`[data-task="${idTask}"]`);

			getData(`http://localhost:8080/api/task/${task.dataset.task}`, 'DELETE')
				.then((res) => {
					console.log('Удалено успешно');
					renderTasks();
				}).catch((error) => {
					console.log('Ошибка fetch:' + error);
				});
		});
	});
}

export default deleteTask;