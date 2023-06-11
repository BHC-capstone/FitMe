import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Comments from '../trainerCalendar/Comments';
import NoFeedBack from './NoFeedBack';
import ExistFeedBack from './ExistFeedBack';
import InputBox from '../ptrequest/InputBox';

// eslint-disable-next-line react/prop-types
function FeedBackTab({ userid, date }) {
  const [Feedbackdate, setFeedBackdate] = useState([]);
  const [Commentdate, setCommentdate] = useState([]);
  const [FeedbackExist, setFeedbackExist] = useState(false);
  const [textData, setTextData] = useState([]);
  const [repage, setRePage] = useState(0);
  const [bodyData, setBodyData] = useState({ height: 0, weight: 0 });
  const loginedUser = useSelector(state => state.user);

  useEffect(() => {
    // console.log('새로고침 실행');
    setFeedBackdate([]);
    setCommentdate([]);
    axios({
      url: `https://localhost:4000/feedback/checkFeedback/${userid}/${date}`,
      method: 'GET',
      withCredentials: true,
    }).then(res => {
      setFeedBackdate(res.data.data.feedback);
      setCommentdate(res.data.data.feedbackComment);
      console.log(res.data.data);
      // console.log('1');
    });
    setFeedbackExist(!!(Feedbackdate != null && Feedbackdate != false));
  }, [userid, date, repage]);

  useEffect(() => {
    setFeedBackdate(Feedbackdate);
    setCommentdate(Commentdate);
    setFeedbackExist(!!(Feedbackdate != null && Feedbackdate != false));
  }, [Feedbackdate, Commentdate, repage]);

  const onAddDetailDiv = () => {
    // '/comment/:userId/:trainerId'
    axios({
      // /comment/:trainerId/:id
      url: `https://localhost:4000/feedback/comment/${userid}/${Feedbackdate.id}`,
      data: { message: textData },
      method: 'POST',
      withCredentials: true,
    }).then(res => {
      setRePage(repage + 1);
    });
  };

  const onChangeText = e => {
    setTextData(e.target.value);
  };

  const onChangeFile = e => {
    axios({
      url: `https://localhost:4000/feedback/uploadImage/${userid}/${Feedbackdate.id}`,
      data: e.target.files[0],
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      withCredentials: true,
    }).then(res => {
      setRePage(repage + 1);
    });
  };

  const onSubmitBody = () => {
    axios({
      url: `https://localhost:4000/feedback/bodyinfo/${Feedbackdate.id}`,
      data: {
        height: bodyData.height,
        weight: bodyData.weight,
      },
      method: 'POST',
      withCredentials: true,
    });
  };

  // 운동 루틴이 배열로 제공 된다고 가정하면 map 함수를 상위에 추가하여 밑의 컴포넌트들을 본문으로 사용할 예정
  return (
    <Flexcontainers>
      {!FeedbackExist ? (
        <NoFeedBack userid={userid} date={date} getdata={setFeedbackExist} />
      ) : (
        <div>
          <ExistFeedBack
            feedbackvideo={
              Feedbackdate == null
                ? '../../images/sample_certificate.png'
                : Feedbackdate.feedback_video_url
            }
            feedbacktext={
              Feedbackdate == null ? '' : Feedbackdate.feedback_message
            }
            feedbackid={Feedbackdate == null ? 'x' : Feedbackdate.id}
          />
          <details className="mgtp">
            <summary className="mgbt">신체정보 입력</summary>
            <Container fluid className="content">
              <div className="head">오늘의 신체 정보</div>
              <InputGroup className="mb-3 jcct">
                <InputGroup.Text className="textlabel">키</InputGroup.Text>
                <Form.Control
                  type="number"
                  min={0}
                  className="textcontrol"
                  onChange={e => {
                    setBodyData({ ...bodyData, height: e.target.value });
                  }}
                />
                <InputGroup.Text className="textlabel">cm</InputGroup.Text>
              </InputGroup>
              <InputGroup className="mb-3 jcct">
                <InputGroup.Text className="textlabel">몸무게</InputGroup.Text>
                <Form.Control
                  type="number"
                  min={0}
                  className="textcontrol"
                  onChange={e => {
                    setBodyData({ ...bodyData, weight: e.target.value });
                  }}
                />
                <InputGroup.Text className="textlabel">kg</InputGroup.Text>
              </InputGroup>
              <div className="mgbt btn-upload">
                <label htmlFor="imageupload">신체 사진 업로드</label>
                <input type="file" id="imageupload" onChange={onChangeFile} />
              </div>
              <Button
                variant="primary"
                type="button"
                className="mgtp"
                onClick={onSubmitBody}
              >
                입력 완료
              </Button>
            </Container>
          </details>

          <details className="mgtp">
            <summary className="mgbt">요청사항 추가</summary>
            <Container fluid className="content">
              {Commentdate.map((el, index) => (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                <Comments
                  // eslint-disable-next-line react/no-array-index-key
                  text1={el.message}
                  check={el.user_id}
                />
              ))}
              <Flexcontainerg>
                <input
                  className="mgtp"
                  type="text"
                  onChange={onChangeText}
                  onBlur={onChangeText}
                  style={{
                    textAlign: 'left',
                    width: '80%',
                    borderRadius: '5px',
                    border: '1px solid gray',
                    background: 'transparent',
                    marginRight: '3%',
                  }}
                />
                <Button
                  variant="primary"
                  type="button"
                  className="mgtp"
                  onClick={onAddDetailDiv}
                >
                  전송
                </Button>
              </Flexcontainerg>
            </Container>
          </details>
        </div>
      )}
    </Flexcontainers>
  );
}

const Flexcontainers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Flexcontainerg = styled.div`
  flex-direction: row;
  justify-content: space-between;
`;

export default FeedBackTab;
