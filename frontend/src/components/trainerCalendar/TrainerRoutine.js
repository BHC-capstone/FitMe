import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; //* ***
import axios from 'axios';
import { useSelector } from 'react-redux';
// eslint-disable-next-line react/prop-types
function TrainerRoutine({
  num,
  exercisename,
  time,
  set,
  exerciseURL,
  userId,
  date,
}) {
  const loginedUser = useSelector(state => state.user);
  const trainerid = loginedUser.id;
  const [exerVideo, setExerVideo] = useState([]);
  const [guideVideo, setGuideVideo] = useState([]);
  const [exercise, setExercise] = useState('');
  const [timeValue, settimeValue] = useState('');
  const [setValue, setSetValue] = useState('');
  const videoInput1 = useRef();
  const videoInput2 = useRef();
  useEffect(() => {
    setExercise(exercisename);
    settimeValue(time);
    setSetValue(set);
  }, [exercisename, time, set, exercisename]);
  const onCickImageUpload1 = () => {
    videoInput1.current.click();
  };
  const onCickImageUpload2 = () => {
    videoInput.current.click();
    console.log(videoInput.current.files[0]);
  };
  const onChangeExercise = e => {
    setExercise(e.target.value);
  };
  const onChangeTime = e => {
    settimeValue(e.target.value);
  };
  const onChangeSet = e => {
    setSetValue(e.target.value);
  };
  function onexerVideoChange(event) {
    setExerVideo(event.target.files[0]);
    console.log(event.target.files[0]);
  }
  const onGuideVideoChange = () => {
    videoInput.current.click();
    // setGuideVideo(event.target.files[0]);
    console.log(videoInput.current.files[0]);
  };
  const videoInput = useRef();

  function upload(event) {
    const formData = new FormData();
    formData.append('name', exercise);
    formData.append('exercise_count', timeValue);
    formData.append('set_count', setValue);
    // formData.append('exercisevideo', exerVideo);
    formData.append('video', videoInput.current.files[0]);
    axios({
      url: `https://localhost:4000/trainer_calender/createExercise/${date}/${trainerid}/${userId}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      method: 'POST',
      withCredentials: true,
    })
      // axios
      //   .post(
      //     `https://localhost:4000/trainer_calender/createExercise/${date}/${trainerid.id}/${userId}`,
      //     formData,
      //     {
      //       headers: {
      //         'Content-Type': 'multipart/form-data',
      //       },

      //       withCredentials: true,
      //     },
      //   )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
  return (
    <div>
      <Flexcontainer num={0}>
        <Text0 num={0}>오늘의 운동 ({num + 1})</Text0>
        <Form>
          <Row className="justify-content-md-center">
            <Col xs="10">
              <FloatingLabel
                controlId="floatingInput"
                label="운동 이름 입력"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  value={exercise}
                  onChange={onChangeExercise}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row1>
            <Col xs="2">
              <Form.Control
                type="text"
                value={timeValue}
                onChange={onChangeTime}
              />
            </Col>
            <Col xs="2">
              <Text2 num={0}>회</Text2>
            </Col>
            <Col xs="2">
              <Form.Control
                type="text"
                value={setValue}
                onChange={onChangeSet}
              />
            </Col>
            <Col xs="2">
              <Text2 num={0}>세트</Text2>
            </Col>
          </Row1>
          <input
            type="file"
            style={{ display: 'none' }}
            ref={videoInput}
            accept="video"
            onChange={event => onGuideVideoChange(event)}
          />
          <StyledButton num={0} count={2} onClick={onCickImageUpload2}>
            가이드 영상 업로드
          </StyledButton>
          <StyledLink to={exerciseURL} style={{ textDecoration: 'none' }}>
            <TextBox num={0} count={3}>
              회원 운동 영상 확인
            </TextBox>
          </StyledLink>
          <StyledButton num={0} count={4} type="submit" onClick={upload}>
            수정 완료
          </StyledButton>
        </Form>
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
const Row1 = styled(Row)`
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: nowrap;
`;
const Text0 = styled.text`
  font-family: 'Gowun Dodum', sans-serif;
  font-weight: bolder;
  font-size: 16px;
  margin-top: 20px;
  text-align: left;
  margin-left: 5%;
  margin-bottom: 10px;
  color: ${props => (props.num % 2 === 1 ? '#2ba5f7' : 'white')};
`;
// const Text1 = styled.text`
//   font-family: 'Black Han Sans', sans-serif;
//   font-size: 28px;
//   margin-top: 8px;
//   text-align: left;
//   margin-left: 5%;
//   color: ${props => (props.num % 2 === 1 ? '#2ba5f7' : 'white')};
// `;
const Text2 = styled.text`
  font-size: 12px;
  text-align: left;
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
  line-height: 60px;
  height: 60px;
  color: ${props => ((props.num + props.count) % 2 === 1 ? 'gray' : 'white')};
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
const StyledLink = styled(Link)`
  width: 100%;
  margin: auto;
`;

const Div = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export default TrainerRoutine;
/* <input
          type="file"
          style={{ display: 'none' }}
          ref={videoInput1}
          accept="video"
          onChange={event => onexerVideoChange(event)}
        />
        <StyledButton num={0} count={1} onClick={onCickImageUpload1}>
          운동 영상 업로드
        </StyledButton> */
