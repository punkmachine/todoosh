/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/crud/create.js":
/*!***********************************!*\
  !*** ./js/modules/crud/create.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/modal */ "./js/services/modal.js");
/* harmony import */ var _rendetTasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rendetTasks */ "./js/modules/rendetTasks.js");
/* harmony import */ var _services_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/data */ "./js/services/data.js");






function create() {
  const modalAdd = document.querySelector('#add'),
        modalAddClose = modalAdd.querySelector('.modal__close'),
        modalAddOpen = document.querySelector('.main__add-tasks');
  modalAddOpen.addEventListener('click', () => {
    (0,_services_modal__WEBPACK_IMPORTED_MODULE_0__.modalOpen)(modalAdd);
  });
  document.addEventListener('keydown', function (event) {
    if (event.code === 'Escape' && modalAdd.classList.contains('modal_show')) {
      (0,_services_modal__WEBPACK_IMPORTED_MODULE_0__.modalClose)(modalAdd);
    }
  });
  modalAdd.addEventListener('click', function (event) {
    if (event.target === modalAdd || event.target === modalAddClose) {
      (0,_services_modal__WEBPACK_IMPORTED_MODULE_0__.modalClose)(modalAdd);
    }
  });

  function submitForm(event) {
    event.preventDefault();
    const form = modalAdd.querySelector('form');
    const formData = new FormData(form);
    let json = Object.fromEntries(formData.entries());
    json = JSON.stringify(json);
    (0,_services_data__WEBPACK_IMPORTED_MODULE_2__.postData)('http://localhost:8080/api/task/new', json, 'POST').then(res => {
      if (res.status === 200) {
        (0,_rendetTasks__WEBPACK_IMPORTED_MODULE_1__.default)();
        (0,_services_modal__WEBPACK_IMPORTED_MODULE_0__.modalClose)(modalAdd);
      } else if (res.status === 401) {
        alert(`Авторизуйтесь, чтобы добавлять задачи.`);
      } else {
        alert(`Отправка данных не произошла, код ошибки ${res.status}`);
      }
    }).catch(error => {
      alert('Сервер временно не доступен');
      console.log(error);
    }).finally(() => {
      form.reset();
    });
    modalAdd.removeEventListener('submit', submitForm);
  }

  modalAdd.addEventListener('submit', submitForm);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (create);

/***/ }),

/***/ "./js/modules/crud/delete.js":
/*!***********************************!*\
  !*** ./js/modules/crud/delete.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rendetTasks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rendetTasks */ "./js/modules/rendetTasks.js");
/* harmony import */ var _services_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/data */ "./js/services/data.js");
/* harmony import */ var _services_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/modal */ "./js/services/modal.js");






function deleteTask() {
  const taskList = document.querySelectorAll('.main__task');
  taskList.forEach(item => {
    let deleteBtn = item.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', () => {
      const modalDel = document.querySelector('#deleteForm'),
            modalDelClose = modalDel.querySelector('.modal__close'),
            btnYes = modalDel.querySelector('[data-delete="true"]'),
            btnNo = modalDel.querySelector('[data-delete="false"]');

      function btnYesClick() {
        event.preventDefault();
        (0,_services_data__WEBPACK_IMPORTED_MODULE_1__.getData)(`http://localhost:8080/api/task/${item.dataset.taskid}`, 'DELETE').then(res => {
          console.log('Удалено успешно');
          (0,_rendetTasks__WEBPACK_IMPORTED_MODULE_0__.default)();
        }).catch(error => {
          console.log('Ошибка fetch:' + error);
          alert('При попытке удалить данные произошла ошибка.');
        });
        (0,_services_modal__WEBPACK_IMPORTED_MODULE_2__.modalClose)(modalDel);
        btnYes.removeEventListener('click', btnYesClick);
      }

      (0,_services_modal__WEBPACK_IMPORTED_MODULE_2__.modalOpen)(modalDel);
      btnYes.addEventListener('click', btnYesClick);
      btnNo.addEventListener('click', event => {
        event.preventDefault();
        (0,_services_modal__WEBPACK_IMPORTED_MODULE_2__.modalClose)(modalDel);
      });
      document.addEventListener('keydown', event => {
        if (event.code === 'Escape' && modalDel.classList.contains('modal_show')) {
          (0,_services_modal__WEBPACK_IMPORTED_MODULE_2__.modalClose)(modalDel);
        }
      });
      modalDel.addEventListener('click', event => {
        if (event.target === modalDel || event.target === modalDelClose) {
          (0,_services_modal__WEBPACK_IMPORTED_MODULE_2__.modalClose)(modalDel);
        }
      });
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (deleteTask);

/***/ }),

/***/ "./js/modules/crud/read.js":
/*!*********************************!*\
  !*** ./js/modules/crud/read.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


function read() {
  const taskList = document.querySelectorAll('.main__task'),
        doneTaskList = document.querySelectorAll('.done__task');

  function transformStyleItem(itemDescr, triangle) {
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
  }

  function taskClick(item, str) {
    let descrTask = item.querySelector(`.${str}__task-block-two`),
        titleTask = item.querySelector(`.${str}__task-title`),
        triangle = item.querySelector('svg');
    descrTask.style.display = 'none';
    titleTask.addEventListener('click', () => {
      transformStyleItem(descrTask, triangle);
    });
  }

  taskList.forEach(item => {
    taskClick(item, 'main');
  });
  doneTaskList.forEach(item => {
    taskClick(item, 'done');
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (read);

/***/ }),

/***/ "./js/modules/crud/сhangeTask.js":
/*!***************************************!*\
  !*** ./js/modules/crud/сhangeTask.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changeDone": () => (/* binding */ changeDone),
/* harmony export */   "changeDataTasks": () => (/* binding */ changeDataTasks)
/* harmony export */ });
/* harmony import */ var _rendetTasks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rendetTasks */ "./js/modules/rendetTasks.js");
/* harmony import */ var _services_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/data */ "./js/services/data.js");
/* harmony import */ var _services_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/modal */ "./js/services/modal.js");






function changeDone() {
  let doneBtnList = document.querySelectorAll('.doneBtn');
  doneBtnList.forEach(item => {
    let idTask = item.dataset.taskid;
    item.addEventListener('click', () => {
      let task = document.querySelector(`[data-task="${idTask}"]`);
      const modalDone = document.querySelector('#changeDoneForm'),
            btnYes = modalDone.querySelector('[data-done="true"]'),
            btnNo = modalDone.querySelector('[data-done="false"]');
      (0,_services_modal__WEBPACK_IMPORTED_MODULE_2__.modalOpen)(modalDone);
      btnYes.addEventListener('click', event => {
        event.preventDefault();
        (0,_services_modal__WEBPACK_IMPORTED_MODULE_2__.modalClose)(modalDone);
        let json = {
          isDone: 'true'
        }; //превращение данных в json

        json = JSON.stringify(json);
        (0,_services_data__WEBPACK_IMPORTED_MODULE_1__.postData)(`http://localhost:8080/api/task/${task.dataset.task}`, json, 'PUT').then(res => {
          console.log('Отмечено сделанным успешно');
          (0,_rendetTasks__WEBPACK_IMPORTED_MODULE_0__.default)();
        }).catch(error => {
          console.log('Ошибка fetch:' + error);
        });
      });
      btnNo.addEventListener('click', event => {
        event.preventDefault();
        (0,_services_modal__WEBPACK_IMPORTED_MODULE_2__.modalClose)(modalDone);
      });
    });
  });
}

function changeDataTasks() {
  let pencilBtn = document.querySelectorAll('.pencilBtn');
  const modalChange = document.querySelector('#changeTask'),
        titleInput = modalChange.querySelector('input'),
        descrTextarea = modalChange.querySelector('textarea');

  function handler(event) {
    event.preventDefault();
    const form = modalChange.querySelector('form'),
          idTask = form.dataset.taskid;
    const formData = new FormData(form);
    let json = Object.fromEntries(formData.entries()); //превращение данных в json

    json = JSON.stringify(json);
    console.log(json);
    (0,_services_data__WEBPACK_IMPORTED_MODULE_1__.postData)(`http://localhost:8080/api/task/${idTask}`, json, 'PUT').then(res => {
      console.log('Отредактировано успешно');
      (0,_rendetTasks__WEBPACK_IMPORTED_MODULE_0__.default)();
    }).catch(error => {
      console.log('Ошибка fetch:' + error);
    }).finally(() => {
      (0,_services_modal__WEBPACK_IMPORTED_MODULE_2__.modalClose)(modalChange);
      form.reset();
    });
    modalChange.removeEventListener('submit', handler);
  }

  pencilBtn.forEach(item => {
    let idTask = item.dataset.taskid;
    item.addEventListener('click', () => {
      const taskTitle = document.querySelector(`.main__task-title[data-task="${idTask}"]>span`),
            taskDescr = document.querySelector(`.main__task-block-two[data-task="${idTask}"]>.main__task-descr`);
      let itemForm = document.querySelector('#changeTask');
      itemForm = itemForm.querySelector('form');
      itemForm.dataset.taskid = idTask;
      titleInput.value = taskTitle.innerHTML;

      if (taskDescr.innerHTML != 'Описание не задано.') {
        descrTextarea.value = taskDescr.innerHTML;
      }

      (0,_services_modal__WEBPACK_IMPORTED_MODULE_2__.modalOpen)(modalChange);
      modalChange.addEventListener('submit', handler);
    });
  });
}



/***/ }),

/***/ "./js/modules/rendetTasks.js":
/*!***********************************!*\
  !*** ./js/modules/rendetTasks.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _crud_read__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./crud/read */ "./js/modules/crud/read.js");
/* harmony import */ var _crud_delete__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./crud/delete */ "./js/modules/crud/delete.js");
/* harmony import */ var _crud_hangeTask__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./crud/сhangeTask */ "./js/modules/crud/сhangeTask.js");
/* harmony import */ var _crud_create__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./crud/create */ "./js/modules/crud/create.js");
/* harmony import */ var _services_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/data */ "./js/services/data.js");








function renderTasks() {
  class TaskCard {
    constructor(id, title, date, isDone, descr = "Вы не задали описания") {
      this.id = id;
      this.title = title;
      this.descr = descr;
      this.isDone = isDone;
      this.date = {
        'year': +date.slice(0, 4),
        'month': +date.slice(5, 7),
        'day': +date.slice(8, 10)
      };
    }

    render() {
      if (!this.isDone) {
        const element = document.createElement('div');
        element.classList.add('main__task');
        element.dataset.taskid = this.id;

        if (this.descr === '') {
          this.descr = 'Описание не задано.';
        }

        element.innerHTML = `
					<div class="main__task-block-one">
						<div class="main__task-title" data-task=${this.id}>
							<svg viewBox="0 0 100 100" class="triangle" style="width: 0.6875em; height: 0.6875em; display: block; fill: inherit; flex-shrink: 0; backface-visibility: hidden; transition: transform 200ms ease-out 0s; transform: rotateZ(90deg); opacity: 1;"><polygon points="5.9,88.2 50,11.8 94.1,88.2 "></polygon></svg>
							<span>${this.title}</span>
						</div>
						<div class="main__task-interactiv">
							<img src="img/pencil.svg" class="main__task-icon pencilBtn" data-taskId=${this.id}>
							<img src="img/check-mark.svg" class="main__task-icon doneBtn" data-taskId=${this.id}>
							<img src="img/delete.svg" class="main__task-icon deleteBtn" data-taskId=${this.id}>
						</div>
					</div>
					<div class="main__task-block-two" data-task=${this.id}>
						<div class="main__task-descr">${this.descr}</div>
						<div class="main__task-date">Дата: ${this.date.day}.${getZero(this.date.month)}.${this.date.year}</div>
					</div>
				`;
        document.querySelector('.main__tasks-wrapper').append(element);
      } else {
        const element = document.createElement('div');
        element.classList.add('done__task');
        element.dataset.taskid = this.id;

        if (this.descr === '') {
          this.descr = 'Описание не задано.';
        }

        element.innerHTML = `
					<div class="done__task-block-one">
						<div class="done__task-title" data-task=${this.id}>
							<svg viewBox="0 0 100 100" class="triangle" style="width: 0.6875em; height: 0.6875em; display: block; fill: inherit; flex-shrink: 0; backface-visibility: hidden; transition: transform 200ms ease-out 0s; transform: rotateZ(90deg); opacity: 1;"><polygon points="5.9,88.2 50,11.8 94.1,88.2 "></polygon></svg>
							<span>${this.title}</span>
						</div>
						<div class="done__task-interactiv">
							<?xml version="1.0" encoding="iso-8859-1"?><svg class="done__task-icon" data-taskId=${this.id} id=Capa_1 style="enable-background:new 0 0 446.536 446.536"version=1.1 viewBox="0 0 446.536 446.536"x=0px xml:space=preserve xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink y=0px><g><path d=M282.488,68.589L351.077,0l95.458,95.458l-68.589,68.589L282.488,68.589z /><polygon points="0.001,446.536 117.523,412.737 33.8,329.014 	"/><path d=M144.604,397.393l-95.458-95.458l212.13-212.13l95.458,95.458L144.604,397.393z /></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
							<?xml version="1.0" encoding="iso-8859-1"?><svg class="done__task-icon data-taskId=${this.id} id=Capa_1 style="enable-background:new 0 0 214.155 214.155"version=1.1 viewBox="0 0 214.155 214.155"x=0px xml:space=preserve xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink y=0px><path d=M74.551,193.448L0,118.896l33.136-33.135l41.415,41.415L181.02,20.707l33.135,33.136L74.551,193.448z /><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
							<?xml version="1.0" encoding="iso-8859-1"?><svg class="done__task-icon" data-taskId=${this.id} id=Layer_1 style="enable-background:new 0 0 443 443"version=1.1 viewBox="0 0 443 443"x=0px xml:space=preserve xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink y=0px><g><path d="M321.785,38h-83.384V0H125.169v38H41.785v60h280V38z M155.169,30h53.232v8h-53.232V30z"/><path d="M295.142,214.31l5.66-86.31H62.769l19.016,290h114.172c-14.861-21.067-23.602-46.746-23.602-74.43
								C172.355,274.43,226.849,217.779,295.142,214.31z"/><path d="M301.785,244.141c-54.826,0-99.43,44.604-99.43,99.429S246.959,443,301.785,443s99.43-44.604,99.43-99.43
								S356.611,244.141,301.785,244.141z M355.961,376.533l-21.213,21.213l-32.963-32.963l-32.963,32.963l-21.213-21.213l32.963-32.963
								l-32.963-32.963l21.213-21.213l32.963,32.963l32.963-32.963l21.213,21.213l-32.963,32.963L355.961,376.533z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
						</div>
					</div>
					<div class="done__task-block-two" data-task=${this.id}>
						<div class="done__task-descr">${this.descr}</div>
						<div class="done__task-date">Дата: ${this.date.day}.${getZero(this.date.month)}.${this.date.year}</div>
					</div>
				`;
        document.querySelector('.done__tasks-wrapper').append(element);
      }
    }

  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  let arrayTasks = []; //промис получения тасков

  (0,_services_data__WEBPACK_IMPORTED_MODULE_4__.getData)('http://localhost:8080/api/tasks', 'GET').then(res => {
    arrayTasks = res;

    if (arrayTasks.length == 0) {
      document.querySelector('.main__tasks-wrapper').innerHTML = 'Заданий пока нет. ';
    } else {
      document.querySelector('.main__tasks-wrapper').innerHTML = '';
      document.querySelector('.done__tasks-wrapper').innerHTML = '';
      arrayTasks.forEach(function (item, index) {
        let task = new TaskCard(item.id, item.name, item.updatedAt, item.isDone, item.description);
        task.render();
      });
    }
  }).then(() => {
    (0,_crud_delete__WEBPACK_IMPORTED_MODULE_1__.default)();
    (0,_crud_hangeTask__WEBPACK_IMPORTED_MODULE_2__.changeDone)();
    (0,_crud_hangeTask__WEBPACK_IMPORTED_MODULE_2__.changeDataTasks)();
  }).catch(error => {
    alert('Сервер временно не доступен!');
    console.log(error);
  }).finally(() => {
    (0,_crud_read__WEBPACK_IMPORTED_MODULE_0__.default)();
    (0,_crud_create__WEBPACK_IMPORTED_MODULE_3__.default)();
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderTasks);

/***/ }),

/***/ "./js/services/data.js":
/*!*****************************!*\
  !*** ./js/services/data.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getData": () => (/* binding */ getData)
/* harmony export */ });


const myHeaders = {
  'Content-Type': 'application/json;charset=utf-8',
  'alg': 'HS256',
  'typ': 'JWT',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIzNDEyfQ.FGIdlz8lSwIByLlbX2K9Qp5xgZTtLuhD3YlH5yLq9NA'
};

async function postData(url, json, method) {
  const res = await fetch(url, {
    method: method,
    headers: myHeaders,
    body: json,
    mode: 'cors'
  });
  return await res;
}

async function getData(url, method) {
  const res = await fetch(url, {
    method: method,
    headers: myHeaders,
    mode: 'cors'
  });

  if (method === 'GET') {
    return await res.json();
  } else {
    return await res;
  }
}



/***/ }),

/***/ "./js/services/modal.js":
/*!******************************!*\
  !*** ./js/services/modal.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "modalOpen": () => (/* binding */ modalOpen),
/* harmony export */   "modalClose": () => (/* binding */ modalClose)
/* harmony export */ });


function modalOpen(modal) {
  modal.classList.remove('modal_hide');
  modal.classList.add('modal_show');
}

function modalClose(modal) {
  modal.classList.add('modal_hide');
  modal.classList.remove('modal_show');
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_rendetTasks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/rendetTasks */ "./js/modules/rendetTasks.js");



document.addEventListener('DOMContentLoaded', () => {
  (0,_modules_rendetTasks__WEBPACK_IMPORTED_MODULE_0__.default)();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map