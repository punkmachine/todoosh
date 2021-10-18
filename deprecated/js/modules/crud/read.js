'use strict';

function read() {
	const taskList = document.querySelectorAll('.main__task'),
		  doneTaskList = document.querySelectorAll('.done__task');

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

	function taskClick(item, str) {
		let descrTask = item.querySelector(`.${str}__task-block-two`),
			titleTask = item.querySelector(`.${str}__task-title`),
			triangle = item.querySelector('svg');

		descrTask.style.display = 'none';

		titleTask.addEventListener('click', () => {
			transformStyleItem(descrTask, triangle);
		});
	}

	taskList.forEach((item) => {
		taskClick(item, 'main');
	});

	doneTaskList.forEach((item) => {
		taskClick(item, 'done');
	});
}

export default read;