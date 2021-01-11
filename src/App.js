import { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Home from './components/Home/Home';
import NewTopic from './components/NewTopic/NewTopic';

import { useStateValue } from './StateProvider';

function App() {
  const [, dispatch] = useStateValue();

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
            <Home />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/new">
            <NewTopic />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
