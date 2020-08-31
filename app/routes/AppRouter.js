import React from 'react';
import { Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import LoadingComponent from '../components/Loading';
import HomePage from '../containers/Home';
import Ventures from '../containers/Ventures';
import Analytics from '../containers/Analytics';
import LoginPage from '../containers/login';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { Alert, DrawableSideNav } from '../components';

const AppRouter = ({ history }) => {
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  const isAppBusy = useSelector((state) => state.appState.isBusy);

  return (
    <ConnectedRouter history={history}>
      <Alert />
      {isAuthorized && <DrawableSideNav />}
      {isAppBusy && <LoadingComponent />}
      <Switch>
        <PrivateRoute path="/" component={HomePage} exact />
        <PublicRoute path="/login" component={LoginPage} />
        <PrivateRoute path="/dashboard" component={HomePage} exact />
        <PrivateRoute path="/ventures" component={Ventures} exact />
        <PrivateRoute path="/analytics" component={Analytics} exact />
      </Switch>
    </ConnectedRouter>
  );
};

export default AppRouter;
