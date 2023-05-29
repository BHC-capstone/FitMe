import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import TrainerRoutine from './TrainerRoutine';
import TrainerNoFeedBack from './TrainerNoFeedBack';
import TrainerFeedBack from './TrainerFeedBack';
import Comments from './Comments';
// eslint-disable-next-line react/prop-types
function TrainerFeedBackTab({ userid, date }) {
  const [Feedbackdate, setFeedBackdate] = useState([]);
  const [Commentdate, setCommentdate] = useState([]);
  const [FeedbackExist, setFeedbackExist] = useState(false);
  const [textData, setTextData] = useState([]);

  const loginedUser = useSelector(state => state.user);
  useEffect(() => {
    axios
      .get(
        `https://localhost:4000/calender/exerciseroutine/${userid}/${date}`,
        {
          withCredentials: true,
        },
      )
      .then(res => {
        setFeedBackdate(res.data.data);
        console.log(res.data.data);
      });
    setFeedbackExist(Feedbackdate != null);
    axios
      .get(
        `https://localhost:4000/calender/exerciseroutine/${userid}/${date}`,
        {
          withCredentials: true,
        },
      )
      .then(res => {
        setCommentdate(res.data.data);
        console.log(res.data.data);
      });
  }, [userid, date, FeedbackExist]);

  const onAddDetailDiv = () => {
    console.log('버튼 클릭');
    const countArr = [...Commentdate];
    const counter = countArr.slice(-1);
    counter.text = textData;
    countArr.push(counter); // index 사용 X
    // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용
    setCommentdate(countArr);
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
          <TrainerFeedBack
            feedbackvideo="https://fitme-s3.s3.ap-northeast-2.amazonaws.com/exerciseroutine/1/4/sample.mp4"
            feedbacktext="안녕하세요 초기 인풋값입니다."
          />
        )}
        {Commentdate.map((el, index) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <Comments
            // eslint-disable-next-line react/no-array-index-key
            text1={el.text}
            check={el.user != null}
          />
        ))}
      </Flexcontainers>
      <Flexcontainerg>
        <input
          type="text"
          // value={textData}
          onChange={onChangeText}
          onBlur={onChangeText}
          style={{
            textAlign: 'left',
            width: '80%',
            border: '2px solid black',
            background: 'transparent',
          }}
        />
        <Button variant="primary" type="button" onClick={onAddDetailDiv}>
          추가 버튼
        </Button>
      </Flexcontainerg>
    </div>
  );
}
const Flexcontainers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Flexcontainerg = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
export default TrainerFeedBackTab;
