import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
// import { HistoryRouter as Router } from "redux-first-history/rr6";

import { LeadsActions, StatusActions, EmployeesActions, VenturesActions, AuthActions } from '../redux/actions';
import firebaseAuth from '../firebase';

import LoadingComponent from '../components/Loading';
import HomePage from '../containers/Home';
import Ventures from '../containers/Ventures';
import Analytics from '../containers/Analytics';
import Leads from '../containers/Leads';
import LoginPage from '../containers/login';
// import PrivateRoute from './PrivateRoute';
// import PublicRoute from './PublicRoute';
import { Alert, DrawableSideNav } from '../components';

function RequireAuth({ children, redirectTo, isAuthorized, loc }) {
  return isAuthorized ? children : <Navigate to={redirectTo} replace/>;
}

const AppRouter = ({ history, currentTheme, toggleTheme }) => {
  const isAppBusy = useSelector((state) => state.appState.isBusy);
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);

  const dispatch = useDispatch();
  useEffect(() => {
    axios.interceptors.request.use(
      async (config) => {
        try {
          const jwtToken = await firebaseAuth.currentUser.getIdToken();
          return {
            ...config,
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              'x-client-id': 'seed',
            },
          };
        } catch (error) {
          return console.log('Interceptor failed with an error,', error);
        }
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(AuthActions.persistAuth(user));
        dispatch(StatusActions.getAllStatuses());
        dispatch(LeadsActions.getAllLeads());
        dispatch(EmployeesActions.getAllEmployees());
        dispatch(VenturesActions.getAllVentures());
      }
    });
  }, []);

  return (
    <Router history={history}>
      <Alert />
      <DrawableSideNav currentTheme={currentTheme} toggleTheme={toggleTheme} />
      {isAppBusy && <LoadingComponent />}
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth redirectTo={"/login"} isAuthorized={isAuthorized} >
              <HomePage/>
            </RequireAuth>
          }
          exact
        />
        <Route
          path="/login"
          element={
            <RequireAuth redirectTo={"/"} isAuthorized={!isAuthorized}>
              <LoginPage/>
            </RequireAuth>
          }
          exact
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth redirectTo={"/login"} isAuthorized={isAuthorized}  >
              <HomePage/>
            </RequireAuth>
          }
          exact
        />
        <Route
          path="/leads"
          element={
            <RequireAuth redirectTo={"/login"} isAuthorized={isAuthorized}>
              <Leads/>
            </RequireAuth>
          }
          exact
        />
        <Route
            path="/ventures"
            element={
              <RequireAuth redirectTo={"/login"} isAuthorized={isAuthorized}  >
                <Ventures/>
              </RequireAuth>
            }
            exact
          />
        <Route
          path="/analytics"
          element={
            <RequireAuth redirectTo={"/login"} isAuthorized={isAuthorized} >
              <Analytics/>
            </RequireAuth>
          }
          exact
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
