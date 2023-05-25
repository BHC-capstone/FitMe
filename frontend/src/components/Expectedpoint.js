// eslint-disable-next-line react/prop-types
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import propTypes from 'prop-types';
import axios from 'axios';
import { useSelector } from 'react-redux';
import UserInputForm from './ptrequest/UserInputForm';

function Expectedpoint({ startDate, endDate, trainerid }) {
  const loginedUser = useSelector(state => state.user);
  const userid = loginedUser.id;
  const [days, setdays] = useState([]);
  const [count, setCount] = useState([]);
  const [detaildata, setDetailData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(trainerid, '안녕하세요?');
    setdays(
      Math.floor(
        Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
        ) *
          (2 / 7),
      ),
    );
    setCount(
      Math.floor(
        Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
        ) *
          (2 / 7),
      ),
    );
  }, [startDate, endDate]);
  const highFunction = ({
    height,
    gender,
    age,
    weight,
    injury,
    career,
    significant,
    bodyshape,
    purpose,
    lifestyle,
  }) => {
    setDetailData({
      height,
      gender,
      age,
      weight,
      injury,
      career,
      significant,
      bodyshape,
      purpose,
      lifestyle,
    });
  };
  const onSubmitHandler = event => {
    event.preventDefault();
    console.log(trainerid);
    const body = {
      trainer_id: trainerid,
      id: userid,
      startDate,
      days,
      // requst //
      count,
      height: detaildata.height,
      gender: detaildata.gender,
      age: detaildata.age,
      weight: detaildata.weight,
      injury: detaildata.injury,
      career: detaildata.career,
      significant: detaildata.significant,
      bodyshape: detaildata.bodyshape,
      purpose: detaildata.purpose,
      lifestyle: detaildata.lifestyle,
    };
    axios
      .post(`/request/ptrequest`, body, {
        withCredentials: true,
      })
      .then(res => {
        navigate('/mypage');
        if (res.status === 200) {
          console.log(res);
        } else {
          console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <Boxr>
        <Boxc>
          <Head2>PT 횟수</Head2>
          <Boxep1>
            {/* {Math.floor(
              Math.ceil(
                (endDate.getTime() - startDate.getTime()) /
                  (1000 * 60 * 60 * 24),
              ) *
                (2 / 7),
            )} */}
            {days}
          </Boxep1>
        </Boxc>
        <Boxc>
          <Head2>현재 보유 포인트</Head2>
          <Boxep2>100</Boxep2>
        </Boxc>
      </Boxr>
      <Boxr>
        <Button type="submit" variant="primary" onClick={onSubmitHandler}>
          신청
        </Button>
        <Button type="submit" variant="secondary">
          충전
        </Button>
      </Boxr>
      <UserInputForm datatransform={highFunction} />
    </div>
  );
}

Expectedpoint.propsTypes = {
  startDate: propTypes.instanceOf(Date).isRequired,
  endDate: propTypes.instanceOf(Date).isRequired,
};

const Head2 = styled.text`
  font-family: 'Gowun Dodum', sans-serif;
  color: rgb(21,20,20);
  font-weight: bold;
  font-size:20px
  text-align: center;
  width: fit-content;
  padding: 10px;
`;

const Boxr = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: fit-content;
  text-align: center;
  margin-top: 25px;
`;
const Boxc = styled.div`
  display: flex;
  flex-direction: column;
  border: 0;
  justify-content: space-around;
  align-items: center;
  font-weight: bold;
  text-align: left;
  width: 162px;
  border-radius: 10px;
  background-color: rgb(233, 233, 233);
  padding: 10px;
  margin: auto 0;
`;
const Boxep1 = styled.div`
  width: 90px;
  height: 24px;
  font-weight: 400;
  font-size: 16px;
  background-color: #2ba5f7;
  color: white;
  border-radius: 10px;
  text-align: center;
  margin: auto 0;
`;
const Boxep2 = styled.div`
  width: 90px;
  height: 24px;
  font-weight: 400;
  font-size: 16px;
  background-color: #f5a302;
  color: white;
  border-radius: 10px;
  text-align: center;
  margin: auto 0;
`;

export default Expectedpoint;
