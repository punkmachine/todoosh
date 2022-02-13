import { REG, LOGIN, CLEAR } from '../types';

const initialState = {
	login: '',
	pass: '',
	secondPass: '',
	token: '',
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case REG: {
			return {
				...state,
				login: action.login,
				pass: action.pass,
			};
		}

		case LOGIN: {
			return {
				...state,
				login: action.login,
				pass: action.pass,
				token: action.token
			};
		}

		case CLEAR: {
			return {
				...initialState
			}
		}

		default: {
			return state;
		}
	}
}

export { authReducer };