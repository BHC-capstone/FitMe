import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import TrainerDiet from './TrainerDiet';

// eslint-disable-next-line react/prop-types
function TrainerDietTab({ userid, date }) {
  const imageInput1 = useRef();
  const imageInput2 = useRef();
  const imageInput3 = useRef();

  const [ImageBreakfast, setImageBreakfast] = useState([]);
  const [ImageLunch, setImageLunch] = useState([]);
  const [ImageDinner, setImageDinner] = useState([]);
  /* 업로드 부분은 업로드 버튼을 누를때마다 데이터베이스 변경
    신청을 보낼지 아니면 제출 버튼을 하나 더만들어서 보내고 수정이
    불가능하게 할지 토론할 부분이 있어, 구현이 크게 오래걸리지 않는
    부분이므로 잠시 보류함 */

  return (
    <Flexcontainers>
      <TrainerDiet userid={userid} date={date} />
      {/* {dietdate.map((el, index) => (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <Diet num={index} />
      ))} */}
    </Flexcontainers>
  );
}
const Flexcontainers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export default TrainerDietTab;
