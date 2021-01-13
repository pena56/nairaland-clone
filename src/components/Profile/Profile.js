import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

function Profile() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();

  const history = useHistory();

  const handleLogout = async () => {
    setError('');

    try {
      await logout();
      history.push('/signin');
    } catch {
      setError('Failed to Logout');
    }
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <h1>Profile Page</h1>
      {currentUser ? (
        <>
          {error && <p>{error}</p>}
          <p>Welcome {currentUser.displayName}</p>
          <button onClick={handleLogout}>Log Out</button>
          <Link to="/update-profile">Update Profile</Link>
        </>
      ) : (
        <p>You are not signed in</p>
      )}
    </div>
  );
}

export default Profile;
