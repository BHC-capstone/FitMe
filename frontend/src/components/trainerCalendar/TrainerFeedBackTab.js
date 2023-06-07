import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import TrainerNoFeedBack from './TrainerNoFeedBack';
import Comments from './Comments';
import TrainerFeedBack from './TrainerFeedBack';
// eslint-disable-next-line react/prop-types
function TrainerFeedBackTab({ userid, date }) {
  const [Feedbackdate, setFeedBackdate] = useState([]);
  const [Commentdate, setCommentdate] = useState([]);
  const [FeedbackExist, setFeedbackExist] = useState(false);
  const [textData, setTextData] = useState([]);
  const [repage, setRePage] = useState(0);
  const loginedUser = useSelector(state => state.user);
  const blankImg = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`;

  useEffect(() => {
    setFeedBackdate(null);
    setCommentdate([]);
    axios({
      url: `https://localhost:4000/feedback/checkFeedback/${userid}/${date}`,
      method: 'GET',
      withCredentials: true,
    }).then(res => {
      setFeedBackdate(res.data.data.feedback);
      setCommentdate(res.data.data.feedbackComment);
      // console.log('1');
    });
    setFeedbackExist(!!(Feedbackdate != null && Feedbackdate != false));
  }, [userid, date, repage, FeedbackExist]);

  useEffect(() => {
    setFeedBackdate(Feedbackdate);
    setCommentdate(Commentdate);
    setFeedbackExist(!!(Feedbackdate != null && Feedbackdate != false));
  }, [Feedbackdate, Commentdate, repage, FeedbackExist]);
  const onAddDetailDiv = () => {
    // '/comment/:userId/:trainerId'
    axios({
      url: `https://localhost:4000/feedback/commentTrainer/${loginedUser.id}/${Feedbackdate.id}`,
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
  // 운동 루틴이 배열로 제공 된다고 가정하면 map 함수를 상위에 추가하여 밑의 컴포넌트들을 본문으로 사용할 예정
  return (
    <div>
      <Flexcontainers>
        {!FeedbackExist ? (
          <TrainerNoFeedBack
            userid={userid}
            date={date}
            getdata={setFeedbackExist}
          />
        ) : (
          <div>
            <TrainerFeedBack
              feedbackvideo={
                Feedbackdate == null
                  ? '../../images/sample_certificate.png'
                  : Feedbackdate.feedback_video_url
              }
              feedbacktext={
                Feedbackdate == null ? '' : Feedbackdate.feedback_message
              }
              feedbackid={Feedbackdate == null ? 'x' : Feedbackdate.id}
              date={date}
              userid={userid}
            />
            <details className="mgtp">
              <summary className="mgbt">회원 신체정보</summary>
              <Container fluid className="content">
                <div className="mgtp">
                  <div className="mgbt">키</div>
                  <div className="mgbt">{Feedbackdate.height}</div>
                </div>
                <div className="mgtp">
                  <div className="mgbt">몸무게</div>
                  <div className="mgbt">{Feedbackdate.weight}</div>
                </div>
                <div className="mgtp">
                  <div className="mgbt">BMI</div>
                  <div className="mgbt">{Feedbackdate.bmi}</div>
                </div>
                <div className="mgtp">
                  <div className="mgbt">신체 사진</div>
                  <div className="mgbt">
                    <img
                      src={
                        Feedbackdate.body_photo_url == null
                          ? blankImg
                          : Feedbackdate.body_photo_url
                      }
                      alt="신체 사진"
                      width="100"
                      height="100"
                    />
                  </div>
                </div>
              </Container>
            </details>

            <details className="mgtp">
              <summary className="mgbt">추가 요청사항</summary>
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
                    // value={textData}
                    onChange={onChangeText}
                    onBlur={onChangeText}
                    style={{
                      textAlign: 'left',
                      width: '80%',
                      borderRadius: '5px',
                      border: '1px solid gray',
                      background: 'transparent',
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
    </div>
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

export default TrainerFeedBackTab;
