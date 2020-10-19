import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from './auth';
import alertReducer from './alert';
import appStateReducer from './appState';
import leadsReducer from './leads';
import statusReducer from './statuses';
import venturesReducer from './ventures';
import employeesReducer from './employees';

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    alert: alertReducer,
    appState: appStateReducer,
    leads: leadsReducer,
    statuses: statusReducer,
    ventures: venturesReducer,
    employees: employeesReducer,
  });

export default rootReducer;
