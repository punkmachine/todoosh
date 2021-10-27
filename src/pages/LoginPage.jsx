import { FormLogin } from './../components/user/formLogin'

import styles from '../scss/modules/pages/login.module.scss';

function LoginPage() {
	return (
		<div className={styles.login}>
			<h2 className={styles.title}>Введите свои данные для входа.</h2>
			<FormLogin />
		</div>
	);
}

export { LoginPage };