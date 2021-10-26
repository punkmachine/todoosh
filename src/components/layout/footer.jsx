import styles from './scss/footer.module.scss';

function Footer() {
	return (
		<footer className={styles.footer}>
			<span className={styles.copyright}>(c) сделано Саней под наркотрипами.</span>
		</footer>
	);
}

export { Footer };