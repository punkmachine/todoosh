import axios from 'axios';
import { REG, LOGIN, CLEAR } from './types';

export function registration(login = '', pass = '', secondPass = '') {
	//TODO: Сделать проверку на совпадение pass и secondPass
	return async dispatch => {
		axios({
			method: 'POST',
			url: `http://localhost:8080/auth/registration?username=${login}&password=${pass}`,
		}).then((res) => {
			dispatch({
				type: REG,
				login,
				pass,
				token: res.data?.token,
			})
		}).catch((error) => {
			alert('Ошибка, попробуйте позже!');
			console.log(error);
		});
	}
}

export function login(login = '', pass = '') {
	return async dispatch => {
		axios({
			method: 'POST',
			url: `http://localhost:8080/auth/login?username=${login}&password=${pass}`
		}).then((res) => {
			dispatch({
				type: LOGIN,
				login,
				pass,
				token: res.data?.token,
			})
		}).catch((error) => {
			alert('Ошибка, попробуйте позже!');
			console.log(error);
		});
	}
}

export function clear() {
	return {
		type: CLEAR,
	}
}