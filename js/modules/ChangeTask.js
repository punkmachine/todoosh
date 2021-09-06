'use strict';

//TODO: Добавить форму вопроса о подтверждении действий.

import renderTasks from './rendetTasks';

function changeDone() {
	let doneBtnList = document.querySelectorAll('.doneBtn');

	async function doneData(url) {
		let json = {
			isDone: 'true'
		}

		//превращение данных в json
		json = await JSON.stringify(json);
		console.log(json);

		const res = await fetch(url, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				"alg": "HS256",
				"typ": "JWT",
				"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIzNDEyfQ.FGIdlz8lSwIByLlbX2K9Qp5xgZTtLuhD3YlH5yLq9NA"
			},
			body: json,
			mode: 'cors'
		});

		return await res;
	}

	doneBtnList.forEach((item) => {
		let idTask = item.dataset.taskid;

		item.addEventListener('click', () => {
			let task = document.querySelector(`[data-task="${idTask}"]`);
			
			console.log(idTask);
			console.log(task);

			doneData(`http://localhost:8080/api/task/${task.dataset.task}`)
				.then((res) => {
					console.log('Отмечено сделанным успешно');
					renderTasks();
					console.log(res.status);
				}).catch((error) => {
					console.log('Ошибка fetch:' + error);
				});
		});
	});
}

export { changeDone };