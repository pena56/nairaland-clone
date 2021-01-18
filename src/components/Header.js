import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { AiOutlineMenu } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { BiUserPlus } from 'react-icons/bi';
import { FaSignInAlt } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { MdAccountBox } from 'react-icons/md';
import { GrUserSettings } from 'react-icons/gr';

import HeaderDrawer from './HeaderDrawer';

import { useAuth } from '../contexts/AuthContext';
import { useMenuToggle } from '../contexts/MenuToggleContext';

import ErrorMessage from '../utils/ErrorMessage';

import headerBg from '../img/header-bg.jpg';

import '../styles/header.css';

function Header() {
  const [dropdown, setDropdown] = useState(true);
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState('');

  const { toggleMenu } = useMenuToggle();

  const history = useHistory();

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const handleLogout = async () => {
    setError('');

    try {
      await logout();
      toggleDropdown();
      history.push('/signin');
    } catch {
      setError('Failed to Logout');
    }
  };

  return (
    <>
      <nav
        className="header"
        style={{
          backgroundImage: `url(${headerBg})`,
          backgroundColor: '#0b2412',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundBlendMode: 'overlay',
        }}
      >
        <AiOutlineMenu onClick={toggleMenu} className="header__menu" />
        <Link to="/" className="header__brand">
          Nairaland
        </Link>
        <div
          className={`header__dropdown ${dropdown && 'header__dropdown-close'}`}
        >
          {currentUser ? (
            <img
              src={currentUser.photoURL}
              alt="profile"
              className="header__profile"
              onClick={toggleDropdown}
            />
          ) : (
            <div onClick={toggleDropdown} className="header__link">
              <BiUserCircle className="header__link-icon" />
              <IoIosArrowDown />
            </div>
          )}
          <div className="header__dropdown-menu">
            {currentUser && (
              <>
                <p>My account</p>
                <Link
                  onClick={toggleDropdown}
                  to={`/user/${currentUser.displayName}`}
                >
                  <MdAccountBox />
                  Profile
                </Link>
                <Link onClick={toggleDropdown} to="/profile">
                  <GrUserSettings />
                  Account Settings
                </Link>
                <button onClick={handleLogout}>
                  <FaSignOutAlt />
                  Sign Out
                </button>
              </>
            )}

            {!currentUser && (
              <>
                <Link onClick={toggleDropdown} to="/signin">
                  <FaSignInAlt />
                  Sign In
                </Link>
                <Link onClick={toggleDropdown} to="/signup">
                  <BiUserPlus />
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      {error && <ErrorMessage message={error} />}
      <HeaderDrawer />
    </>
  );
}

export default Header;
