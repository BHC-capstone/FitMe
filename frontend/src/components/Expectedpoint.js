import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
function Expectedpoint({ startDate, endDate }) {
  return (
    <div>
      <Boxr>
        <Boxc>
          <div> 예상 비용</div>
          <Boxep>
            {Math.floor(
              Math.ceil(
                // eslint-disable-next-line react/prop-types
                (endDate.getTime() - startDate.getTime()) /
                  (1000 * 60 * 60 * 24),
              ) *
                (2 / 7),
            )}
          </Boxep>
        </Boxc>
        <Boxc>
          <div> 현재 보유 포인트</div>
          <Boxep>100</Boxep>
        </Boxc>
      </Boxr>
      <Boxr>
        <Boxc>
          <div> 결제</div>
        </Boxc>
        <Boxc>
          <div> 충전</div>
        </Boxc>
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
  border: 2px solid black;
  justify-content: space-around;
  allign-item: center;
  height: 100px;
  text-align: center;
`;
const Boxc = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  justify-content: space-around;
  allign-item: center;
  text-align: left;
  width: 162px;
  border-radius: 10px;
`;
const Boxep = styled.div`
  width: 90px;
  height: 24px;
  border: none;
  font-weight: 400;
  font-size: 16px;
  padding: 20px;
  background-color: gray;
  color: black;
  border-radius: 10px;
`;

export default Expectedpoint;
