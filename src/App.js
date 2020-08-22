import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { Container, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import firebaseAuth from "./firebase";
import { ThemeProvider } from "@material-ui/core/styles";
import getThemes from "./darkMode/base";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function App() {
  const [isTokenGenerated, setJwt] = useState(false);
  const [currentUser, setUser] = useState("");
  const [currentMode, setMode] = useState('light');
  const classes = useStyles();

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
      .then(async (user) => {
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

  const handleToggle = () => {
    setMode(currentMode === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeProvider theme={getThemes(currentMode)}>
      <CssBaseline />
      <div className="App">
        <Container>
          <header className="App-header">
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
              <Button
                variant="contained"
                color="primary"
                onClick={handleToggle}
              >
                Toggle
              </Button>
            </div>
            {isTokenGenerated && (
              <div
                style={{ color: "#009688", padding: "20px", fontSize: "18px" }}
              >
                {`JWT generated for ${currentUser} and copied to clip board!`}
              </div>
            )}
          </header>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
