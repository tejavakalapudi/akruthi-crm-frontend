import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { AuthActions } from '../../redux/actions';

import { ReactHelmet } from '../../components';
import LoginWrapper from './Wrapper';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    width: '100%',
    height: '100%',
  },
}));

export default (props) => {
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  useEffect(() => {
    if (isAuthorized) {
      props.history.push('/');
    }
  }, [isAuthorized, props]);

  const onEmailAuthClick = (email, pass) => {
    dispatch(AuthActions.initAuth(email, pass));
  };

  const onGoogleAuthClick = () => {
    dispatch(AuthActions.signInWithGoogle());
  };

  return (
    <div className={classes.root}>
      <ReactHelmet title="Login Page" meta="Login to continue" />
      <Grid container classes={{ root: 'login-root' }}>
        <Grid item xs={12} md={5} classes={{ root: 'login-root__wrapper' }}>
          <LoginWrapper onEmailAuthClick={onEmailAuthClick} onGoogleAuthClick={onGoogleAuthClick} />
        </Grid>
        <Grid item xs={12} md={7} classes={{ root: `login-root__slides ${isDarkMode ? 'dark' : ''}` }} />
      </Grid>
    </div>
  );
};
