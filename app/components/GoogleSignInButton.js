import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import GoogleIcon from '../assets/google.png';

const GoogleSignInButton = (props) => {
  const { handleClick } = props;
  return (
    <Button
      variant="contained"
      onClick={handleClick}
      classes={{ root: 'login-input button' }}
      startIcon={<img alt="Google" src={GoogleIcon} className="google-button__icon" />}
    >
      Sign in with google
    </Button>
  );
};

GoogleSignInButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default GoogleSignInButton;
