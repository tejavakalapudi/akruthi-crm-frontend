import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';

import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { AuthActions } from '../redux/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default props => {
  const isAuthorized = useSelector(
      state => state.auth.isAuthorized
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
      if (isAuthorized) {
          props.history.push("/");
      }
  }, [isAuthorized, props]);

  const onAuthClick = (userName) => {    
    dispatch(AuthActions.initAuth(userName));
  };

  return (
    <div >
        <Helmet>
            <title>Login Page</title>
            <meta name="description" content="Login to continue" />
        </Helmet>
        <div className={classes.root}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              onAuthClick("user");
            }}
          >
            Admin
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onAuthClick("user1");
            }}
          >
            User
          </Button>
        </div>
    </div>
  );
};