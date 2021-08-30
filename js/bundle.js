/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/addTask.js":
/*!*******************************!*\
  !*** ./js/modules/addTask.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/modal */ "./js/services/modal.js");
/* harmony import */ var _rendetTasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rendetTasks */ "./js/modules/rendetTasks.js");





function addTask() {
  //modal add 
  const modalAdd = document.querySelector('#add'),
        modalAddClose = modalAdd.querySelector('.modal__close'),
        modalAddOpen = document.querySelector('.main__add-tasks'); //настройка запроса, посыл запроса на сервер и получение ответа

  async function postData(url, data) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        "alg": "HS256",
        "typ": "JWT",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMzQxMiJ9.95ohW9ypI-87m3P6H-otIpPM-5W2iqeTucSWIdst8OU"
      },
      mode: 'cors',
      body: data
    });
    return await res;
  }

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
  modalAdd.addEventListener('submit', function (event) {
    event.preventDefault();
    const form = modalAdd.querySelector('form'); //конструкция данных из форм

    const formData = new FormData(form); //Превращение данных в матрицу, потом в объект.

    let json = Object.fromEntries(formData.entries()); //обработка строк для человеческого вида, если пользователь страдает от психических расстройств и вводит не пойми что

    json.name = S(`${json.name}`).replaceAll('_', '').s;
    json.description = S(`${json.description}`).replaceAll('_', '').s;
    json.name = S(`${json.name}`).humanize().s;
    json.description = S(`${json.description}`).humanize().s; //превращение данных в json

    json = JSON.stringify(json);
    console.log(json); //обработка промиса

    postData('http://localhost:8080/api/task/new', json).then(res => {
      if (res.status === 200) {
        (0,_rendetTasks__WEBPACK_IMPORTED_MODULE_1__.default)();
        (0,_services_modal__WEBPACK_IMPORTED_MODULE_0__.modalClose)(modalAdd);
      } else if (res.status === 401) {
        alert(`Авторизуйтесь, чтобы добавлять задачи.`);
      } else {
        alert(`Отправка данных не произошла, код ошибки ${res.status}`);
      }
    }).catch(error => {
      alert('Все плохо!');
      console.log(error);
    }).finally(() => {
      form.reset();
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addTask);

/***/ }),

/***/ "./js/modules/modalLogin.js":
/*!**********************************!*\
  !*** ./js/modules/modalLogin.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/modal */ "./js/services/modal.js");




function modalLogin() {
  const modalLogin = document.querySelector('#login'),
        modalLoginClose = modalLogin.querySelector('.modal__close'),
        modalLoginOpen = document.querySelector('.header__login');
  modalLoginOpen.addEventListener('click', () => {
    (0,_services_modal__WEBPACK_IMPORTED_MODULE_0__.modalOpen)(modalLogin);
  });
  document.addEventListener('keydown', function (event) {
    if (event.code === 'Escape' && modalLogin.classList.contains('modal_show')) {
      (0,_services_modal__WEBPACK_IMPORTED_MODULE_0__.modalClose)(modalLogin);
    }
  });
  modalLogin.addEventListener('click', function (event) {
    if (event.target === modalLogin || event.target === modalLoginClose) {
      (0,_services_modal__WEBPACK_IMPORTED_MODULE_0__.modalClose)(modalLogin);
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalLogin);

/***/ }),

/***/ "./js/modules/modalRegister.js":
/*!*************************************!*\
  !*** ./js/modules/modalRegister.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/modal */ "./js/services/modal.js");




function modalRegister() {
  const modalRegister = document.querySelector('#register'),
        modalRegisterClose = modalRegister.querySelector('.modal__close'),
        modalRegisterOpen = document.querySelector('.header__register');
  modalRegisterOpen.addEventListener('click', () => {
    (0,_services_modal__WEBPACK_IMPORTED_MODULE_0__.modalOpen)(modalRegister);
  });
  document.addEventListener('keydown', function (event) {
    if (event.code === 'Escape' && modalRegister.classList.contains('modal_show')) {
      (0,_services_modal__WEBPACK_IMPORTED_MODULE_0__.modalClose)(modalRegister);
    }
  });
  modalRegister.addEventListener('click', function (event) {
    if (event.target === modalRegister || event.target === modalRegisterClose) {
      (0,_services_modal__WEBPACK_IMPORTED_MODULE_0__.modalClose)(modalRegister);
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalRegister);

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
/* harmony import */ var _taskVisibleDescr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskVisibleDescr */ "./js/modules/taskVisibleDescr.js");




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
      this.time = date;
    }

    render() {
      const element = document.createElement('div');
      element.classList.add('main__task');

      if (!this.isDone) {
        element.innerHTML = `
					<div class="main__task-block-one">
						<div class="main__task-title" data-task=${this.id}>
							<svg viewBox="0 0 100 100" class="triangle" style="width: 0.6875em; height: 0.6875em; display: block; fill: inherit; flex-shrink: 0; backface-visibility: hidden; transition: transform 200ms ease-out 0s; transform: rotateZ(90deg); opacity: 1;"><polygon points="5.9,88.2 50,11.8 94.1,88.2 "></polygon></svg>
							<span>${this.title}</span>
						</div>
						<div class="main__task-interactiv">
							<img src="img/pencil.svg" class="main__task-icon">
							<img src="img/check-mark.svg" class="main__task-icon">
							<img src="img/delete.svg" class="main__task-icon">
						</div>
					</div>
					<div class="main__task-block-two" data-task=${this.id}>
						<div class="main__task-descr">${this.descr}</div>
						<div class="main__task-date">Дата: ${this.date.day}.${getZero(this.date.month)}.${this.date.year}</div>
					</div>
				`;
      }

      document.querySelector('.main__tasks-wrapper').append(element);
    }

  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  } //получени всех тасков


  async function getData(url) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMzQxMiJ9.95ohW9ypI-87m3P6H-otIpPM-5W2iqeTucSWIdst8OU');
    const res = await fetch(url, {
      method: 'GET',
      headers: myHeaders
    });

    if (!res.ok) {
      throw new Error(`Не получается обработать fetch ${url}, статус: ${res.status}`);
    } // console.log(res);


    return res.json();
  }

  let arrayTasks = []; //промис получения тасков

  getData('http://localhost:8080/api/tasks').then(res => {
    arrayTasks = res;

    if (arrayTasks.length == 0) {
      document.querySelector('.main__tasks-wrapper').innerHTML = 'Заданий пока нет. ';
    } else {
      document.querySelector('.main__tasks-wrapper').innerHTML = '';
      arrayTasks.forEach(function (item, index) {
        let task = new TaskCard(item.id, item.name, item.updatedAt, item.isDone, item.description);
        task.render();
      });
    }
  }).catch(error => {
    console.log(error);
  }).finally(() => {
    (0,_taskVisibleDescr__WEBPACK_IMPORTED_MODULE_0__.default)();
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderTasks);

/***/ }),

/***/ "./js/modules/taskVisibleDescr.js":
/*!****************************************!*\
  !*** ./js/modules/taskVisibleDescr.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


function taskVisibleDescr() {
  let tasksTitle = document.querySelectorAll('.main__task-title'),
      tasksDescr = document.querySelectorAll('.main__task-block-two'),
      doneTasksTitle = document.querySelectorAll('.done__task-title'),
      doneTasksDescr = document.querySelectorAll('.done__task-block-two');

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

  tasksDescr.forEach(function (item) {
    item.style.display = 'none';
  });
  doneTasksDescr.forEach(function (item) {
    item.style.display = 'none';
  });
  tasksTitle.forEach(function (item) {
    item.addEventListener('click', () => {
      let itemDescr = tasksDescr[item.dataset.task - 1];
      let triangle = item.querySelector('svg');
      transformStyleItem(itemDescr, triangle);
    });
  });
  doneTasksTitle.forEach(function (item) {
    item.addEventListener('click', () => {
      let itemDescr = doneTasksDescr[item.dataset.done - 1];
      let triangle = item.querySelector('svg');
      transformStyleItem(itemDescr, triangle);
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (taskVisibleDescr);

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
/* harmony import */ var _modules_modalRegister__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/modalRegister */ "./js/modules/modalRegister.js");
/* harmony import */ var _modules_modalLogin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modalLogin */ "./js/modules/modalLogin.js");
/* harmony import */ var _modules_rendetTasks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/rendetTasks */ "./js/modules/rendetTasks.js");
/* harmony import */ var _modules_addTask__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/addTask */ "./js/modules/addTask.js");






document.addEventListener('DOMContentLoaded', () => {
  (0,_modules_rendetTasks__WEBPACK_IMPORTED_MODULE_2__.default)();
  (0,_modules_modalRegister__WEBPACK_IMPORTED_MODULE_0__.default)();
  (0,_modules_modalLogin__WEBPACK_IMPORTED_MODULE_1__.default)();
  (0,_modules_addTask__WEBPACK_IMPORTED_MODULE_3__.default)();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map