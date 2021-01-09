import { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';

import { useStateValue } from './StateProvider';

import { auth } from './firebaseConfig';

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const persistedUser = localStorage.getItem('user');
    if (persistedUser) {
      const foundUser = JSON.parse(persistedUser);
      console.log(foundUser);
      dispatch({
        type: 'SET_USER',
        payload: foundUser,
      });
    }
  }, []);

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log('Successfully logout');
      })
      .catch((err) => {
        console.error(err);
      });
    dispatch({
      type: 'REMOVE_USER',
    });
    localStorage.removeItem('user');
  };
  // const fetchForum = async () => {
  //   db.collection('Forums')
  //     .get()
  //     .then((snapshot) => {
  //       snapshot.forEach((doc) => {
  //         console.log(doc.data());
  //       });
  //     })
  //     .catch((err) => console.error(err));
  // };

  // fetchForum();
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <div>
              <h1>Home Page</h1>
              {user && (
                <>
                  <h3>Welcome {user.userEmail}</h3>
                  <img
                    style={{ width: '50px', height: '50px' }}
                    src={user.picture}
                    alt="profile"
                  />
                  <button onClick={signOut}>Sign out</button>
                </>
              )}
            </div>
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
