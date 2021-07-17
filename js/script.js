'use strict';

document.addEventListener('DOMContentLoaded', () => {
	//Modal
	const modal = document.querySelector('.modal'),
		modalClose = modal.querySelector('.modal__close'),
		modalOpen = document.querySelector('.header__register');

	modalOpen.addEventListener('click', (event) => {
		event.preventDefault();

		modal.classList.remove('modal_hide');
		modal.classList.add('modal_show');
	});

	modalClose.addEventListener('click', (event) => {
		event.preventDefault();

		modal.classList.add('modal_hide');
		modal.classList.remove('modal_show');
	});

	document.addEventListener('keydown', function(event) {
		if (event.code === 'Escape' && modal.classList.contains('modal_show')) {
			modal.classList.add('modal_hide');
			modal.classList.remove('modal_show');
		}
	});

	modal.addEventListener('click', function(event) {
		if (event.target === modal) {
			modal.classList.add('modal_hide');
			modal.classList.remove('modal_show');
		}
	});
});