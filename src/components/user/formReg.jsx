import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registration } from '../../redux/action';

import styles from './../../scss/modules/components/form.module.scss';

function FormReg() {
	const dispatch = useDispatch();
	const data = useSelector(state => state.registrationReducer);
	const [login, setLogin] = useState('');
	const [pass, setPass] = useState('');
	const [secondPass, setSecondPass] = useState('');

	console.log('data >>> ', data);

	function handleSubmit(event) {
		event.preventDefault();

		dispatch(registration(login, pass, secondPass));
	}

	function handleLogin(event) {
		setLogin(event.target.value);
	}

	function handlePass(event) {
		setPass(event.target.value);
	}

	function handleSecondPass(event) {
		setSecondPass(event.target.value);
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<input onChange={handleLogin} className={styles.input} type="text" placeholder='Ваш логин' />
			<input onChange={handlePass} className={styles.input} type="password" placeholder='Ваш пароль' />
			<input onChange={handleSecondPass} className={styles.input} type="password" placeholder='Повторите пароль' />
			<button className={styles.btn}>Зарегестрироваться</button>
		</form>
	);
}

export { FormReg };