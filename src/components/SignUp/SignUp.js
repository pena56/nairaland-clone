import { Link, useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading';

import { useRef, useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import './SignUp.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Failed to create account');
    }

    setLoading(false);
  };

  return (
    <div className="signin">
      <h3 className="signin__header">Sign Up</h3>
      <form onSubmit={handleSubmit} className="signin__form">
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
      <div className="signin__footer">
        <p>Have an account?</p>
        <Link to="/signin">Sign In</Link>
      </div>
    </div>
  );
}

export default SignUp;
