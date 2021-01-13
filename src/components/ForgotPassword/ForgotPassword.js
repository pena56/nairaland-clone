import { Link } from 'react-router-dom';

import { useRef, useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';

function ForgotPassword() {
  const emailRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for instructions');
    } catch {
      setError('Failed to Reset Password');
    }

    setLoading(false);
  };

  return (
    <div className="signin">
      <h3 className="signin__header">Reset Password</h3>
      <form className="signin__form" onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
        <input ref={emailRef} type="email" placeholder="Email" />
        <button disabled={loading} type="submit">
          Reset Password
        </button>
      </form>
      <div className="signin__footer">
        <Link to="/signin">Sign In</Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
