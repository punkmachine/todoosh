import { Link } from 'react-router-dom';
import { useLocal } from '../../hooks/local';
import { useRegirect } from '../../hooks/regirect';
import { REGISTRATION_PAGE, LOGIN_PAGE } from '../../constants/route';
import styles from '../../scss/modules/components/header.module.scss';

function Header() {
	const { user, handleClear } = useLocal();
	const { pathname } = useRegirect();

	return (
		<header className={styles.header}>
			<div className={styles.header__content}>
				<div>
					<Link to={'/'}>
						<img src={process.env.PUBLIC_URL + '/img/logotype.svg'} alt='логотип' title='Перейти на главную' />
					</Link>
				</div>
				{pathname !== LOGIN_PAGE &&
					(<div>
						{user
							? <button onClick={handleClear} className={styles.btn}>Выход</button>
							: (
								<>
									<Link to={LOGIN_PAGE} className={styles.btn}>Вход</Link>
									<Link to={REGISTRATION_PAGE} className={styles.btn}>Регистрация</Link>
								</>
							)
						}
					</div>)
				}
			</div>
		</header>
	);
}

export { Header };