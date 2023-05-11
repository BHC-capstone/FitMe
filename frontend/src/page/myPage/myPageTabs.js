import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import UserInfoTab from '../../components/myPage/UserInfoTab';
import StatisticsTab from '../../components/myPage/StatisticsTab';
import PaymentHistoryTab from '../../components/myPage/PaymentHistoryTab';
import TabMenu from '../../components/TabMenu';
import RequestManage from '../../components/myPage/RequestManage';
import '../../scss/tabs.scss';

function Tabs() {
  const user = useSelector(state => state.user);

  const [activeTab, setActiveTab] = useState(1);
  const [currentTab, clickTab] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const menuArr = [
    { name: '회원정보', content: <UserInfoTab loginedUser={user} /> },
    { name: '통계페이지', content: <StatisticsTab /> },
    { name: '결제내역', content: <PaymentHistoryTab /> },
    { name: 'PT요청 관리', content: <RequestManage /> },
  ];
  const selectMenuHandler = index => {
    clickTab(index);
  };

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
      <TabMenu
        menuArr={menuArr}
        currentTab={currentTab}
        selectMenuHandler={selectMenuHandler}
      >
        {menuArr.map((el, index) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <li
            className={index === currentTab ? 'submenu focused' : 'submenu'}
            onClick={() => selectMenuHandler(index)}
            onKeyDown={() => selectMenuHandler(index)}
          >
            {el.name}
          </li>
        ))}
      </TabMenu>
    </div>
  );
}
export default Tabs;
