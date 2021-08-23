'use strict';

import modalRegister from './modules/modalRegister';
import modalLogin from './modules/modalLogin';
import renderTasks from './modules/rendetTasks';
import addTask from './modules/addTask';

//TODO: ошибка для не авторизованных.
//TODO: обработка статусов 400-500 ошибок.

document.addEventListener('DOMContentLoaded', () => {
	modalRegister();
	modalLogin();
	renderTasks();
	addTask();
});