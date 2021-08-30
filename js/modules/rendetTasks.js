'use strict';

import taskVisibleDescr from "./taskVisibleDescr";
import deleteTask from './deleteTask';

function renderTasks() {
	class TaskCard {
		constructor(id, title, date, isDone, descr = "Вы не задали описания",) {
			this.id = id;
			this.title = title;
			this.descr = descr;
			this.isDone = isDone;
			this.date = {
				'year': +date.slice(0, 4),
				'month': +date.slice(5, 7),
				'day': +date.slice(8, 10),
			}
			this.time = date;
		}

		render() {
			const element = document.createElement('div');
			element.classList.add('main__task');

			if (!(this.isDone)) {
				element.innerHTML = `
					<div class="main__task-block-one">
						<div class="main__task-title" data-task=${this.id}>
							<svg viewBox="0 0 100 100" class="triangle" style="width: 0.6875em; height: 0.6875em; display: block; fill: inherit; flex-shrink: 0; backface-visibility: hidden; transition: transform 200ms ease-out 0s; transform: rotateZ(90deg); opacity: 1;"><polygon points="5.9,88.2 50,11.8 94.1,88.2 "></polygon></svg>
							<span>${this.title}</span>
						</div>
						<div class="main__task-interactiv">
							<img src="img/pencil.svg" class="main__task-icon" data-taskId=${this.id}>
							<img src="img/check-mark.svg" class="main__task-icon" data-taskId=${this.id}>
							<img src="img/delete.svg" class="main__task-icon deleteBtn" data-taskId=${this.id}>
						</div>
					</div>
					<div class="main__task-block-two" data-task=${this.id}>
						<div class="main__task-descr">${this.descr}</div>
						<div class="main__task-date">Дата: ${this.date.day}.${getZero(this.date.month)}.${this.date.year}</div>
					</div>
				`;
			}

			document.querySelector('.main__tasks-wrapper').append(element);
		}
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	//получени всех тасков
	async function getData(url) {
		const myHeaders = new Headers();

		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMzQxMiJ9.95ohW9ypI-87m3P6H-otIpPM-5W2iqeTucSWIdst8OU');

		const res = await fetch(url, {
			method: 'GET',
			headers: myHeaders,
		});

		if (!res.ok) {
			throw new Error(`Не получается обработать fetch ${url}, статус: ${res.status}`);
		}

		return res.json();
	}

	let arrayTasks = [];

	//промис получения тасков
	getData('http://localhost:8080/api/tasks')
		.then((res) => {
			arrayTasks = res;
			
			if (arrayTasks.length == 0) {
				document.querySelector('.main__tasks-wrapper').innerHTML = 'Заданий пока нет. ';
			} else {
				document.querySelector('.main__tasks-wrapper').innerHTML = '';

				arrayTasks.forEach(function(item, index) {
					let task = new TaskCard(item.id, item.name, item.updatedAt, item.isDone, item.description);
					task.render();
				});
			}
		}).then(() => {
			deleteTask();
		}).catch((error) => {
			console.log(error);
		}).finally(() => {
			taskVisibleDescr();
		});
}

export default renderTasks;