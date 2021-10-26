import styles from './scss/home.module.scss'

function Home() {
	return (
		<>
			<main>
				<div className={styles.container}>
					<section>
						<h2 className={styles.title}>Задачи на очередь</h2>
						{/* TODO: компонент списка тасков */}
					</section>
					
					<section>
						<h2 className={styles.title}>Выполненные задачи</h2>
						{/* TODO: компонент списка тасков */}
					</section>
				</div>
			</main>
		</>
	);
}

export { Home };