'use strict';

import renderTasks from './rendetTasks';

function deleteTask() {
	let deleteBtn = document.querySelectorAll('.deleteBtn');

	async function deleteData(url) {
		const res = await fetch(url, {
			method: "DELETE",
			headers: {
				"alg": "HS256",
				"typ": "JWT",
				"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMzQxMiJ9.95ohW9ypI-87m3P6H-otIpPM-5W2iqeTucSWIdst8OU"
			},
			mode: 'cors'
		});

		return await res;
	}

	deleteBtn.forEach((item) => {
		let idTask = item.dataset.taskid;

		item.addEventListener('click', () => {
			let task = document.querySelector(`[data-task="${idTask}"]`);

			deleteData(`http://localhost:8080/api/task/${task.dataset.task}`)
				.then((res) => {
					console.log('Удалено успешно');
					renderTasks();
					console.log(res.status);
				}).catch((error) => {
					console.log('Ошибка fetch:' + error);
				});
		});
	});
}

export default deleteTask;