// src/components/NavBar/NavBar.jsx
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import './NavBar.css';
import { AuthedUserContext } from '../../App';
import logo from '../../assets/Moment-Map-Icon-inverse.png';

const NavBar = ({ handleSignout, openSigninModal, openSignupModal }) => {
  const user = useContext(AuthedUserContext);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Moment Map Logo" />
        <Link to="/" className="navbar-brand">Moment Map</Link>
      </div>
      <ul className="navbar-links">
        {user && (
          <>
          <li>
            <Link to="/moments">Moments</Link>
          </li>
          <li>
            <Link to="/calendar">Calendar</Link>
          </li>
          <li className="navbar-user">Welcome, {user.username}</li>
          <li>
            <Link to="/" onClick={handleSignout} className="navbar-signout">
              Sign out
            </Link>
          </li>
        </>
        )}
        {!user && (
          <>
            <li>
              <span onClick={openSigninModal}>Sign In</span>
            </li>
            <li>
              <span onClick={openSignupModal}>Sign Up</span>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;