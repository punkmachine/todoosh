'use strict';

import taskVisibleDescr from "./crud/taskVisibleDescr";
import deleteTask from './crud/deleteTask';
import { changeDone, changeDataTasks } from './crud/сhangeTask';
import { getData } from '../services/data';

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
		}

		render() {
			if (!(this.isDone)) {
				const element = document.createElement('div');
				element.classList.add('main__task');

				if (this.descr === '') {
					this.descr = 'Описание не задано.';
				}

				element.innerHTML = `
					<div class="main__task-block-one">
						<div class="main__task-title" data-task=${this.id}>
							<svg viewBox="0 0 100 100" class="triangle" style="width: 0.6875em; height: 0.6875em; display: block; fill: inherit; flex-shrink: 0; backface-visibility: hidden; transition: transform 200ms ease-out 0s; transform: rotateZ(90deg); opacity: 1;"><polygon points="5.9,88.2 50,11.8 94.1,88.2 "></polygon></svg>
							<span>${this.title}</span>
						</div>
						<div class="main__task-interactiv">
							<img src="img/pencil.svg" class="main__task-icon pencilBtn" data-taskId=${this.id}>
							<img src="img/check-mark.svg" class="main__task-icon doneBtn" data-taskId=${this.id}>
							<img src="img/delete.svg" class="main__task-icon deleteBtn" data-taskId=${this.id}>
						</div>
					</div>
					<div class="main__task-block-two" data-task=${this.id}>
						<div class="main__task-descr">${this.descr}</div>
						<div class="main__task-date">Дата: ${this.date.day}.${getZero(this.date.month)}.${this.date.year}</div>
					</div>
				`;

				document.querySelector('.main__tasks-wrapper').append(element);
			} else {
				const element = document.createElement('div');
				element.classList.add('done__task');

				if (this.descr === '') {
					this.descr = 'Описание не задано.';
				}

				element.innerHTML = `
					<div class="done__task-block-one">
						<div class="done__task-title" data-task=${this.id}>
							<svg viewBox="0 0 100 100" class="triangle" style="width: 0.6875em; height: 0.6875em; display: block; fill: inherit; flex-shrink: 0; backface-visibility: hidden; transition: transform 200ms ease-out 0s; transform: rotateZ(90deg); opacity: 1;"><polygon points="5.9,88.2 50,11.8 94.1,88.2 "></polygon></svg>
							<span>${this.title}</span>
						</div>
						<div class="done__task-interactiv">
							<?xml version="1.0" encoding="iso-8859-1"?><svg class="done__task-icon" data-taskId=${this.id} id=Capa_1 style="enable-background:new 0 0 446.536 446.536"version=1.1 viewBox="0 0 446.536 446.536"x=0px xml:space=preserve xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink y=0px><g><path d=M282.488,68.589L351.077,0l95.458,95.458l-68.589,68.589L282.488,68.589z /><polygon points="0.001,446.536 117.523,412.737 33.8,329.014 	"/><path d=M144.604,397.393l-95.458-95.458l212.13-212.13l95.458,95.458L144.604,397.393z /></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
							<?xml version="1.0" encoding="iso-8859-1"?><svg class="done__task-icon data-taskId=${this.id} id=Capa_1 style="enable-background:new 0 0 214.155 214.155"version=1.1 viewBox="0 0 214.155 214.155"x=0px xml:space=preserve xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink y=0px><path d=M74.551,193.448L0,118.896l33.136-33.135l41.415,41.415L181.02,20.707l33.135,33.136L74.551,193.448z /><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
							<?xml version="1.0" encoding="iso-8859-1"?><svg class="done__task-icon" data-taskId=${this.id} id=Layer_1 style="enable-background:new 0 0 443 443"version=1.1 viewBox="0 0 443 443"x=0px xml:space=preserve xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink y=0px><g><path d="M321.785,38h-83.384V0H125.169v38H41.785v60h280V38z M155.169,30h53.232v8h-53.232V30z"/><path d="M295.142,214.31l5.66-86.31H62.769l19.016,290h114.172c-14.861-21.067-23.602-46.746-23.602-74.43
								C172.355,274.43,226.849,217.779,295.142,214.31z"/><path d="M301.785,244.141c-54.826,0-99.43,44.604-99.43,99.429S246.959,443,301.785,443s99.43-44.604,99.43-99.43
								S356.611,244.141,301.785,244.141z M355.961,376.533l-21.213,21.213l-32.963-32.963l-32.963,32.963l-21.213-21.213l32.963-32.963
								l-32.963-32.963l21.213-21.213l32.963,32.963l32.963-32.963l21.213,21.213l-32.963,32.963L355.961,376.533z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
						</div>
					</div>
					<div class="done__task-block-two" data-task=${this.id}>
						<div class="done__task-descr">${this.descr}</div>
						<div class="done__task-date">Дата: ${this.date.day}.${getZero(this.date.month)}.${this.date.year}</div>
					</div>
				`;

				document.querySelector('.done__tasks-wrapper').append(element);
			}
		}
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	let arrayTasks = [];

	//промис получения тасков
	getData('http://localhost:8080/api/tasks', 'GET')
		.then((res) => {
			arrayTasks = res;
			
			if (arrayTasks.length == 0) {
				document.querySelector('.main__tasks-wrapper').innerHTML = 'Заданий пока нет. ';
			} else {
				document.querySelector('.main__tasks-wrapper').innerHTML = '';
				document.querySelector('.done__tasks-wrapper').innerHTML = '';

				arrayTasks.forEach(function(item, index) {
					let task = new TaskCard(item.id, item.name, item.updatedAt, item.isDone, item.description);
					task.render();
				});
			}
		}).then(() => {
			deleteTask();
			changeDone();
			changeDataTasks();
		}).catch((error) => {
			alert('Сервер временно не доступен!');
			console.log(error);
		}).finally(() => {
			taskVisibleDescr();
		});
}

export default renderTasks;