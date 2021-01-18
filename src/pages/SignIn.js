import { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading';

import { useAuth } from '../contexts/AuthContext';

import ErrorMessage from '../utils/ErrorMessage';

import '../styles/authForm.css';

function SignIn() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const { signin } = useAuth();

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await signin(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Failed to Login, Check your Credentials and try again');
    }

    setLoading(false);
  };

  return (
    <div className="authForm">
      <h3 className="authForm__header">Sign In</h3>
      <form onSubmit={handleSubmit} className="authForm__body">
        {error && <ErrorMessage message={error} />}
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <Link to="/forgot-password">Forgot password?</Link>
        <button disabled={loading} type="submit">
          {loading ? (
            <ReactLoading type="bubbles" height="30px" width="30px" />
          ) : (
            'Sign In'
          )}
        </button>
      </form>
      <div className="authForm__footer">
        <p>Don't have an account?</p>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

export default SignIn;
