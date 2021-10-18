'use strict';

function modalOpen(modal) {
	modal.classList.remove('modal_hide');
	modal.classList.add('modal_show');
}

function modalClose(modal) {
	modal.classList.add('modal_hide');
	modal.classList.remove('modal_show');
}

export {modalOpen};
export {modalClose};