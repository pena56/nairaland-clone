import { useContext, useState, useEffect, createContext } from 'react';

import { auth, db } from '../utils/firebaseConfig';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        if (auth.currentUser) {
          auth.currentUser
            .updateProfile({
              displayName: auth.currentUser.email.split('@')[0],
              photoURL: `https://firebasestorage.googleapis.com/v0/b/nairaland-80bbb.appspot.com/o/face-5453349_1280.png?alt=media`,
            })
            .then((user) => {
              db.collection('UserProfile')
                .doc(auth.currentUser.email)
                .set({
                  displayName: '',
                  signature: auth.currentUser.displayName,
                  photoURL: auth.currentUser.photoURL,
                  bio: '',
                  location: '',
                  dateJoined: auth.currentUser.metadata.creationTime,
                  coverUrl:
                    'https://firebasestorage.googleapis.com/v0/b/nairaland-80bbb.appspot.com/o/1.jpg?alt=media',
                  twitterUrl: 'https://twitter.com/',
                })
                .then(function () {
                  console.log('Document successfully written!');
                })
                .catch(function (error) {
                  console.error('Error writing document: ', error);
                });
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signin = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user);
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  const value = {
    currentUser,
    signup,
    signin,
    logout,
    resetPassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
