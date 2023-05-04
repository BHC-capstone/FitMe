// eslint-disable-next-line react/prop-types
import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import propTypes from 'prop-types';

function Expectedpoint({ startDate, endDate }) {
  return (
    <div>
      <Boxr>
        <Boxc>
          <div>예상 비용</div>
          <Boxep>
            {Math.floor(
              Math.ceil(
                (endDate.getTime() - startDate.getTime()) /
                  (1000 * 60 * 60 * 24),
              ) *
                (2 / 7),
            )}
          </Boxep>
        </Boxc>
        <Boxc>
          <div>현재 보유 포인트</div>
          <Boxep>100</Boxep>
        </Boxc>
      </Boxr>
      <Boxr>
        <Button type="submit" variant="info">
          결제
        </Button>
        <Button type="submit" variant="info">
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
  height: 100px;
  text-align: center;
`;
const Boxc = styled.div`
  display: flex;
  flex-direction: column;
  border: 0;
  justify-content: space-around;
  align-items: center;
  text-align: left;
  width: 162px;
  border-radius: 10px;
  background-color: rgb(233, 233, 233);
  padding: 10px;
`;
const Boxep = styled.div`
  width: 90px;
  height: 24px;
  font-weight: 400;
  font-size: 16px;
  background-color: #0dcaf0;
  color: black;
  border-radius: 10px;
  text-align: center;
`;

export default Expectedpoint;
