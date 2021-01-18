import ReactLoading from 'react-loading';

import '../styles/loading.css';

function Loading() {
  return (
    <div className="loading">
      <ReactLoading type="spinningBubbles" />
      <p>Loading...</p>
    </div>
  );
}

export default Loading;
