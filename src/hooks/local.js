import { useMemo } from 'react';

export const useLocal = () => {
	const setLocalItem = (key, value) => localStorage.setItem(key, JSON.stringify(value));
	const clearLocal = () => localStorage.clear();

	const user = localStorage.getItem('user');

	return {
		setLocalItem,
		clearLocal,
		user: useMemo(() => (user ? JSON.parse(user) : null), [user])
	}
}