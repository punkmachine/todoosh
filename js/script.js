'use strict';

document.addEventListener('DOMContentLoaded', () => {
	function modalOpen(modal) {
		modal.classList.remove('modal_hide');
		modal.classList.add('modal_show');
	}

	function modalClose(modal) {
		modal.classList.add('modal_hide');
		modal.classList.remove('modal_show');
	}

	//Modal Register
	const modalRegister = document.querySelector('#register'),
		modalRegisterClose = modalRegister.querySelector('.modal__close'),
		modalRegisterOpen = document.querySelector('.header__register');

	modalRegisterOpen.addEventListener('click', (event) => {
		modalOpen(modalRegister);
	});

	modalRegisterClose.addEventListener('click', (event) => {
		modalClose(modalRegister);
	});

	document.addEventListener('keydown', function(event) {
		if (event.code === 'Escape' && modalRegister.classList.contains('modal_show')) {
			modalClose(modalRegister);
		}
	});

	modalRegister.addEventListener('click', function(event) {
		if (event.target === modalRegister) {
			modalClose(modalRegister);
		}
	});

	// Modal Login
	const modalLogin = document.querySelector('#login'),
		modalLoginClose = modalLogin.querySelector('.modal__close'),
		modalLoginOpen = document.querySelector('.header__login');

	modalLoginOpen.addEventListener('click', (event) => {
		modalOpen(modalLogin);
	});

	modalLoginClose.addEventListener('click', (event) => {
		modalClose(modalLogin);
	});

	document.addEventListener('keydown', function(event) {
		if (event.code === 'Escape' && modalLogin.classList.contains('modal_show')) {
			modalClose(modalLogin);
		}
	});

	modalLogin.addEventListener('click', function(event) {
		if (event.target === modalLogin) {
			modalClose(modalLogin);
		}
	});
});