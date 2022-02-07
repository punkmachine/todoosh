import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { login as loginFunc } from '../../redux/action';

import { useRegirect } from '../../hooks/regirect';
import { useLocal } from '../../hooks/local';

import styles from './../../scss/modules/components/form.module.scss';

function FormLogin() {
	const dispatch = useDispatch();
	const data = useSelector(state => state.authReducer);

	const [login, setLogin] = useState('');
	const [pass, setPass] = useState('');

	const { setLocalItem } = useLocal();
	const { goHome } = useRegirect();

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

	useEffect(() => {
		if (data?.token) {
			setLocalItem('user', data.login);
			goHome();
		}
		// eslint-disable-next-line
	}, [data]);

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