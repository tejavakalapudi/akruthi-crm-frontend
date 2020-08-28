import React, { useState } from 'react';
import { Button, Typography, Container, TextField, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Logo, GoogleSignInButton } from '../../components';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  divider: {
    flexGrow: 1,
  },
}));

const AuthDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', margin: 'auto', maxWidth: '350px' }}>
    <Divider style={{ flexGrow: 1 }} />
    <Typography variant="overline" style={{ margin: 15 }}>
      OR LOGIN WITH EMAIL
    </Typography>
    <Divider style={{ flexGrow: 1 }} />
  </div>
);

export default ({ onEmailAuthClick, onGoogleAuthClick }) => {
  const classes = useStyles();
  const [currentEmail, setEmail] = useState('');
  const [currentPass, setPass] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePassChange = (e) => {
    setPass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEmailAuthClick(currentEmail, currentPass);
  };

  return (
    <Container maxWidth="sm" className="login-root__paper">
      <Logo />
      <GoogleSignInButton handleClick={onGoogleAuthClick} />
      <AuthDivider />

      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          id="standard-secondary"
          label="Email"
          color="secondary"
          variant="outlined"
          classes={{ root: 'login-input' }}
          onChange={handleEmailChange}
        />
        <TextField
          id="standard-secondary"
          label="Password"
          color="secondary"
          variant="outlined"
          classes={{ root: 'login-input' }}
          type="password"
          onChange={handlePassChange}
        />
        <Button type="submit" variant="contained" color="primary" classes={{ root: 'login-input button' }}>
          Login
        </Button>
      </form>
    </Container>
  );
};
