import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import InputBox from './InputBox';

function UserInputForm({ datatransform }) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [injury, setInjury] = useState('');
  const [career, setCareer] = useState('');
  const [significant, setSignificant] = useState('');
  const [bodyshape, setBodyShape] = useState('');
  const [purpose, setPurpose] = useState('');
  const [lifestyle, setLifeStyle] = useState('');

  useEffect(() => {
    datatransform({
      height,
      weight,
      injury,
      career,
      significant,
      bodyshape,
      purpose,
      lifestyle,
    });
  }, [
    height,
    weight,
    injury,
    career,
    significant,
    bodyshape,
    purpose,
    lifestyle,
  ]);

  return (
    <Container fluid className="mgtp">
      <Flexcontainers>
        <div className="head">PT 신청서</div>
        <InputBox text1="키" text2="cm" datap={setHeight} required />
        <InputBox text1="몸무게" text2="kg" datap={setWeight} required />
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
      </Flexcontainers>
    </Container>
  );
}

const Flexcontainers = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default UserInputForm;
