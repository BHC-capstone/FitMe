import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import TabMenu from '../../components/myPage/TabMenu';
import UserLoginPage from './UserLoginPage';
import TrainerLoginPage from './TrainerLoginPage';

export default function LoginPage() {
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    { elid: 1, name: '수강생', content: <UserLoginPage /> },
    { elid: 2, name: '트레이너', content: <TrainerLoginPage /> },
  ];

  const selectMenuHandler = index => {
    clickTab(index);
  };

  return (
    <Container fluid className="panel">
      <div className="head">로그인</div>
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
