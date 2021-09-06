'use strict';

const myHeaders = {
	'Content-Type': 'application/json;charset=utf-8',
	'alg': 'HS256',
	'typ': 'JWT',
	'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIzNDEyfQ.FGIdlz8lSwIByLlbX2K9Qp5xgZTtLuhD3YlH5yLq9NA'
}

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

export { postData, getData };