import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// import Button from "../components/Button";
import { AuthActions } from '../redux/actions';
import firebaseAuth from "../firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default props => {
    const { t } = useTranslation();
    const isAuthorized = useSelector(
        state => state.auth.isAuthorized
    );
    // const dispatch = useDispatch();
    const [isTokenGenerated, setJwt] = useState(false);
    const [currentUser, setUser] = useState("");
    const classes = useStyles();
    // const [currentMode, setMode] = useState('light');

    useEffect(() => {
        if (isAuthorized) {
            props.history.push("/");
        }
    }, [isAuthorized, props]);

    // const handleClick = () => {
    //     dispatch(AuthActions.initAuth());
    // };

    const copyToClipboard = (str) => {
        const el = document.createElement("textarea");
        el.value = str;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
    };

  const onAuthClick = (userName) => {
    firebaseAuth
      .signInWithEmailAndPassword(`${userName}@example.com`, "secretPassword")
      .then(async () => {
        const token = await firebaseAuth.currentUser.getIdToken();
        copyToClipboard(token);
        setJwt(true);
        setUser(userName === "user" ? "Admin" : "User");
        setTimeout(() => {
          setJwt(false);
        }, 5000);
      })
      .catch((e) => {
        console.log("Auth Failed", e);
      });
  };

    return (
        <div>
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
            {isTokenGenerated && (
              <div style={{ color: "#009688", padding: "20px", fontSize: "18px" }}>
                {`JWT generated for ${currentUser} and copied to clip board!`}
              </div>
            )}
        </div>
    );
};