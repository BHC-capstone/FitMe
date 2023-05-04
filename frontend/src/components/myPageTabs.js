import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import UserInfoTab from '../Page/myPage/UserInfoTab';
import StatisticsTab from '../Page/myPage/StatisticsTab';
import PaymentHistoryTab from '../Page/myPage/PaymentHistoryTab';
import '../scss/tabs.scss';
import BottomNav from './BottomNav';

function Tabs() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const tab = parseInt(location.pathname.split('/').pop(), 10);
    if (!isNaN(tab) && tab >= 1 && tab <= 3) {
      setActiveTab(tab);
    }
  }, [location.pathname]);

  const handleTabChange = tabIndex => {
    setActiveTab(tabIndex);
    navigate(`/mypage/${tabIndex}`);
  };

  return (
    <div className="tabs-container container">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <div
            className={`nav-link ${activeTab === 1 ? 'active' : ''}`}
            onClick={() => handleTabChange(1)}
            role="button"
            aria-hidden="true"
          >
            회원정보
          </div>
        </li>
        <li className="nav-item">
          <div
            className={`nav-link ${activeTab === 2 ? 'active' : ''}`}
            onClick={() => handleTabChange(2)}
            role="button"
            aria-hidden="true"
          >
            통계페이지
          </div>
        </li>
        <li className="nav-item">
          <div
            className={`nav-link ${activeTab === 3 ? 'active' : ''}`}
            onClick={() => handleTabChange(3)}
            role="button"
            aria-hidden="true"
          >
            결제내역
          </div>
        </li>
      </ul>
      <div className="tab-content">
        {activeTab === 1 && <UserInfoTab loginedUser={user} />}
        {activeTab === 2 && <StatisticsTab />}
        {activeTab === 3 && <PaymentHistoryTab />}
      </div>
    </div>
  );
}

export default Tabs;
