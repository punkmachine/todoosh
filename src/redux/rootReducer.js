import { combineReducers } from "redux";

import { registrationReducer } from "./reducers/registrationReducer";

export const rootReducer = combineReducers({
	registrationReducer
});