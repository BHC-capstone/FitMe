// eslint-disable-next-line react/prop-types
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import propTypes from 'prop-types';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Expectedpoint({ startDate, endDate, trainerid }) {
  const loginedUser = useSelector(state => state.user);
  const userid = loginedUser.id;
  const [days, setdays] = useState([]);
  const [count, setCount] = useState([]);
  useEffect(() => {
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
  }, []);
  const onSubmitHandler = event => {
    event.preventDefault();

    const body = {
      trainerid,
      userid,
      startDate,
      days,
      // requst //
      count,
    };
    axios
      .post(`https://localhost:4000/request/ptrequest`, body, {
        withCredentials: true,
      })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          console.log(res);
        } else {
          alert(res.data.message);
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
          <div>PT 횟수</div>
          <Boxep1>
            {Math.floor(
              Math.ceil(
                (endDate.getTime() - startDate.getTime()) /
                  (1000 * 60 * 60 * 24),
              ) *
                (2 / 7),
            )}
          </Boxep1>
        </Boxc>
        <Boxc>
          <div>현재 보유 포인트</div>
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
    </div>
  );
}

Expectedpoint.propsTypes = {
  startDate: propTypes.instanceOf(Date).isRequired,
  endDate: propTypes.instanceOf(Date).isRequired,
};

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
