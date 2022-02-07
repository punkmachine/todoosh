import { Link } from 'react-router-dom';

import { REGISTRATION_PAGE, LOGIN_PAGE } from '../../constants/route';

import styles from '../../scss/modules/components/header.module.scss';

function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.header__content}>
				<div>
					<Link to={'/'}>
						<img src={process.env.PUBLIC_URL + '/img/logotype.svg'} alt='логотип' title='Перейти на главную' />
					</Link>
				</div>
				<div>
					<Link to={LOGIN_PAGE} className={styles.btn}>Вход</Link>
					<Link to={REGISTRATION_PAGE} className={styles.btn}>Регистрация</Link>
				</div>
			</div>
		</header>
	);
}

export { Header };