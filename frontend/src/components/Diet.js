import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; //* ***
import axios from 'axios';
// eslint-disable-next-line react/prop-types
function Routine({ num, exercisename, time, set, exerciseURL, guideURL }) {
  const [dietImg, setDietImg] = useState([]);
  const imageInput = useRef();
  const onCickImageUpload2 = () => {
    imageInput.current.click();
  };
  function onImageChange(event) {
    setDietImg(event.target.files[0]);
    console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append('image', dietImg);
    axios
      .post('', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log('fail');
      });
    // console.log(event.target.files);
  }
  return (
    <div>
      <Flexcontainer num={0}>
        <Text0 num={0}>오늘의 식단{num}</Text0>
        <Text1 num={0}>아침 식단</Text1>
        <Text2 num={0}>아침 거르지 말기!</Text2>
        <TextBox num={0} count={1}>
          <span className="b">아침</span> : 바나나 2개, 우유
        </TextBox>
        <input
          type="file"
          style={{ display: 'none' }}
          ref={imageInput}
          accept="image"
          onChange={event => onImageChange(event)}
        />
        <StyledButton num={0} count={2} onClick={onCickImageUpload2}>
          사진 업로드
        </StyledButton>
        <Div />
      </Flexcontainer>
      <Flexcontainer num={1}>
        <Text0 num={1}>오늘의 식단{num}</Text0>
        <Text1 num={1}>점심 식단</Text1>
        <Text2 num={1}>몇 시에 드셨는지도 적어주세요!</Text2>
        <TextBox num={1} count={1}>
          <span className="b">점심</span> : 반숙 베이컨 샐러드
        </TextBox>
        <input
          type="file"
          style={{ display: 'none' }}
          ref={imageInput}
          accept="image"
          onChange={event => onImageChange(event)}
        />
        <StyledButton num={1} count={2} onClick={onCickImageUpload2}>
          점심 사진 업로드
        </StyledButton>
        <Div />
      </Flexcontainer>
      <Flexcontainer num={2}>
        <Text0 num={2}>오늘의 식단{num}</Text0>
        <Text1 num={2}>저녁 식단</Text1>
        <Text2 num={2}>식사는 9시 전에 끝내기!</Text2>
        <TextBox num={2} count={1}>
          <span className="b">저녁</span> : 시리얼, 우유, 단백질바
        </TextBox>
        <input
          type="file"
          style={{ display: 'none' }}
          ref={imageInput}
          accept="image"
          onChange={event => onImageChange(event)}
        />
        <StyledButton num={2} count={2} onClick={onCickImageUpload2}>
          저녁 사진 업로드
        </StyledButton>
        <Div />
      </Flexcontainer>
    </div>
  );
}

const Flexcontainer = styled.div`
  display: flex;
  background-color: ${props => (props.num % 2 === 1 ? 'white' : '#2ba5f7')};
  height: fit-content;
  flex-direction: column;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin-bottom: 20px;
`;
const Text0 = styled.text`
  font-weight: bolder;
  font-size: 16px;
  margin-top: 20px;
  text-align: left;
  margin-left: 5%;
  color: ${props => (props.num % 2 === 1 ? '#2ba5f7' : 'white')};
`;
const Text1 = styled.text`
  font-family: 'Black Han Sans', sans-serif;
  font-size: 28px;
  margin-top: 8px;
  text-align: left;
  margin-left: 5%;
  color: ${props => (props.num % 2 === 1 ? '#2ba5f7' : 'white')};
`;
const Text2 = styled.text`
  font-size: 12px;
  text-align: left;
  margin-left: 8%;
  margin-bottom: 5px;
  color: ${props => (props.num % 2 === 1 ? '#2ba5f7' : 'white')};
`;
const TextBox = styled.div`
  padding-left: 5%;
  text-align: left;
  border-radius: 30px;
  border: thin solid
    ${props => ((props.num + props.count) % 2 === 1 ? '#2ba5f7' : 'white')};
  width: 90%;
  background-color: ${props =>
    (props.num + props.count) % 2 === 1 ? '#fff' : '#2ba5f7'};
  margin: auto;
  margin-bottom: 5px;
  line-height: 60px;
  height: 60px;
  color: ${props => ((props.num + props.count) % 2 === 1 ? 'gray' : 'white')};
`;
const StyledButton = styled(Button)`
  padding-left: 5%;
  text-align: left;
  border-radius: 30px;
  border: 1px solid
    ${props => ((props.num + props.count) % 2 === 1 ? '#2ba5f7' : 'white')};
  width: 90%;
  background-color: ${props =>
    (props.num + props.count) % 2 === 1 ? 'white' : '#2ba5f7'};
  margin: auto;
  line-height: 60px;
  height: 60px;
  color: ${props => ((props.num + props.count) % 2 === 1 ? 'gray' : 'white')};
`;

const Div = styled(Link)`
  width: 100%;
  margin-bottom: 20px;
`;

export default Routine;
