'use strict';

import renderTasks from './modules/rendetTasks';
import create from './modules/crud/create';

document.addEventListener('DOMContentLoaded', () => {
	renderTasks();
	create();
});