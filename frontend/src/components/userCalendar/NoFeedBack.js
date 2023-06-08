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
  background-color: #2ba5f7;
  border-radius: 10px;
  border: 1px solid white;
  font-size: 1.2rem;
  color: white;
  margin: auto;
  line-height: 50px;
  width: 200px;
  height: 50px;
`;
export default NoFeedBack;
