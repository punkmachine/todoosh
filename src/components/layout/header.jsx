import { Link } from 'react-router-dom';

import styles from './scss/header.module.scss';

function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.header__content}>
				<div>
					<a href="#">
						<img src={process.env.PUBLIC_URL + '/img/logotype.svg'} alt='логотип' title='Перейти на главную' /> 
					</a>
				</div>
				<div>
					<Link to={'/login'} className={styles.btn}>Вход</Link>
					<button className={styles.btn}>Регистрация</button>
				</div>
			</div>

		</header>
	);
}

export { Header };