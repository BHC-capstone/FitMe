import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
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
    <Container1 fluid>
      <Flexcontainers>
        <Head1>PT 신청서</Head1>
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
      </Flexcontainers>
    </Container1>
  );
}

const Container1 = styled(Container)`
  margin-top: 10%;
`;
const Flexcontainers = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //border: 2px solid black;
`;
const Head1 = styled.div`
  color: rgb(21, 20, 20);
  font-family: 'Black Han Sans', sans-serif;
  font-size: 30px;
  display: flex;
  text-align: center;
  align-items: center;
  width: fit-content;
  margin: 0 auto;
  padding: 10px;
`;
const StyledButton = styled(Button)`
  // width: 20%;
  margin: auto;
  margin-top: 20px;
`;
export default UserInputForm;
