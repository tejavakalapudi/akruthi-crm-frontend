import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from './auth';
import alertReducer from './alert';
import appStateReducer from './appState';

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    alert: alertReducer,
    appState: appStateReducer,
  });

export default rootReducer;
