import styles from './../../scss/modules/components/form.module.scss';

function FormReg() {
	return (
		<form className={styles.form}>
			<input className={styles.input} type="text" placeholder='Ваш логин' />
			<input className={styles.input} type="password" placeholder='Ваш пароль' />
			<input className={styles.input} type="password" placeholder='Повторите пароль' />
			<button className={styles.btn}>Зарегестрироваться</button>
		</form>
	);
}

export { FormReg };