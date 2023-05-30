import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import ReactPlayer from 'react-player/lazy';
import { Link } from 'react-router-dom'; //* ***
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CloseOutlined,
} from '@ant-design/icons';
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
  onVideoSubmit,
  onVideoRemove,
}) {
  const [guideOpen, setGuideOpen] = useState(false);
  const videoInput = useRef();
  const onCickImageUpload2 = () => {
    videoInput.current.click();
  };

  return (
    <div>
      <Flexcontainer num={num}>
        <Text0 num={num}>오늘의 운동 {num + 1}</Text0>
        <Text1 num={num}>{exercisename}</Text1>
        <Text2 num={num}>{content}</Text2>
        <Text2 num={num}>
          {time}회 X {set}세트
        </Text2>

        <StyledButton num={num} count={1} onClick={() => setGuideOpen(e => !e)}>
          운동 자세 및 촬영 가이드 확인
          <div style={{ float: 'right', marginRight: '5%' }}>
            {guideOpen ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          </div>
        </StyledButton>
        {guideOpen ? (
          <StyledVideoContainer>
            {guideURL == null ? (
              <div style={{ color: 'black' }}>
                아직 영상이 업로드되지 않았습니다.
              </div>
            ) : (
              <ReactPlayer
                className="react-player"
                url={guideURL}
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

        <input
          type="file"
          style={{ display: 'none' }}
          ref={videoInput}
          accept="video"
          onChange={event => onVideoSubmit(videoInput, routineid)}
        />
        <StyledButton num={num} count={1} onClick={onCickImageUpload2}>
          영상 업로드
        </StyledButton>
        {exerciseURL ? (
          <StyledVideoContainer>
            <ReactPlayer
              className="react-player"
              url={exerciseURL}
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
  margin-bottom: 5px;
  height: 60px;
  z-index: 1;
  color: ${props => ((props.num + props.count) % 2 === 1 ? 'gray' : 'white')};
`;

const StyledVideoContainer = styled.button`
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
const StyledLink = styled(Link)`
  width: 100%;
  margin: auto;
`;

const Div = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export default Routine;
