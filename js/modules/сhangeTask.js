'use strict';

//TODO: Добавить форму вопроса о подтверждении действий.

import renderTasks from './rendetTasks';
import { postData } from '../services/data';

function changeDone() {
	let doneBtnList = document.querySelectorAll('.doneBtn');

	doneBtnList.forEach((item) => {
		let idTask = item.dataset.taskid;

		item.addEventListener('click', () => {
			let task = document.querySelector(`[data-task="${idTask}"]`);

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
	});
}

export { changeDone };