import { useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { MdEdit } from 'react-icons/md';
import { GrLocation } from 'react-icons/gr';
import { FiTwitter } from 'react-icons/fi';
import { CgCalendarDates } from 'react-icons/cg';

import { useAuth } from '../contexts/AuthContext';

import { db, storage, auth } from '../utils/firebaseConfig';
import Loading from '../utils/Loading';

import '../styles/profileBanner.css';

function ProfileBanner({ displayName }) {
  const { currentUser } = useAuth();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [isFollowing, setIsFollowing] = useState();

  const history = useHistory();

  useEffect(() => {
    const fetchUserProfile = async () => {
      await db
        .collection('UserProfile')
        .where('signature', '==', displayName)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.docs[0].exists) {
            const data = {
              ...querySnapshot.docs[0].data(),
              id: querySnapshot.docs[0].id,
            };
            setUser(data);
            db.collection('Following')
              .where('follower', '==', data?.id)
              .onSnapshot((snapshot) => {
                setFollowing(snapshot.docs.map((doc) => doc.data()));
              });

            // console.log(followers);
            const status = followers.find(
              (obj) => obj.follower === currentUser.email
            );
            if (status) {
              setIsFollowing(true);
            } else {
              setIsFollowing(false);
            }
            // console.log(status);
            db.collection('Following')
              .where('following', '==', data?.id)
              .onSnapshot((snapshot) => {
                setFollowers(snapshot.docs.map((doc) => doc.data()));
                // .then();
              });
            // .catch((error) => console.log(error.message));
            setLoading(false);
          } else {
            console.log('The User does not exist');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchUserProfile();
  }, [displayName, currentUser.email, followers]);

  const handleImageUpload = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (
      file.type === 'image/png' ||
      file.type === 'image/jpg' ||
      file.type === 'image/jpeg'
    ) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      fileRef
        .put(file)
        .then(() => {
          fileRef.getDownloadURL().then((url) => {
            auth.currentUser
              .updateProfile({
                photoURL: url,
              })
              .then(() => {
                db.collection('UserProfile')
                  .doc(auth.currentUser.email)
                  .update({
                    photoURL: url,
                  })
                  .then(function () {
                    console.log('Document successfully written!');
                    setLoading(false);
                    history.push(`/user/${displayName}`);
                  })
                  .catch(function (error) {
                    console.error('Error writing document: ', error);
                  });
              })
              .catch((error) => console.error(error));
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log('file is not an image');
    }
  };

  const handleCoverUpload = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (
      file.type === 'image/png' ||
      file.type === 'image/jpg' ||
      file.type === 'image/jpeg'
    ) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      fileRef
        .put(file)
        .then(() => {
          fileRef.getDownloadURL().then((url) => {
            db.collection('UserProfile')
              .doc(auth.currentUser.email)
              .update({
                coverUrl: url,
              })
              .then(function () {
                console.log('Document successfully written!');
                setLoading(false);
                history.push(`/user/${displayName}`);
              })
              .catch(function (error) {
                console.error('Error writing document: ', error);
              });
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log('file is not an image');
    }
  };

  const follow = () => {
    db.collection('Following')
      .add({
        follower: currentUser.email,
        following: user.id,
      })
      .then(() =>
        console.log(`${currentUser.email} is now following ${user.id}`)
      )
      .catch((error) => console.error(error.message));
  };

  const unFollow = () => {
    db.collection('Following')
      .where('follower', '==', currentUser.email)
      .where('following', '==', user.id)
      .get()
      .then((snapshot) => {
        snapshot.docs[0].ref
          .delete()
          .then(() => console.log('Successfully unfollowed'));
      })
      .catch((error) => {
        console.error(error.message);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="profileBanner">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="profileBanner__header">
            <img
              className="profileBanner__cover"
              src={user?.coverUrl}
              alt="cover"
            />
            <input
              onChange={handleCoverUpload}
              type="file"
              id="coverFile"
              className="inputfile"
            />
            <label htmlFor="coverFile">
              {currentUser
                ? currentUser.email === user?.id && (
                    <div className="profileCover__edit-container">
                      <MdEdit className="profile__edit-icon" />
                    </div>
                  )
                : null}
            </label>
            <div className="profileBanner__actions">
              <div className="profileBanner__image-container">
                <img
                  src={user?.photoURL}
                  alt="profile"
                  className="profileBanner__image"
                />
                <input
                  onChange={handleImageUpload}
                  type="file"
                  id="imageFile"
                  className="inputfile"
                />
                <label htmlFor="imageFile">
                  {currentUser
                    ? currentUser.email === user?.id && (
                        <div className="profileImage__edit-container">
                          <MdEdit className="profile__edit-icon" />
                        </div>
                      )
                    : null}
                </label>
              </div>
              <div className="profileBanner__links">
                {currentUser ? (
                  currentUser.email === user?.id ? (
                    <Link to="/update-profile">Update Profile</Link>
                  ) : (
                    <>
                      {isFollowing ? (
                        <button onClick={unFollow}>Unfollow</button>
                      ) : (
                        <button onClick={follow}>Follow</button>
                      )}
                    </>
                  )
                ) : null}
              </div>
            </div>
          </div>
          <div className="profileBanner__details">
            <p className="profileBanner__details-name">{user?.displayName}</p>
            <p className="profileBanner__details-signature">
              @{user?.signature}
            </p>
            <p className="profileBanner__details-bio">{user?.bio}</p>
            <div className="profileBanner__details-misc">
              <p>
                <GrLocation /> {user?.location}
              </p>
              <p>
                <FiTwitter />{' '}
                <a rel="noreferrer" target="_blank" href={user?.twitterUrl}>
                  {user?.twitterUrl}
                </a>
              </p>
              <p>
                <CgCalendarDates /> {user?.dateJoined}
              </p>
            </div>
            <div className="profileBanner__details-following">
              <p>
                <span>{following.length}</span> Following
              </p>
              <p>
                <span>{followers.length}</span> Followers
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfileBanner;
