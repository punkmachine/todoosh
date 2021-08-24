'use strict';

import modalRegister from './modules/modalRegister';
import modalLogin from './modules/modalLogin';
import renderTasks from './modules/rendetTasks';
import addTask from './modules/addTask';

document.addEventListener('DOMContentLoaded', () => {
	renderTasks();
	modalRegister();
	modalLogin();
	addTask();
});