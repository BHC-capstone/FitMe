/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';
import Starpoint from '../../components/Starpoint';
import TrainerProfile from '../../components/myPage/TrainerProfile';

function Trainerdetail() {
  const { id } = useParams();
  const [trainer, setTrainer] = useState({});
  const [currentTab, clickTab] = useState(0);
  const [star, setStar] = useState(1);
  const menuArr = [
    { name: '자기 소개', content: `${trainer.introduction}` },
    { name: '프로필', content: <TrainerProfile /> },
    { name: '리뷰', content: '리뷰 기능 Loading...' },
  ];
  const navigate = useNavigate();

  const navigateToRequest = () => {
    navigate(`/ptrequest/${id}`);
  };
  useEffect(() => {
    axios
      .get(`/trainers/profile/${id}`, {
        withCredentials: true,
      })
      .then(res => {
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
      <Head1>트레이너 소개</Head1>
      <Upbox>
        <Imageposition>이미지</Imageposition>
        <Box1>
          <Nameblock className="a">{trainer.name}</Nameblock>
          {/* <Nameblock>별점</Nameblock> */}
          <Starpoint starpoint={star} />
          <Nameblock className="b">
            {trainer.gender} {trainer.age}세
          </Nameblock>
        </Box1>
        <Box2>
          <Emailblock>
            <span className="b">E-mail :</span>
            {trainer.email}
          </Emailblock>
          <Emailblock>
            <span className="b">H.P :</span>
            {trainer.phonenumber}
          </Emailblock>
          <Button1 variant="secondary" onClick={navigateToRequest}>
            PT 신청
          </Button1>
        </Box2>
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
  // justify-content: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  background-color: #2ba5f7;
  color: rgb(255, 255, 255);
  height: 500px;
  margin-bottom: 30px;
`;
const Box1 = styled.div`
  float: right;
  margin-top: calc(100% / 6);
  margin-left: calc(100% / 20);
  background-color: transparent;
  height: fit-content;
  // padding: 5px;
  // border-radius: 40px;
  // border-radius: 0px 35% 35% 0px;
`;
const Box2 = styled.div`
  background-color: white;
  align-items: center;
  justify-content: center;
  width: 120%;
  height: fit-content;
  // border-radius: 30px;
  padding: 10% 5% 5% 5%;
  margin-left: -32px;
  border-bottom: 6px solid #f5a302;
`;
const Imageposition = styled.div`
  // float: left;
  width: 230px;
  height: 230px;
  border-radius: 50%;
  border: 2px solid #2ba5f7;
  // padding-top: calc(100% / 20);
  // padding-bottom: calc(100% / 20);
  margin-top: calc(100% / 15);
  margin-left: -14px;
  background-color: white;
`;

const Nameblock = styled.text`
  display: flex;
  flex-direction: column;
  letter-spacing: 3px;
  word-spacing: 20px;
  color: white;
  padding: calc(100% / 50);
  // padding-top: calc(100% / 20);
  &.a {
    font-family: 'Black Han Sans', sans-serif;
    letter-spacing: 8px;
    font-size: 36px;
    border-bottom: 2px solid white;
    // font-weight: bold;
  }
  &.b {
    padding-top: calc(100% / 40);
    font-size: 15px;
    font-weight: normal;
    font-family: 'Gowun Dodum', sans-serif;
    // float: left;
  }
`;
const Emailblock = styled.text`
  // float: left;
  letter-spacing: 2px;
  font-weight: lighter;
  color: black;
  display: flex;
  font-family: 'Gowun Dodum', sans-serif;
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
  border-bottom: solid 1px #d1d1d1;

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
const Desc = styled.div`
  text-align: center;
`;

const Button1 = styled(Button)`
  float: right;
  // margin-left: 100px;
  margin-top: 10px;
`;

export default Trainerdetail;
