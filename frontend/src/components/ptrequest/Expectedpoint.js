// eslint-disable-next-line react/prop-types
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import propTypes from 'prop-types';
import axios from 'axios';
import { useSelector } from 'react-redux';
import UserInputForm from './UserInputForm';
import DatePick from './DatePick';

function Expectedpoint({ startDate, endDate, trainerid }) {
  const loginedUser = useSelector(state => state.user);
  const userid = loginedUser.id;
  const [days, setDays] = useState({ value1: [0, 0, 0, 0, 0, 0, 0] });
  const [price, setPrice] = useState(1);
  const [count, setCount] = useState([]);
  const [detaildata, setDetailData] = useState([]);
  const [totalprice, setTotalPrice] = useState(0);
  const [userpoint, setUserPoint] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let diffDate = Math.abs(
      Math.round(
        (startDate.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24),
      ),
    );
    diffDate += 1;

    let counted = 0;
    for (let j = 0; j < 7; j += 1) {
      if (days.value1[j] !== 0) {
        counted += 1;
      }
    }
    let dateBig = Math.floor(diffDate / 7) * counted;
    const dataSmall = diffDate % 7;
    let startDay = startDate.getDay();
    for (let i = 0; i < dataSmall; i += 1) {
      if (startDay > 7) {
        startDay -= 7;
      }
      if (days.value1[startDay] > 0) {
        dateBig += 1;
      }
      startDay += 1;
    }
    setCount(dateBig);
  }, [startDate, endDate, count, days]);

  useEffect(() => {
    fetchRequests();
  }, [count]);

  const fetchRequests = async () => {
    const response = await axios.get(
      `https://localhost:4000/trainers/getPrice/${trainerid}`,
    );
    setPrice(response.data.data.pt_point);
    setTotalPrice(count * response.data.data.pt_point);
    const response1 = await axios.get(
      `https://localhost:4000/users/userpoint/${userid}`,
      {
        withCredentials: true,
      },
    );
    setUserPoint(response1.data.data.amount);
  };
  const highFunction = ({
    height,
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
    const body = {
      trainer_id: trainerid,
      id: userid,
      startDate,
      count,
      totalprice,
      height: detaildata.height,
      weight: detaildata.weight,
      injury: detaildata.injury,
      career: detaildata.career,
      significant: detaildata.significant,
      bodyshape: detaildata.bodyshape,
      purpose: detaildata.purpose,
      lifestyle: detaildata.lifestyle,
    };
    axios
      .post(`https://localhost:4000/request/ptrequest`, body, {
        withCredentials: true,
      })
      .then(res => {
        navigate('/mypage');
        if (res.status === 200) {
          alert(res.data.message);
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => {
        alert(err.response.data.message);
      });
  };

  const goCharge = () => {
    navigate('/pointcharge');
  };

  return (
    <div>
      <DatePick getdata={setDays} />
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
            {count}
          </Boxep1>
        </Boxc>
        <Boxc>
          <Head2>예상 비용/보유 금액</Head2>
          <Boxep2>
            {totalprice} / {userpoint}
          </Boxep2>
        </Boxc>
      </Boxr>
      <Boxr>
        <Button
          type="submit"
          variant="primary"
          className="mglf-02"
          onClick={onSubmitHandler}
        >
          신청
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="mglf-02"
          onClick={goCharge}
        >
          충전
        </Button>
      </Boxr>
      <hr />
      <details className="mgtp">
        <summary>PT 신청서 작성</summary>
        <UserInputForm datatransform={highFunction} />
      </details>
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
  font-size:18px
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
  width: fit-content;
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
  min-width: 90px;
  width: fit-content;
  height: 24px;
  font-weight: 400;
  font-size: 16px;
  background-color: #f5a302;
  color: white;
  border-radius: 10px;
  text-align: center;
  margin: auto 0;
  padding-left: 10%;
  padding-right: 10%;
`;

export default Expectedpoint;
