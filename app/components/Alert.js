/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { AlertActions } from '../redux/actions';

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

export default () => {
  const alertObj = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(AlertActions.resetAlert());
  };

  return (
    <Snackbar
      open={alertObj.open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={handleClose}
    >
      <Alert severity={alertObj.type}>{alertObj.message}</Alert>
    </Snackbar>
  );
};
