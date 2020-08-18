import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import firebaseAuth from './firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function App() {

  const [isTokenGenerated, setJwt] = useState(false);
  const [currentUser, setUser] = useState('');
  const classes = useStyles();

  const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  const onAuthClick = (userName) => {
    firebaseAuth.signInWithEmailAndPassword(`${userName}@example.com`,'secretPassword').then(async (user) => {
      const token = await firebaseAuth.currentUser.getIdToken();
      copyToClipboard(token);
      setJwt(true);
      setUser(userName === 'user' ? 'Admin' : 'User');
      setTimeout(() => {
        setJwt(false)
      }, 5000);
    }).catch((e) => {
      console.log("Auth Failed", e)
    });
  }

  // const createUser = () => {
  //   firebaseAuth.createUserWithEmailAndPassword('user1@example.com', 'secretPassword').catch((error) => {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;

  //     console.log("Auth Failed", errorCode, errorMessage)
  //     // ...
  //   });
  // }

  return (
    <div className="App">
      <header className="App-header"> 
      <div className={classes.root}>
        <Button variant="contained" color="secondary" onClick={() => {onAuthClick('user')}}>
          Admin
        </Button>
        <Button variant="contained" onClick={() => {onAuthClick('user1')}}>
          User
        </Button>
      </div>
        {isTokenGenerated && 
          <div style={{color: '#009688', padding: '20px', fontSize: '18px'}}>
            {`JWT generated for ${currentUser} and copied to clip board!`}
          </div>
        }
      </header>
    </div>
  );
}

export default App;
