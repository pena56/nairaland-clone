import { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';

import './Topics.css';

import { db } from './../../firebaseConfig';

function Topics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = () => {
      db.collection('Topic')
        .get()
        .then((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTopics(data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    };

    fetchTopics();
  }, []);

  return (
    <div>
      {loading ? (
        <ReactLoading type="spin" color="#000000" />
      ) : (
        <>
          {topics.map((topic) => (
            <div key={topic.id}>
              <p>{topic.subject}</p>
              <hr />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Topics;
