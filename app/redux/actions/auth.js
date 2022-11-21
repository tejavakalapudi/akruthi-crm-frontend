import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import * as types from '../../constants/actionTypes';
import firebaseAuth, { googleAuthProvider } from '../../firebase';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

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
    dispatch(AppStateActions.setIsBusy(false));
  }
};

const logout = () => (dispatch) =>
  signOut(getAuth()).then(() => {
    dispatch(resetAuth());
    dispatch(AppStateActions.setIsBusy(false));
  });

const initAuth = (email, pass) => (dispatch) => {
  dispatch(AppStateActions.setIsBusy(true));
  return signInWithEmailAndPassword(email, pass)
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
  return signInWithPopup(getAuth(), googleAuthProvider)
    .then(() => {
      dispatch(persistAuth(firebaseAuth.currentUser));
    })
    .catch((e) => {
      dispatch(setAuth(false));
      console.log("Error while signing in with Google", e);
      dispatch(AppStateActions.setIsBusy(false));
      dispatch(
        AlertActions.setAlert({
          message: 'Authorization failed! Please try again.',
          type: 'error',
        })
      );
    });
};

// const signInWithGoogle = createAsyncThunk(
//   'auth/signInWithGoogle',
//   async () => {
//     // dispatch(AppStateActions.setIsBusy(true));
//     return signInWithPopup(firebaseAuth.currentUser, googleAuthProvider)
//       .then(() => {
//         dispatch(persistAuth(firebaseAuth.currentUser));
//       })
//       .catch(() => {
//         dispatch(setAuth(false));
//         dispatch(AppStateActions.setIsBusy(false));
//         dispatch(
//           AlertActions.setAlert({
//             message: 'Authorization failed! Please try again.',
//             type: 'error',
//           })
//         );
//       });
//   }
// )

export default { initAuth, logout, persistAuth, forceLogout, signInWithGoogle };
