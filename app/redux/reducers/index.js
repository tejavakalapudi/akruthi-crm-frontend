import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from './auth';
import alertReducer from './alert';
import appStateReducer from './appState';
import leadsReducer from './leads';

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    alert: alertReducer,
    appState: appStateReducer,
    leads: leadsReducer,
  });

export default rootReducer;
