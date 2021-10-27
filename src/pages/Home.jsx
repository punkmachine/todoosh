import styles from '../scss/modules/pages/home.module.scss';

function Home() {
	return (
		<div>
			<section>
				<h2 className={styles.title}>Задачи на очередь</h2>
				{/* TODO: компонент списка тасков */}
			</section>
			
			<section>
				<h2 className={styles.title}>Выполненные задачи</h2>
				{/* TODO: компонент списка тасков */}
			</section>
		</div>
	);
}

export { Home };