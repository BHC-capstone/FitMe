import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import UserInfoTab from '../../components/myPage/UserInfoTab';
import StatisticsTab from '../../components/myPage/StatisticsTab';
import PaymentHistoryTab from '../../components/myPage/PaymentHistoryTab';
import TabMenu from '../../components/TabMenu';
import RequestManage from '../../components/myPage/RequestManage';
import TrainerProfile from '../../components/myPage/TrainerProfile';
// import '../../scss/tabs.scss';

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
        { elid: 2, name: '트레이너 프로필', content: <TrainerProfile /> },
        {
          elid: 3,
          name: '포인트 정산',
          content: '<PointSettlement />',
        },
        {
          elid: 4,
          name: 'PT요청 관리',
          content: <RequestManage isTrainer={user.isTrainer} />,
        },
      ]
    : [
        {
          elid: 1,
          name: '회원정보',
          content: <UserInfoTab loginedUser={user} />,
        },
        { elid: 2, name: '통계페이지', content: <StatisticsTab /> },
        { elid: 3, name: '결제내역', content: <PaymentHistoryTab /> },
        {
          elid: 4,
          name: 'PT요청 관리',
          content: <RequestManage />,
        },
      ];

  const selectMenuHandler = index => {
    clickTab(index);
  };

  return (
    <Container fluid className="panel">
      <Head1>마이페이지</Head1>
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

const Head1 = styled.div`
  color: rgb(21, 20, 20);
  font-family: 'Black Han Sans', sans-serif;
  font-size: 30px;
  display: flex;
  text-align: center;
  align-items: center;
  width: fit-content;
  margin: 0 auto;
  padding: 10px;
`;
export default Tabs;
