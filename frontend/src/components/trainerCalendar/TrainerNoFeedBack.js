import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom'; //* ***
import axios from 'axios';
import { useSelector } from 'react-redux';
// eslint-disable-next-line react/prop-types
function TrainerNoFeedBack({ userid, date, getdata }) {
  const [dietImg, setDietImg] = useState([]);
  const loginedUser = useSelector(state => state.user);

  const postFeedBack = e => {
    const body = {
      text: '내용을 작성해주세요',
    };

    axios
      // api 주소 작성 필요 userid date, trainerid=loginedUser.id
      .post('https://localhost:4000/trainers/login', body, {
        withCredentials: true,
      })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          console.log(res.data);
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
    getdata(true);
  };
  return (
    <Flexcontainers>
      <Button variant="primary" type="button" onClick={postFeedBack}>
        추가 버튼
      </Button>
    </Flexcontainers>
  );
}
const Flexcontainers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export default TrainerNoFeedBack;
