import './Header.css';
import HeaderDrawer from './HeaderDrawer';
import headerBg from '../../img/header-bg.jpg';

import { AiOutlineMenu } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { useMenuToggle } from '../../contexts/MenuToggleContext';

function Header() {
  const { currentUser } = useAuth();
  const { toggleMenu } = useMenuToggle();

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
        {currentUser ? (
          <img
            src={currentUser.photoURL}
            alt="profile"
            className="header__profile"
          />
        ) : (
          <Link className="header__link" to="/signin">
            <BiUserCircle className="header__link-icon" />
            login
          </Link>
        )}
      </nav>
      <HeaderDrawer />
    </>
  );
}

export default Header;
