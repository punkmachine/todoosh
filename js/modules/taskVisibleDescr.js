'use strict';

function taskVisibleDescr() {
	let tasksTitle = document.querySelectorAll('.main__task-title');
	let tasksDescr = document.querySelectorAll('.main__task-block-two');

	tasksDescr.forEach(function(item) {
		item.style.display = 'none';
	});

	tasksTitle.forEach(function(item) {
		item.addEventListener('click', () => {
			let itemDescr = tasksDescr[item.dataset.task-1];
			let triangle = item.querySelector('svg');

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
		});
	});
}

export default taskVisibleDescr;