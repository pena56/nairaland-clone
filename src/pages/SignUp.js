import { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading';

import { useAuth } from '../contexts/AuthContext';

import ErrorMessage from '../utils/ErrorMessage';

import '../styles/authForm.css';

function SignUp() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { signup } = useAuth();

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push('/update-profile');
    } catch {
      setError('Failed to create account, try again');
    }

    setLoading(false);
  };

  return (
    <div className="authForm">
      <h3 className="authForm__header">Sign Up</h3>
      <form onSubmit={handleSubmit} className="authForm__body">
        {error && <ErrorMessage message={error} />}
        <input ref={emailRef} type="email" placeholder="Email" required />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          required
        />
        <input
          ref={passwordConfirmRef}
          type="password"
          placeholder="Confirm Password"
          required
        />
        <button disabled={loading} type="submit">
          {loading ? (
            <ReactLoading type="bubbles" height="30px" width="30px" />
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
      <div className="authForm__footer">
        <p>Have an account?</p>
        <Link to="/signin">Sign In</Link>
      </div>
    </div>
  );
}

export default SignUp;
