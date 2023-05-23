import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line react/prop-types

function FeedbackTab({ userid, date }) {
  const [feedbackcdate, setFeedbackdate] = useState([]);

  useEffect(() => {
    axios.get(`https://localhost:4000/feedback/${userid}/${date}`).then(res => {
      setFeedbackdate(res.data.data);
      console.log(res.data.data);
    });
  }, [userid, date]);
  // 운동 루틴이 배열로 제공 된다고 가정하면 map 함수를 상위에 추가하여 밑의 컴포넌트들을 본문으로 사용할 예정
  return <div>피드백 기능 Loading... {feedbackcdate}</div>;
}
export default FeedbackTab;
