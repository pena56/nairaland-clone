import { useState } from 'react';

import '../styles/postBanner.css';

function PostBanner() {
  const [postActive, setPostActive] = useState(true);
  const [topicActive, setTopicActive] = useState(false);

  const toggleActive = () => {
    setPostActive((prev) => !prev);
    setTopicActive((prev) => !prev);
  };

  return (
    <div className="postBanner">
      <div className="postBanner__header">
        <p onClick={toggleActive} className={postActive && 'active__header'}>
          Posts
        </p>
        <p onClick={toggleActive} className={topicActive && 'active__header'}>
          Topics
        </p>
      </div>
    </div>
  );
}

export default PostBanner;
