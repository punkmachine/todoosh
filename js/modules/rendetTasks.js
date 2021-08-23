'use strict';

//TODO: надо запускать при добавлении нового таска.

function renderTasks() {
	//получени всех тасков
	async function getData(url) {
		const myHeaders = new Headers();

		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMzQxMiJ9.95ohW9ypI-87m3P6H-otIpPM-5W2iqeTucSWIdst8OU');

		const res = await fetch(url, {
			method: 'GET',
			headers: myHeaders,
		});

		if (!res.ok) {
			throw new Error(`Не получается обработать fetch ${url}, статус: ${res.status}`);
		}

		return res.json();
	}

	let arrayTasks = [];

	getData('http://localhost:8080/api/tasks')
		.then((res) => {
			arrayTasks = res;
			console.log(arrayTasks);
		}).catch((error) => {
			console.log(error);
		});
}

export default renderTasks;