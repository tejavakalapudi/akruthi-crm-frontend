import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useTranslation } from 'react-i18next';
import {  CssBaseline, Switch, FormControl, Select, MenuItem } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import AppRouter from '../routes/AppRouter';
import configureStore, { history } from '../redux/store/configureStore';
import getThemes from "../settings/themes";
import firebaseAuth from "../firebase";
import { AuthActions } from '../redux/actions';

import "../styles/app.scss";

const { store, persistor } = configureStore();

const App = () => {
  const { i18n } = useTranslation();
  const [currentLang, setLocale] = useState('en');
  const [currentMode, setMode] = useState('light');

  const onLanguageHandle = (event) => {
    const newLang = event.target.value;
    setLocale(newLang);
    i18n.changeLanguage(newLang);
  };

  const handleToggle = () => {
    setMode(currentMode === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    firebaseAuth.onIdTokenChanged(user => {
      if (user) {
        store.dispatch(AuthActions.persistAuth(user));
        return;
      }
      store.dispatch(AuthActions.forceLogout());
    });
  }, []);


  const renderSettings = () => (
    <div style={{display: 'flex', justifyContent: 'flex-end', padding: '5px 0', position: 'absolute', width: '100%'}}>
      <FormControl>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentLang}
          onChange={onLanguageHandle}
        >
          <MenuItem value="en">en</MenuItem>
          <MenuItem value="hi">hi</MenuItem>
        </Select>
      </FormControl>
      <Switch
        checked={currentMode === 'dark'}
        onChange={handleToggle}
        name="darkMode"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    </div>
  );

  return (
    <ThemeProvider theme={getThemes(currentMode)}>
      <CssBaseline />
        {renderSettings()}
        <div className="App">
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <AppRouter history={history} />
            </PersistGate>
          </Provider>
        </div> 
    </ThemeProvider>
  );
};

export default hot(module)(App);