import { combineReducers } from 'redux';
import projectSlice from './features/projectSlice';
import userSlice from './features/userSlice';

const rootReducer = combineReducers({
	userReducer: userSlice,
	projectReducer: projectSlice,
});
export default rootReducer;
