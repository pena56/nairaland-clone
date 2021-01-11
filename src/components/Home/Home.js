import { Link } from 'react-router-dom';

import './Home.css';

import { useStateValue } from './../../StateProvider';

import { auth } from './../../firebaseConfig';

import Topics from './../Topics/Topics';

function Home() {
  const [{ user }, dispatch] = useStateValue();

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

  return (
    <div>
      <h1>Nairaland</h1>
      {user ? (
        <>
          <h3>Welcome {user.userEmail}</h3>
          <img
            style={{ width: '50px', height: '50px' }}
            src={user.picture}
            alt="profile"
          />
          <button onClick={signOut}>Sign out</button>
          <Link to="/new">New Topic</Link>
        </>
      ) : (
        <>
          <Link to="/signin">Sign in</Link>
          <Link to="/signup">Sign up</Link>
        </>
      )}
      <hr />
      <Topics />
    </div>
  );
}

export default Home;
