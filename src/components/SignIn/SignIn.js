import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import ReactLoading from 'react-loading';

import './SignIn.css';

import { auth, db } from './../../firebaseConfig';

import { useStateValue } from './../../StateProvider';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [{ user }, dispatch] = useStateValue();

  const signInUser = (e) => {
    e.preventDefault();
    setLoading((prev) => !prev);
    if (email === '' || password === '') {
      return;
    }
    auth
      .signInWithEmailAndPassword(email, password)
      .then((ref) => {
        db.collection('UserProfile')
          .doc(ref.user.email)
          .get()
          .then((doc) => {
            if (doc.exists) {
              dispatch({
                type: 'SET_USER',
                payload: doc.data(),
              });
              localStorage.setItem('user', JSON.stringify(doc.data()));
              console.log('Document data', doc.data());
            } else {
              console.log('No such document');
            }
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/wrong-password') {
          setLoading((prev) => !prev);
          setErrorMessage(error.message);
          setPassword('');
        } else if (errorCode === 'auth/user-not-found') {
          setLoading((prev) => !prev);
          setErrorMessage(error.message);
          setPassword('');
          setEmail('');
        }
      });
  };

  return (
    <>
      {user ? (
        <Redirect to="/" />
      ) : (
        <div>
          <h3>Sign in </h3>
          <form onSubmit={signInUser}>
            <div>
              <label>email</label>
              <input
                id="email"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>password</label>
              <input
                id="password"
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMessage && (
              <small style={{ color: 'red' }}>{errorMessage}</small>
            )}
            {loading ? (
              <ReactLoading
                type="spin"
                color="#000000"
                height="25px"
                width="25px"
              />
            ) : (
              <button type="submit">Sign in</button>
            )}
          </form>
        </div>
      )}
    </>
  );
}

export default SignIn;
