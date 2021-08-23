'use strict';

import modalRegister from './modules/modalRegister';
import modalLogin from './modules/modalLogin';
import renderTasks from './modules/rendetTasks';
import taskVisibleDescr from './modules/taskVisibleDescr';
import addTask from './modules/addTask';

document.addEventListener('DOMContentLoaded', () => {
	modalRegister();
	modalLogin();
	renderTasks();
	addTask();
	taskVisibleDescr();
});