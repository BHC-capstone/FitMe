import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import ReactPlayer from 'react-player/lazy';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
// eslint-disable-next-line react/prop-types
function TrainerRoutine({
  num,
  exercisename,
  time,
  set,
  exerciseURL,
  guideURL,
  userId,
  date,
  routineid,
  onRemove,
  onVideoSubmit,
  onVideoRemove,
}) {
  const loginedUser = useSelector(state => state.user);
  const trainerid = loginedUser.id;
  const [exercise, setExercise] = useState('');
  const [timeValue, settimeValue] = useState('');
  const [setValue, setSetValue] = useState('');
  const [userVideoOpen, setVideoOpen] = useState(false);
  useEffect(() => {
    setExercise(exercisename);
    settimeValue(time);
    setSetValue(set);
  }, []);

  const onChangeExercise = e => {
    setExercise(e.target.value);
  };
  const onChangeTime = e => {
    settimeValue(e.target.value);
  };
  const onChangeSet = e => {
    setSetValue(e.target.value);
  };
  const onGuideVideoChange = () => {
    videoInput.current.click();
  };
  const videoInput = useRef();

  function exerciseModify(event) {
    event.preventDefault();
    axios({
      url: `https://fitme.p-e.kr:4000/trainer_calender/updateExercise/${routineid}`,
      data: {
        name: exercise,
        exercise_count: timeValue,
        set_count: setValue,
      },
      method: 'PUT',
      withCredentials: true,
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      <Flexcontainer num={num}>
        <Text0 num={num}>
          오늘의 운동 ({num + 1}){' '}
          <CloseOutlined
            style={{ float: 'right', marginRight: '5%' }}
            onClick={() => onRemove(routineid)}
          />
        </Text0>
        <Form>
          <Row className="justify-content-xs-center">
            <Col xs={{ span: 10, offset: 1 }}>
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
              <Text2 num={num}>회</Text2>
            </Col>
            <Col xs="2">
              <Form.Control
                type="text"
                value={setValue}
                onChange={onChangeSet}
              />
            </Col>
            <Col xs="2">
              <Text2 num={num}>세트</Text2>
            </Col>
          </Row1>
          <input
            type="file"
            style={{ display: 'none' }}
            ref={videoInput}
            accept="video"
            onChange={event => onVideoSubmit(videoInput, routineid)}
          />
          <StyledButton num={num} count={0} onClick={onGuideVideoChange}>
            가이드 영상 업로드
          </StyledButton>
          {guideURL ? (
            <StyledVideoContainer>
              <ReactPlayer
                className="react-player"
                url={guideURL}
                width="200px"
                height="200px"
                playing={false}
                muted
                controls
                light={false}
                pip={false}
              />
              <div style={{ float: 'right', marginLeft: '10%', color: 'gray' }}>
                <CloseOutlined onClick={() => onVideoRemove(routineid)} />
              </div>
            </StyledVideoContainer>
          ) : null}
          <StyledButton
            num={num}
            count={1}
            onClick={() => setVideoOpen(e => !e)}
          >
            회원 운동 영상 확인
            <div style={{ float: 'right', marginRight: '5%' }}>
              {userVideoOpen ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            </div>
          </StyledButton>
          {userVideoOpen ? (
            <StyledVideoContainer onClick={() => setVideoOpen(e => !e)}>
              {exerciseURL == null ? (
                <div style={{ color: 'black' }}>
                  아직 영상이 업로드되지 않았습니다.
                </div>
              ) : (
                <ReactPlayer
                  className="react-player"
                  url={exerciseURL}
                  width="200px"
                  height="200px"
                  playing={false}
                  muted
                  controls // 플레이어 컨트롤 노출 여부
                  light={false} // 플레이어 모드
                  pip={false}
                />
              )}
            </StyledVideoContainer>
          ) : null}
          <StyledButton
            num={num}
            count={2}
            type="submit"
            onClick={exerciseModify}
          >
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
const Text2 = styled.text`
  font-size: 12px;
  text-align: left;
  margin-bottom: 5px;
  color: ${props => (props.num % 2 === 1 ? '#2ba5f7' : 'white')};
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
  margin-bottom: 5px;
  height: 60px;
  color: ${props => ((props.num + props.count) % 2 === 1 ? 'gray' : 'white')};
`;
const Div = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;
const StyledVideoContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-left: 5%;
  padding-top: 40px;
  border-radius: 0 0px 30px 30px;
  border: 1px solid #2ba5f7;
  width: 90%;
  background-color: ${props =>
    (props.num + props.count) % 2 === 1 ? '#2ba5f7' : 'white'};
  margin: auto;
  margin-top: -35px;
  margin-bottom: 5px;
  line-height: 60px;
  height: 250px;
  color: ${props => ((props.num + props.count) % 2 === 1 ? 'gray' : 'white')};
`;

export default TrainerRoutine;
