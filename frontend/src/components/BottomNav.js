import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../scss/bottomNav.scss';
import './fontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

function BottomNav() {
  const user = useSelector(state => state.user);
  const [homeUrl = '/login', setHomeUrl] = React.useState();
  const [calendarUrl = '/login', setCalendarUrl] = React.useState();
  const [penUrl = '/login', setPenUrl] = React.useState();
  const [mypageUrl = '/login', setMypageUrl] = React.useState();

  useEffect(() => {
    if (user.isLogin === false) setHomeUrl('/login');

    if (user.isTrainer === true) {
      setHomeUrl('/customer-list');
      setCalendarUrl('/ptrequest');
      setPenUrl('/ptrequest');
      setMypageUrl('/mypage');
    } else {
      setHomeUrl('/trainer-list');
      setCalendarUrl('/calendar ');
      setPenUrl('/customer-list');
      setMypageUrl('/mypage');
    }
  }, [user]);

  return (
    <div>
      <nav className="wrapper">
        <div>
          <Link to={homeUrl} className="nav-link">
            <FontAwesomeIcon icon="home" />
          </Link>
        </div>
        <div>
          <Link to={calendarUrl} className="nav-link">
            <FontAwesomeIcon icon="calendar" />
          </Link>
        </div>
        <div>
          <Link className="nav-link">
            <FontAwesomeIcon icon="pen-to-square" />
          </Link>
        </div>
        <div>
          <Link to={mypageUrl} className="nav-link">
            <FontAwesomeIcon icon="user" />
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default BottomNav;
