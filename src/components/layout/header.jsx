import { Link } from 'react-router-dom';

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
					<Link to={'/login'} className={styles.btn}>Вход</Link>
					<Link to={'/registration'} className={styles.btn}>Регистрация</Link>
				</div>
			</div>
		</header>
	);
}

export { Header };