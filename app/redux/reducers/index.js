import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import homeReducer from './home';
import authReducer from './auth';
import alertReducer from './alert';
import appStateReducer from './appState';

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    home: homeReducer,
    alert: alertReducer,
    appState: appStateReducer,
  });

export default rootReducer;
