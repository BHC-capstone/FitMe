import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Calendar from 'react-calendar';
import '../../scss/calendar.scss';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import UserStatics from '../../components/master/UserStatics';
import TrainerStatics from '../../components/master/TrainerStatics';
import PtStatics from '../../components/master/PtStatics';

function MasterStatics() {
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    {
      name: '유저',
      content: <UserStatics />,
    }, // dateinfo 정보를 통해 axios로 해당 날짜의 식단 데이터 넣으면 완료
    {
      name: '트레이너',
      content: <TrainerStatics />,
    }, // dateinfo 정보를 통해 axios로 해당 날짜의 운동 루틴 데이터 넣으면 완료
    {
      name: 'pt 회원수',
      content: <PtStatics />,
    }, // dateinfo 정보를 통해 axios로 해당 날짜의 피드백 데이터 넣으면 완료
  ];
  const selectMenuHandler = index => {
    clickTab(index);
  };
  return (
    <div>
      <TabMenu>
        {menuArr.map((el, index) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <li
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={index === currentTab ? 'submenu focused' : 'submenu'}
            onClick={() => selectMenuHandler(index)}
            onKeyDown={() => selectMenuHandler(index)}
          >
            {el.name}
          </li>
        ))}
      </TabMenu>
      <Desc>
        <div className="head mgbt0">{menuArr[currentTab].name}</div>
        <div className="mgauto">{menuArr[currentTab].content}</div>
      </Desc>
    </div>
  );
}

const TabMenu = styled.ul`
  background-color: #ffffff;
  color: rgb(21, 20, 20);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  margin-bottom: 30px;
  margin-top: 10px;
  border-bottom: solid 1px;
  border-bottom-color: #d1d1d1;

  .submenu {
    display: flex;
    justify-content: space-around;
    width: 390px;
    height: 40px; */
    width: calc(50% / 3);
    padding: 10px;
    font-size: 15px;
    transition: 0.5s;
    border-radius: 10px 10px 0px 0px;
  }

  .focused {
    color: #fff;
    background-color: #f5a302;
  }

  & div.desc {
    text-align: center;
  }
`;

const Desc = styled.div`
  margin: auto 0;
  text-align: center;
`;
export default MasterStatics;
