import React, {useState} from 'react';
import './App.css';
import firebaseAuth from './firebase';

function App() {

  const [isTokenGenerated, setJwt] = useState(false);

  const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  const onAuthClick = () => {
    firebaseAuth.signInWithEmailAndPassword('user@example.com','secretPassword').then(async (user) => {
      const token = await firebaseAuth.currentUser.getIdToken();
      copyToClipboard(token);
      setJwt(true);
    }).catch((e) => {
      console.log("Auth Failed", e)
    });
  }

  return (
    <div className="App">
      <header className="App-header"> 
        <div onClick={onAuthClick} style={{cursor: 'pointer'}}>Authenticate</div>
        {isTokenGenerated && <div style={{color: '#009688', padding: '20px', fontSize: '18px'}}>JWT generated and copied to clip board!</div>}
      </header>
    </div>
  );
}

export default App;
