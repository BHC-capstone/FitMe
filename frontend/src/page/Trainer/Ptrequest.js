// eslint-disable-next-line import/no-unresolved
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { ko } from 'date-fns/esm/locale';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Expectedpoint from '../../components/Expectedpoint';
import './Ptrequest.css';

export default function Ptrequest() {
  const { trainerid } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  useEffect(() => {
    console.log(trainerid, '수고하세요');
  }, []);

  return (
    <Container fluid className="panel">
      <div className="head">PT 신청</div>
      <Boxr>
        <Boxc>
          <Head2>PT 시작일</Head2>
          <StyledDatePicker
            locale={ko}
            selected={startDate}
            dateFormat="yyyy/MM/dd"
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            showDisabledMonthNavigation
          />
        </Boxc>
        <Boxc>
          <Head2>PT 종료일</Head2>
          <StyledDatePicker
            locale={ko}
            selected={endDate}
            dateFormat="yyyy/MM/dd"
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            showDisabledMonthNavigation
          />
        </Boxc>
      </Boxr>

      <Expectedpoint
        startDate={startDate}
        endDate={endDate}
        trainerid={trainerid}
      />
    </Container>
  );
}
const Boxr = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 150px;
  text-align: center;
  background-color: #2ba5f7;
  border-radius: 10px;
`;
const Boxc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
`;
const Head2 = styled.text`
font-family: 'Gowun Dodum', sans-serif;
    color: rgb(21,20,20);
    font-weight: bold;
    font-size:20px
    text-align: center;
    width: fit-content;
    padding: 10px;
`;
const StyledDatePicker = styled(DatePicker)`
  font-family: 'Gowun Dodum', sans-serif;
  width: 130px;
  height: 48px;
  border: none;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  padding: 20px;
  background-color: white;
  color: black;
  border-radius: 10px;
  text-align: center;
`;
