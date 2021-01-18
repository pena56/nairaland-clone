import { Link } from 'react-router-dom';

import { useRef, useState } from 'react';

import { useAuth } from '../contexts/AuthContext';

import ErrorMessage from '../utils/ErrorMessage';

import '../styles/authForm.css';

function ForgotPassword() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const emailRef = useRef();

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
    <div className="authForm">
      <h3 className="authForm__header">Reset Password</h3>
      <form className="authForm__body" onSubmit={handleSubmit}>
        {error && <ErrorMessage message={error} />}
        {message && <p>{message}</p>}
        <input ref={emailRef} type="email" placeholder="Email" />
        <button disabled={loading} type="submit">
          Reset Password
        </button>
      </form>
      <div className="authForm__footer">
        <Link to="/signin">Sign In</Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
