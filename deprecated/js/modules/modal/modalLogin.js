'use strict';

import {modalOpen, modalClose} from '../../services/modal';

function modalLogin() {
	const modalLogin = document.querySelector('#login'),
		modalLoginClose = modalLogin.querySelector('.modal__close'),
		modalLoginOpen = document.querySelector('.header__login');

	modalLoginOpen.addEventListener('click', () => {
		modalOpen(modalLogin);
	});

	document.addEventListener('keydown', function(event) {
		if (event.code === 'Escape' && modalLogin.classList.contains('modal_show')) {
			modalClose(modalLogin);
		}
	});

	modalLogin.addEventListener('click', function(event) {
		if (event.target === modalLogin || event.target === modalLoginClose) {
			modalClose(modalLogin);
		}
	});
}

export default modalLogin;