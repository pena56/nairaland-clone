import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const myApp = firebase.initializeApp(firebaseConfig);

export const db = myApp.firestore();

// export const uploadForum = (forum) => {
//   forum.map((subforum) => {
//     db.collection('Forums')
//       .add(subforum)
//       .then((ref) => {
//         console.log('Successfully added todo with id :', ref.id);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   });
// };
