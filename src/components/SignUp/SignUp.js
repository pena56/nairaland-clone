import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import ReactLoading from 'react-loading';

import './SignUp.css';

import { auth, db } from './../../firebaseConfig';
import { useStateValue } from './../../StateProvider';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [{ user }, dispatch] = useStateValue();

  const signUpUser = (e) => {
    setLoading((prev) => !prev);
    if (email === '' || password === '') {
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((ref) => {
        console.log('User created Successfully:', ref.user.uid);
        db.collection('UserProfile')
          .doc(ref.user.email)
          .set({
            bio: '',
            birthday: '',
            location: '',
            picture: `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}/o/face-5453349_1280.png?alt=media&token=fa045ea8-2e8a-432b-a438-74b8f2a198d0`,
            signature: '',
            twitter: '',
            userEmail: ref.user.email,
          })
          .then(() => {
            console.log('Document created');

            dispatch({
              type: 'SET_USER',
              payload: {
                bio: '',
                birthday: '',
                location: '',
                picture: `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}/o/face-5453349_1280.png?alt=media&token=fa045ea8-2e8a-432b-a438-74b8f2a198d0`,
                signature: '',
                twitter: '',
                userEmail: ref.user.email,
              },
            });

            localStorage.setItem(
              'user',
              JSON.stringify({
                bio: '',
                birthday: '',
                location: '',
                picture: `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}/o/face-5453349_1280.png?alt=media&token=fa045ea8-2e8a-432b-a438-74b8f2a198d0`,
                signature: '',
                twitter: '',
                userEmail: ref.user.email,
              })
            );
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage(error.message);
          setEmail('');
        }
        setLoading((prev) => !prev);
      });

    // setEmail('');
    // setPassword('');
    e.preventDefault();
  };

  return (
    <>
      {user ? (
        <Redirect to="/" />
      ) : (
        <div>
          <h3>Signup Page</h3>
          <form onSubmit={signUpUser}>
            <div>
              <label>email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
              <button type="submit">Sign Up</button>
            )}
          </form>
        </div>
      )}
    </>
  );
}

export default SignUp;
