import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import AppRouter from '../routes/AppRouter';
import configureStore, { history } from '../redux/store/configureStore';
import getThemes from '../settings/themes';
// import firebaseAuth from '../firebase';
// import { AuthActions } from '../redux/actions';

import '../styles/app.scss';

const { store, persistor } = configureStore();

const App = () => {
  const [currentTheme, setMode] = useState('light');

  const toggleTheme = () => {
    setMode(currentTheme === 'dark' ? 'light' : 'dark');
  };

  // useEffect(() => {
  //   firebaseAuth.onIdTokenChanged((user) => {
  //     if (user) {
  //       store.dispatch(AuthActions.persistAuth(user));
  //       return;
  //     }
  //     store.dispatch(AuthActions.forceLogout());
  //   });
  // }, []);

  return (
    <ThemeProvider theme={getThemes(currentTheme)}>
      <CssBaseline />
      <div className="App">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppRouter history={history} currentTheme={currentTheme} toggleTheme={toggleTheme} />
          </PersistGate>
        </Provider>
      </div>
    </ThemeProvider>
  );
};

export default hot(module)(App);
