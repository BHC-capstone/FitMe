import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputBox from './InputBox';

function UserInputForm({ datatransform }) {
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [injury, setInjury] = useState('');
  const [career, setCareer] = useState('');
  const [significant, setSignificant] = useState('');
  const [bodyshape, setBodyShape] = useState('');
  const [purpose, setPurpose] = useState('');
  const [lifestyle, setLifeStyle] = useState('');

  function upload(event) {
    datatransform({
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
  }
  return (
    <Flexcontainers>
      <InputBox text1="나이" text2="세" datap={setAge} />
      <InputBox text1="성별" datap={setGender} />
      <InputBox text1="키" text2="cm" datap={setHeight} />
      <InputBox text1="몸무게" text2="kg" datap={setWeight} />
      <InputBox text1="지병 혹은 부상" height="60px" datap={setInjury} />
      <InputBox text1="운동 경력" height="60px" datap={setCareer} />
      <InputBox text1="특이사항" height="60px" datap={setSignificant} />
      <InputBox text1="체형과 통증" height="100px" datap={setBodyShape} />
      <InputBox text1="운동 목적" height="100px" datap={setPurpose} />
      <InputBox
        text1="직업 또는 생활 패턴"
        height="100px"
        datap={setLifeStyle}
      />
      <StyledButton num={0} count={4} onClick={upload}>
        작성 완료
      </StyledButton>
    </Flexcontainers>
  );
}
const Flexcontainers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //border: 2px solid black;
`;
const StyledButton = styled(Button)`
  padding-left: 5%;
  text-align: left;
  border-radius: 30px;
  border: 1px solid white;
  width: 90%;
  background-color: ${props =>
    (props.num + props.count) % 2 === 1 ? 'white' : '#2ba5f7'};
  margin: auto;
  line-height: 60px;
  height: 60px;
  color: ${props => ((props.num + props.count) % 2 === 1 ? 'gray' : 'white')};
`;
export default UserInputForm;
