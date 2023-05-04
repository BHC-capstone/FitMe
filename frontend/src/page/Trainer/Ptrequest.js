import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import Expectedpoint from '../../components/Expectedpoint';

function Ptrequest() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div>
      <Head1>PT 신청</Head1>
      <Boxr>
        <Boxc>
          <Head2>PT 시작일</Head2>
          <StyledDatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
        </Boxc>
        <Boxc>
          <Head2>pt 종료일</Head2>
          <StyledDatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </Boxc>
      </Boxr>

      <Expectedpoint startDate={startDate} endDate={endDate} />
    </div>
  );
}
// <div>{Math.floor(Math.ceil((endDate.getTime()-startDate.getTime())/(1000*60*60*24))*(2/7))}</div>

const Head1 = styled.div`
  color: rgb(21, 20, 20);
  font-weight: bold;
  font-size: 30px;
  display: flex;
  text-align: center;
  align-items: center;
  width: 100px;
  margin: 0 auto;
`;
const Boxr = styled.div`
  display: flex;
  //border: 2px solid black;
  justify-content: space-around;
  allign-item: center;
  height: 300px;
  text-align: center;
  background-color: gray;
`;
const Boxc = styled.div`
  display: flex;
  flex-direction: column;
  //border: 2px solid black;
  justify-content: space-around;
  allign-item: center;
  text-align: center;
`;
const Head2 = styled.text`
    color: rgb(21,20,20);
    font-weight: bold;
    font-size:20px
    text-align: center;
`;
const StyledDatePicker = styled(DatePicker)`
  width: 122px;
  height: 48px;
  border: none;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  padding: 20px;
  background-color: white;
  color: black;
  border-radius: 10px;
`;
export default Ptrequest;
