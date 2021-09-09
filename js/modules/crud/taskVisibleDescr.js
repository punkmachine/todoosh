'use strict';

function taskVisibleDescr() {
	let tasksTitle = document.querySelectorAll('.main__task-title'),
		tasksDescr = document.querySelectorAll('.main__task-block-two'),
		doneTasksTitle = document.querySelectorAll('.done__task-title'),
		doneTasksDescr = document.querySelectorAll('.done__task-block-two');

	//Изменение стилей у таска
	function transformStyleItem(itemDescr, triangle) {
		if (itemDescr.style.display == 'none') {
			itemDescr.style.display = 'block';
		} else {
			itemDescr.style.display = 'none';
		}

		if (triangle.style.transform == 'rotateZ(180deg)') {
			triangle.style.transform = 'rotateZ(90deg)';
		} else {
			triangle.style.transform = 'rotateZ(180deg)';
		}
	}

	function getItemDescr(id, arr) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].dataset.task == id) {
				return arr[i];
			}
		}
	}

	//начальное прописывание inline стилей у descr
	tasksDescr.forEach((item) => {
		item.style.display = 'none';
	});

	doneTasksDescr.forEach((item) => {
		item.style.display = 'none';
	});

	tasksTitle.forEach((item) => {
		item.addEventListener('click', () => {
			let itemDescr = getItemDescr(item.dataset.task, tasksDescr);
			let triangle = item.querySelector('svg');

			transformStyleItem(itemDescr, triangle);
		});
	});

	doneTasksTitle.forEach((item) => {
		item.addEventListener('click', () => {
			let itemDescr = getItemDescr(item.dataset.task, doneTasksDescr);
			let triangle = item.querySelector('svg');

			transformStyleItem(itemDescr, triangle)
		});
	});
}

export default taskVisibleDescr;