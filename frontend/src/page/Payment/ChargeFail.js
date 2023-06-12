import React, { useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

function ChargeFail() {
  const loginedUser = useSelector(state => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    axios({
      method: 'post',
      url: 'https://fitme.p-e.kr:4000/pay/payment/status',
      data: {
        status: 'fail',
        tid: loginedUser.tid,
      },
    });
  }, []);
  return (
    <Container fluid className="panel">
      <div className="head">결제가 실패하였습니다.</div>
      <Button variant="secondary" onClick={() => navigate('/pointCharge')}>
        포인트 충전으로 돌아가기
      </Button>
    </Container>
  );
}

export default ChargeFail;
