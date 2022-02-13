import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clear } from '../redux/action';

export const useLocal = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const setLocalItem = (key, value) => localStorage.setItem(key, JSON.stringify(value));
	const user = localStorage.getItem('user');

	const handleClear = () => {
		localStorage.clear();
		dispatch(clear());
		history.push('/');
	}

	return {
		setLocalItem,
		handleClear,
		user: useMemo(() => (user ? JSON.parse(user) : null), [user])
	}
}