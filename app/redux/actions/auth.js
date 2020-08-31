import * as types from '../../constants/actionTypes';
import firebaseAuth, { googleAuthProvider } from '../../firebase';
import AlertActions from './alert';
import AppStateActions from './appState';
import authService from '../../services/authService';

const setAuth = (isAuthorized, user) => ({
  type: types.SET_AUTH,
  isAuthorized,
  user,
});

const resetAuth = () => ({
  type: types.RESET_AUTH,
});

const persistAuth = (user) => async (dispatch) => {
  await authService.postAuth();
  dispatch(AppStateActions.setIsBusy(false));
  return dispatch(setAuth(true, user));
};

const forceLogout = () => (dispatch, getState) => {
  const currentState = getState();
  if (currentState.auth.isAuthorized) {
    dispatch(
      AlertActions.setAlert({
        message: 'Session timed out! Please login again.',
        type: 'error',
      })
    );
    dispatch(resetAuth());
  }
};

const logout = () => (dispatch) =>
  firebaseAuth.signOut().then(() => {
    dispatch(resetAuth());
  });

const initAuth = (email, pass) => (dispatch) => {
  dispatch(AppStateActions.setIsBusy(true));
  return firebaseAuth
    .signInWithEmailAndPassword(email, pass)
    .then(() => {
      dispatch(persistAuth(firebaseAuth.currentUser));
    })
    .catch(() => {
      dispatch(setAuth(false));
      dispatch(AppStateActions.setIsBusy(false));
      dispatch(
        AlertActions.setAlert({
          message: 'Authorization failed! Please try again.',
          type: 'error',
        })
      );
    });
};

const signInWithGoogle = () => (dispatch) => {
  dispatch(AppStateActions.setIsBusy(true));
  return firebaseAuth
    .signInWithPopup(googleAuthProvider)
    .then(() => {
      dispatch(persistAuth(firebaseAuth.currentUser));
    })
    .catch(() => {
      dispatch(setAuth(false));
      dispatch(AppStateActions.setIsBusy(false));
      dispatch(
        AlertActions.setAlert({
          message: 'Authorization failed! Please try again.',
          type: 'error',
        })
      );
    });
};

export default { initAuth, logout, persistAuth, forceLogout, signInWithGoogle };
