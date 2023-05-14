import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; //* ***
import axios from 'axios';
// eslint-disable-next-line react/prop-types
function Routine({ num, exercisename, time, set, exerciseURL, guideURL }) {
  const [exerVideo, setExerVideo] = useState([]);
  const videoInput = useRef();
  const onCickImageUpload2 = () => {
    videoInput.current.click();
  };
  function onVideoChange(event) {
    setExerVideo(event.target.files[0]);
    console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append('video', exerVideo);
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
    <Flexcontainer num={0}>
      <Text0 num={num}>운동 1{num}</Text0>
      <Text1 num={num}>벤치 프레스{exercisename}</Text1>
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
    </Flexcontainer>
  );
}

const Flexcontainer = styled.div`
  display: flex;
  background-color: ${props => (props.num % 2 === 1 ? 'white' : '#92D148')};
  height: 350px;
  flex-direction: column;
  border: thin solid;
  border-color: #92d148;
  border-radius: 30px / 10%;
  margin: 5%;
`;
const Text0 = styled.text`
  font-weight: bolder;
  font-size: 16px;
  margin-top: 20px;
  text-align: left;
  margin-left: 5%;
  color: ${props => (props.num % 2 === 1 ? 'green' : 'white')};
`;
const Text1 = styled.text`
  font-weight: bolder;
  font-size: 24px;
  margin-top: 20px;
  text-align: left;
  margin-left: 5%;
  color: ${props => (props.num % 2 === 1 ? 'green' : 'white')};
`;
const Text2 = styled.text`
  font-size: 12px;
  margin-top: 10px;
  text-align: left;
  margin-left: 5%;
  color: ${props => (props.num % 2 === 1 ? 'green' : 'white')};
`;
const TextBox = styled.div`
  padding-left: 5%;
  text-align: left;
  border-radius: 6px / 10%;
  border: thin solid #a5d862;
  width: 90%;
  background-color: ${props =>
    (props.num + props.count) % 2 === 1 ? 'white' : '#A5D862'};
  margin: auto;
  line-height: 60px;
  height: 60px;
  color: ${props => ((props.num + props.count) % 2 === 1 ? 'gray' : 'white')};
`;
const StyledButton = styled(Button)`
  padding-left: 5%;
  text-align: left;
  border-radius: 6px / 10%;
  //border: 2px solid green;
  width: 90%;
  background-color: ${props =>
    (props.num + props.count) % 2 === 1 ? 'white' : '#A5D862'};
  margin: auto;
  line-height: 60px;
  height: 60px;
  color: ${props => ((props.num + props.count) % 2 === 1 ? 'gray' : 'white')};
`;
const StyledLink = styled(Link)`
  width: 100%;
  margin: auto;
`;
export default Routine;
