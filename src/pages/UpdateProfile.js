import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading';

import { useAuth } from '../contexts/AuthContext';

import ErrorMessage from '../utils/ErrorMessage';
import { db } from '../utils/firebaseConfig';

import '../styles/authForm.css';

function UpdateProfile() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');

  const { currentUser } = useAuth();

  const history = useHistory();

  useEffect(() => {
    const fetchUserProfile = async () => {
      await db
        .collection('UserProfile')
        .doc(currentUser.email)
        .get()
        .then((querySnapshot) => {
          setBio(querySnapshot.data().bio);
          setLocation(querySnapshot.data().location);
          setDisplayName(querySnapshot.data().displayName);
          setTwitterUrl(querySnapshot.data().twitterUrl);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchUserProfile();
  }, [currentUser.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    db.collection('UserProfile')
      .doc(currentUser.email)
      .update({
        bio: bio,
        location: location,
        displayName: displayName,
        twitterUrl: twitterUrl,
      })
      .then(() => {
        console.log('User profile updated successfully');
        history.push(`/user/${currentUser.displayName}`);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  return (
    <div className="authForm">
      <h3 className="authForm__header">Update Profile</h3>
      <form onSubmit={handleSubmit} className="authForm__body">
        {error && <ErrorMessage message={error} />}
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.currentTarget.value)}
          type="text"
          placeholder="Display Name"
        />
        <input
          value={bio}
          onChange={(e) => setBio(e.currentTarget.value)}
          type="text"
          placeholder="Bio"
        />
        <input
          value={twitterUrl}
          onChange={(e) => setTwitterUrl(e.currentTarget.value)}
          type="url"
          placeholder="Twitter Url"
        />
        <input
          value={location}
          onChange={(e) => setLocation(e.currentTarget.value)}
          type="text"
          placeholder="Location"
        />
        <button disabled={loading} type="submit">
          {loading ? (
            <ReactLoading type="bubbles" height="30px" width="30px" />
          ) : (
            'Update Profile'
          )}
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;
