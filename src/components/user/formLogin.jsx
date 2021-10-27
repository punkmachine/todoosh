import styles from './../../scss/modules/components/form.module.scss';

function FormLogin() {
	return (
		<form className={styles.form}>
			<input className={styles.input} type="text" placeholder='Ваш логин' />
			<input className={styles.input} type="password" placeholder='Ваш пароль' />
			<button className={styles.btn}>Войти</button>
		</form>
	);
}

export { FormLogin };