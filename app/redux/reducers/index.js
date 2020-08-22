import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import homeReducer from './home';
import authReducer from './auth';
import alertReducer from './alert';

const rootReducer = history => combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    home: homeReducer,
    alert: alertReducer
});

export default rootReducer;