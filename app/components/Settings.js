import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  FormControl,
  MenuItem,
  Select,
  Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { AuthActions } from '../redux/actions';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  root: {
    width: '100%',
  },
}));

export default ({ currentTheme, toggleTheme }) => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const currentAuth = useSelector((state) => state.auth);
  const classes = useStyles();

  const [currentLang, setLocale] = useState('en');

  const onLanguageHandle = (event) => {
    const newLang = event.target.value;
    setLocale(newLang);
    i18n.changeLanguage(newLang);
  };

  const logout = () => {
    dispatch(AuthActions.logout());
  };

  return (
    <div className="settings-wrapper">
      <Avatar
        alt={currentAuth.user.displayName}
        src={currentAuth.user.photoURL}
        className={classes.large}
        classes={{
          root: 'avatar',
        }}
      />
      <div className="name">{currentAuth.user.displayName}</div>
      <Divider />
      <List className={classes.root}>
        <ListItem>
          <ListItemText id="switch-list-label-darkmode" primary="Dark mode" />
          <ListItemSecondaryAction>
            <Switch
              checked={currentTheme === 'dark'}
              onChange={toggleTheme}
              name="darkMode"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText id="switch-list-label-locale" primary="Locale" />
          <ListItemSecondaryAction>
            <FormControl variant="standard">
              <Select
                variant="standard"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentLang}
                onChange={onLanguageHandle}>
                <MenuItem value="en">en</MenuItem>
                <MenuItem value="hi">hi</MenuItem>
              </Select>
            </FormControl>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <Button onClick={logout} color="secondary" variant="contained" style={{ marginTop: 20, marginBottom: 10 }}>
        Logout
      </Button>
    </div>
  );
};
