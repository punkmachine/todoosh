'use strict';

import {modalOpen, modalClose} from '../services/modal';
 
function modalRegister() {
	const modalRegister = document.querySelector('#register'),
		  modalRegisterClose = modalRegister.querySelector('.modal__close'),
		  modalRegisterOpen = document.querySelector('.header__register');

	modalRegisterOpen.addEventListener('click', () => {
		modalOpen(modalRegister);
	});

	document.addEventListener('keydown', function(event) {
		if (event.code === 'Escape' && modalRegister.classList.contains('modal_show')) {
			modalClose(modalRegister);
		}
	});

	modalRegister.addEventListener('click', function(event) {
		if (event.target === modalRegister || event.target === modalRegisterClose) {
			modalClose(modalRegister);
		}
	});
}

export default modalRegister;