import { REG } from './types';

export function registration(login = '', pass = '', secondPass = '') {
	return {
		type: REG,
		login,
		pass,
		secondPass
	}
}