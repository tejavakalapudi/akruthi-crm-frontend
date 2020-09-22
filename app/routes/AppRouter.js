import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { ConnectedRouter } from 'connected-react-router';

import { LeadsActions, StatusActions } from '../redux/actions';
import firebaseAuth from '../firebase';

import LoadingComponent from '../components/Loading';
import HomePage from '../containers/Home';
import Ventures from '../containers/Ventures';
import Analytics from '../containers/Analytics';
import Leads from '../containers/Leads';
import LoginPage from '../containers/login';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { Alert, DrawableSideNav } from '../components';

const AppRouter = ({ history }) => {
  const currentAuth = useSelector((state) => state.auth);
  const isAppBusy = useSelector((state) => state.appState.isBusy);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.interceptors.request.use(
      async (config) => {
        try {
          let jwtToken;
          if (firebaseAuth.currentUser) {
            jwtToken = await firebaseAuth.currentUser.getIdToken();
          } else {
            jwtToken = currentAuth.user.stsTokenManager.accessToken;
          }
          return {
            ...config,
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              'x-client-id': 'seed',
            },
          };
        } catch (error) {
          return console.log('-------', error);
        }
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    dispatch(StatusActions.getAllStatuses());
    dispatch(LeadsActions.getAllLeads());
  }, []);

  return (
    <ConnectedRouter history={history}>
      <Alert />
      {currentAuth.isAuthorized && <DrawableSideNav />}
      {isAppBusy && <LoadingComponent />}
      <Switch>
        <PrivateRoute path="/" component={HomePage} exact />
        <PublicRoute path="/login" component={LoginPage} />
        <PrivateRoute path="/dashboard" component={HomePage} exact />
        <PrivateRoute path="/leads" component={Leads} exact />
        <PrivateRoute path="/ventures" component={Ventures} exact />
        <PrivateRoute path="/analytics" component={Analytics} exact />
      </Switch>
    </ConnectedRouter>
  );
};

export default AppRouter;
