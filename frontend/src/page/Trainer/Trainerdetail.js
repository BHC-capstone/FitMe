/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';
import Starpoint from '../../components/Starpoint';

function Trainerdetail() {
  const { id } = useParams();
  const [trainer, setTrainer] = useState({});
  const [currentTab, clickTab] = useState(0);
  const [star, setStar] = useState(1);
  const menuArr = [
    { name: '자기 소개', content: `${trainer.introduction}` },
    { name: '프로필', content: 'Tab menu TWO' },
    { name: '리뷰', content: 'Tab menu THREE' },
  ];
  const navigate = useNavigate();

  const navigateToRequest = () => {
    navigate('/ptrequest');
  };
  useEffect(() => {
    axios.get(`https://localhost:4000/trainers/profile/${id}`).then(res => {
      console.log(res.data.data);
      setTrainer(res.data.data);
    });
    setStar(3.5);
  }, []);

  const selectMenuHandler = index => {
    // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
    // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
    clickTab(index);
  };
  return (
    <Container fluid className="panel">
      <Upbox>
        <div>
          <Imageposition>이미지</Imageposition>
        </div>
        <div>
          <Nameblock className="a">김석봉{trainer.name}</Nameblock>
          {/* <Nameblock>별점</Nameblock> */}
          <Starpoint starpoint={star} />
          <Nameblock className="b">
            {trainer.gender}남 {trainer.age}38세
          </Nameblock>
        </div>
        <div>
          <Emailblock>E-mail : {trainer.email}</Emailblock>
          <Emailblock>PhoneNumber : {trainer.phonenumber}</Emailblock>
        </div>
        <div>
          <Button1 variant="secondary" size="large" onClick={navigateToRequest}>
            PT 신청
          </Button1>
        </div>
      </Upbox>
      <TabMenu>
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
      <Desc>
        <p>{menuArr[currentTab].content}</p>
      </Desc>
      <div />
    </Container>
  );
}

const Upbox = styled.ul`
  display: flex;
  flex-wrap: wrap;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  background-color: #adb5bd;
  color: rgb(255, 255, 255);
  height: 500px;
`;
// const Box1 = styled.div`
//   background-color: #444444;
//   height: 300px;
// `;
// const Box2 = styled.div`
//   background-color: #555555;
//   height: 100px;
// `;
const Imageposition = styled.div`
  width: 230px;
  height: 300px;
  border-radius: 15px;
  padding-top: calc(100% / 20);
  padding-bottom: calc(100% / 20);
  margin-top: 20px;
  // margin: auto;
  background-color: #ffffff;
`;

const Nameblock = styled.text`
  letter-spacing: 5px;
  word-spacing: 20px;
  color: black;
  display: flex;
  flex-direction: column;
  padding-left: 50px;
  padding-top: calc(100% / 20);

  &.a {
    margin-top: 100px;
    letter-spacing: 8px;
    font-size: 36px;
    font-weight: bold;
  }
  &.b {
    padding-top: calc(100% / 40);
    font-size: 15px;
    font-weight: normal;
    // float: left;
  }
`;
const Emailblock = styled.text`
  letter-spacing: 5px;
  font-weight: lighter;
  color: black;
  display: flex;
  width: fit-content;
`;
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
    justify-content: space-between;
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
    background-color: #2ba5f7;
  }

  & div.desc {
    text-align: center;
  }
`;

const Desc = styled.div`
  text-align: center;
`;

const Button1 = styled(Button)`
  float: right;
  margin-left: 100px;
  margin-top: 70px;
  // vertical-align: top;
  //border: 3px solid white;
`;
export default Trainerdetail;
