import React from 'react';
import styled from 'styled-components';

// eslint-disable-next-line react/prop-types
function NoFeedBack({ userid, date, getdata }) {
  return (
    <Flexcontainers>
      <Textarea>오늘 피드백 없음</Textarea>
    </Flexcontainers>
  );
}
const Flexcontainers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Textarea = styled.div`
  font-family: 'Gowun Dodum', sans-serif;
  background-color: skyblue;
  border-radius: 10px;
  border: 2px solid black;
  color: black;
  line-height: 50px;
  height: 50px;
`;
export default NoFeedBack;
