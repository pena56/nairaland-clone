import { useState } from 'react';

import { AiOutlineLeft } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { Link, useHistory } from 'react-router-dom';

import drawerBg from '../../img/drawer-bg.jpg';
import { useAuth } from '../../contexts/AuthContext';
import { useMenuToggle } from '../../contexts/MenuToggleContext';

function HeaderDrawer() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState('');

  const { menuState, toggleMenu } = useMenuToggle();

  const history = useHistory();

  const handleLogout = async () => {
    setError('');

    try {
      await logout();
      toggleMenu();
      history.push('/signin');
    } catch {
      setError('Failed to Logout');
    }
  };

  return (
    <div className={`drawer__container ${menuState ? 'show' : 'notShow'}`}>
      <div
        className={`drawer ${menuState ? 'show' : 'notShow'}`}
        style={{
          backgroundImage: `url(${drawerBg})`,
          backgroundColor: '#0b2412',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundBlendMode: 'overlay',
        }}
      >
        {currentUser ? (
          <img
            src={currentUser.photoURL}
            alt="profile"
            className="header__profile"
          />
        ) : (
          <Link className="drawer__header" to="/signin">
            <BiUserCircle className="drawer__header-icon" />
            Login
          </Link>
        )}

        <div className="drawer__links">
          <Link to="/">Activity</Link>
          <Link to="/">Forums</Link>
          <Link to="/">Naija Dictionary</Link>
          <Link to="/">Ads</Link>
          <Link to="/">Rules & Regulations</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Help</Link>
        </div>
        {currentUser ? (
          <Link onClick={handleLogout} className="drawer__link-signout">
            Sign Out
          </Link>
        ) : (
          <Link className="drawer__link-signup">Sign Up</Link>
        )}
        <div onClick={toggleMenu} className="drawer__close">
          <AiOutlineLeft className="drawer__close-icon" />
        </div>
      </div>
    </div>
  );
}

export default HeaderDrawer;
