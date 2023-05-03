import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/bottomNav.scss';
import './fontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function BottomNav() {
  return (
    <div>
      <nav className="wrapper">
        <div>
          <Link to="/trainer-list" className="nav-link">
            <FontAwesomeIcon icon="home" />
          </Link>
        </div>
        <div>
          <Link to="/login" className="nav-link">
            <FontAwesomeIcon icon="calendar" />
          </Link>
        </div>
        <div>
          <Link to="/ptrequest" className="nav-link">
            <FontAwesomeIcon icon="pen-to-square" />
          </Link>
        </div>
        <div>
          <Link to="/mypage" className="nav-link">
            <FontAwesomeIcon icon="user" />
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default BottomNav;
