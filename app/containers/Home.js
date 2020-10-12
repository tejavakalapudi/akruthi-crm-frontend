/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { AlertActions } from '../redux/actions';
import copyToClipboard from '../utils/copyToClipboard';
import firebaseAuth from '../firebase';
import { ReactHelmet } from '../components';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  // TODO: Remove this in future
  const copyJwt = async () => {
    const token = await firebaseAuth.currentUser.getIdToken();
    copyToClipboard(token);
    dispatch(
      AlertActions.setAlert({
        message: 'JWT copied to the clipboard!',
        type: 'success',
      })
    );
  };

  return (
    <div>
      <ReactHelmet title="Dashboard" meta="Discover your leads" />
      <div>Dashboard</div>
      <div className={classes.root}>
        <Button onClick={copyJwt} variant="contained">
          Copy JWT
        </Button>
      </div>
    </div>
  );
};
