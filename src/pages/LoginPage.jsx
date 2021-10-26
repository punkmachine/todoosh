import styles from './scss/login.module.scss';

function LoginPage() {
	return (
		<div className={styles.login}>
			<h2 className={styles.title}>Введите свои данные для входа.</h2>
			<form className={styles.login__form}>
				<input className={styles.input} type="text" placeholder='Ваш логин' />
				<input className={styles.input} type="password" placeholder='Ваш пароль' />
				<button className={styles.btn}>Войти</button>
			</form>
		</div>
	);
}

export { LoginPage };