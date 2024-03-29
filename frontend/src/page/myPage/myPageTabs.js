import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import UserInfoTab from '../../components/myPage/UserInfoTab';
import StatisticsTab from '../../components/myPage/StatisticsTab';
import PaymentHistoryTab from '../../components/myPage/PaymentHistoryTab';
import RequestManage from '../../components/myPage/RequestManage';
import TrainerProfile from '../../components/myPage/TrainerProfile';
import TabMenu from '../../components/myPage/TabMenu';

function Tabs() {
  const user = useSelector(state => state.user);

  const [currentTab, clickTab] = useState(0);
  const menuArr = user.isTrainer
    ? [
        {
          elid: 1,
          name: '회원정보',
          content: <UserInfoTab loginedUser={user} />,
        },
        { elid: 2, name: '프로필', content: <TrainerProfile /> },
        {
          elid: 3,
          name: 'PT요청',
          content: <RequestManage isTrainer={user.isTrainer} />,
        },
      ]
    : [
        {
          elid: 1,
          name: '회원정보',
          content: <UserInfoTab loginedUser={user} />,
        },
        { elid: 2, name: '통계', content: <StatisticsTab /> },
        { elid: 3, name: '결제내역', content: <PaymentHistoryTab /> },
        {
          elid: 4,
          name: 'PT요청',
          content: <RequestManage />,
        },
      ];

  const selectMenuHandler = index => {
    clickTab(index);
  };

  return (
    <Container fluid className="panel">
      <div className="head">마이 페이지</div>
      <TabMenu
        menuArr={menuArr}
        currentTab={currentTab}
        selectMenuHandler={selectMenuHandler}
      >
        {menuArr.map((el, index) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <li
            key={el.elid}
            className={index === currentTab ? 'submenu focused' : 'submenu'}
            onClick={() => selectMenuHandler(index)}
            onKeyDown={() => selectMenuHandler(index)}
          >
            {el.name}
          </li>
        ))}
      </TabMenu>
    </Container>
  );
}

export default Tabs;
