import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
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
    <Container fluid className="panel">
      <div className="tabs-container container">
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
    </Container>
  );
}
export default Tabs;
