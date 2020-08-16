import loginInfoReducer from './logininfo';
import diaryEntryReducer from './diaryentry';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    loginInfoReducer,
    diaryEntryReducer,
});
export default allReducers;