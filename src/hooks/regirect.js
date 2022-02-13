import { useHistory, useLocation } from 'react-router-dom';

export const useRegirect = () => {
	const history = useHistory();
	const { pathname } = useLocation();

	const goHome = () => history.push('/');

	return {
		pathname,
		goHome,
	}
}