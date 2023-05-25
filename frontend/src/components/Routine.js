import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; //* ***
import axios from 'axios';
// eslint-disable-next-line react/prop-types
function Routine({
  num,
  exercisename,
  content,
  time,
  set,
  exerciseURL,
  guideURL,
  userid,
  routineid,
}) {
  const videoInput = useRef();
  const onCickImageUpload2 = () => {
    videoInput.current.click();
  };
  function onVideoChange(event) {
    const formData = new FormData();
    formData.append('video', videoInput.current.files[0]);
    axios({
      url: `/calender/exercisevideo/${userid}/${routineid}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      method: 'POST',
      withCredentials: true,
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    // console.log(event.target.files);
  }
  return (
    <div>
      <Flexcontainer num={num}>
        <Text0 num={num}>오늘의 운동 {num + 1}</Text0>
        <Text1 num={num}>{exercisename}</Text1>
        <Text2 num={num}>{content}</Text2>
        <Text2 num={num}>
          {time}회 X {set}세트
        </Text2>
        <StyledLink to={exerciseURL} style={{ textDecoration: 'none' }}>
          <TextBox num={num} count={1}>
            운동 자세 영상 확인
          </TextBox>
        </StyledLink>
        <StyledLink to={guideURL} style={{ textDecoration: 'none' }}>
          <TextBox num={num} count={2}>
            촬영 가이드 확인
          </TextBox>
        </StyledLink>
        <input
          type="file"
          style={{ display: 'none' }}
          ref={videoInput}
          accept="video"
          onChange={event => onVideoChange(event)}
        />
        <StyledButton num={num} count={3} onClick={onCickImageUpload2}>
          영상 업로드
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
  font-family: 'Gowun Dodum', sans-serif;
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
  border: 1px solid #2ba5f7;
  width: 90%;
  background-color: ${props =>
    (props.num + props.count) % 2 === 1 ? 'white' : '#2ba5f7'};
  margin: auto;
  line-height: 60px;
  height: 60px;
  color: ${props => ((props.num + props.count) % 2 === 1 ? 'gray' : 'white')};
`;
const StyledLink = styled(Link)`
  width: 100%;
  margin: auto;
`;

const Div = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export default Routine;
