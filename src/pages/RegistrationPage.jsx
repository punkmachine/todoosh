import { FormReg } from '../components/user/formReg';

import styles from '../scss/modules/pages/registration.module.scss';

function RegistrationPage() {
	return (
		<div className={styles.reg}>
			<h2 className={styles.title}>Введите свои данные для регистрации.</h2>
			<FormReg />
		</div>
	);
}

export { RegistrationPage };