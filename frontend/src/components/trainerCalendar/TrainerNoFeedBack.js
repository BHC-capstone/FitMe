import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
// eslint-disable-next-line react/prop-types
function TrainerNoFeedBack({ userid, date, getdata }) {
  const loginedUser = useSelector(state => state.user);
  const postFeedBack = e => {
    axios({
      url: `https://fitme.p-e.kr:4000/trainer_calender/createFeedback/${date}/${loginedUser.id}/${userid}`,
      method: 'POST',
      withCredentials: true,
    })
      .then(res => {
        console.log(res);
        getdata(true);
      })
      .catch(err => {
        console.log(err.response.data.message);
      });
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
  flex-direction: column;
  justify-content: space-between;
`;
export default TrainerNoFeedBack;
