import styles from '../scss/modules/pages/registration.module.scss';

function RegistrationPage() {
	return (
		<div className={styles.login}>
			<h2 className={styles.title}>Введите свои данные для регистрации.</h2>
			<form className={styles.login__form}>
				<input className={styles.input} type="text" placeholder='Ваш логин' />
				<input className={styles.input} type="password" placeholder='Ваш пароль' />
				<input className={styles.input} type="password" placeholder='Повторите пароль' />
				<button className={styles.btn}>Зарегестрироваться</button>
			</form>
		</div>
	);
}

export { RegistrationPage };