import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login as loginFunc } from '../../redux/action';

import styles from './../../scss/modules/components/form.module.scss';

function FormLogin() {
	const dispatch = useDispatch();
	const data = useSelector(state => state.authReducer);
	const [login, setLogin] = useState('');
	const [pass, setPass] = useState('');

	function handleSubmit(event) {
		event.preventDefault();

		dispatch(loginFunc(login, pass));
	}

	function handleLogin(event) {
		setLogin(event.target.value);
	}

	function handlePass(event) {
		setPass(event.target.value);
	}

	console.log(data);

	return (
		<form className={styles.form}>
			<input className={styles.input} onChange={handleLogin} type="text" placeholder='Ваш логин' />
			{/* TODO: глазик для пароля */}
			<input className={styles.input} onChange={handlePass} type="password" placeholder='Ваш пароль' />
			<button className={styles.btn} onClick={handleSubmit}>Войти</button>
		</form>
	);
}

export { FormLogin };