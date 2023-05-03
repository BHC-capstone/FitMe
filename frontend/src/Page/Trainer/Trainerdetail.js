/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import styled from 'styled-components';

function Trainerdetail() {
  const { id } = useParams();
  const location = useLocation();
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    { name: 'Tab1', content: 'Tab menu ONE' },
    { name: 'Tab2', content: 'Tab menu TWO' },
    { name: 'Tab3', content: 'Tab menu THREE' },
  ];

  const selectMenuHandler = index => {
    // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
    // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
    clickTab(index);
  };
  return (
    <>
      <Upbox>
        <ul>
          <li>dlfm : {location.hash}</li>
          <li>pathname : {location.pathname}</li>
          <li>search : {location.search}</li>
          <li>state : {location.state}</li>
          <li>key : {location.key}</li>
        </ul>
      </Upbox>
      <TabMenu>
        {menuArr.map((el, index) => (
          <li
            className={index === currentTab ? 'submenu focused' : 'submenu'}
            onClick={() => selectMenuHandler(index)}
            onKeyDown={() => selectMenuHandler(index)}
          >
            {el.name}
          </li>
        ))}
      </TabMenu>
      <Desc>
        <p>{menuArr[currentTab].content}</p>
      </Desc>
      <div />
    </>
  );
}
const Upbox = styled.ul`
  background-color: #111654;
  color: rgb(255, 255, 255);
  height: 300px;
`;
const TabMenu = styled.ul`
  background-color: #ffffff;
  color: rgb(21, 20, 20);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  margin-bottom: 7rem;
  margin-top: 10px;
  border-bottom: solid 1px;
  border-bottom-color: #d1d1d1;

  .submenu {
    // 湲곕낯 Tabmenu �� ���� CSS瑜� 援ы쁽
    display: flex;
    /* justify-content: space-between;
    width: 380px;
    heigth: 30px; */
    width: calc(100% / 3);
    padding: 10px;
    font-size: 15px;
    transition: 0.5s;
    border-radius: 10px 10px 0px 0px;
  }

  .focused {
    //�좏깮�� Tabmenu �먮쭔 �곸슜�섎뒗 CSS瑜� 援ы쁽
    border-bottom: solid 3px;
  }

  & div.desc {
    text-align: center;
  }
`;

const Desc = styled.div`
  text-align: center;
`;
export default Trainerdetail;
