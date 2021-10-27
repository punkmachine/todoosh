import { REG } from './../types';

const initialState = {
	login: '',
	pass: '',
	secondPass: ''
}

const registrationReducer = (state = initialState, action) => {
	console.log('reducer >>>', action);

	switch(action.type) {
		case REG: {
			

			return state;
		}

		default: {
			return state;
		}
	}
}

export { registrationReducer };