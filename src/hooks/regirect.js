import { useHistory } from 'react-router-dom';

export const useRegirect = () => {
	const history = useHistory();

	const goHome = () => history.push('/');

	return {
		goHome,
	}
}