import React, { useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

function ChargeCancel() {
  const loginedUser = useSelector(state => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    axios({
      method: 'post',
      url: 'https://localhost:4000/pay/payment/status',
      data: {
        status: 'cancel',
        tid: loginedUser.tid,
      },
    });
  }, []);
  return (
    <Container fluid className="panel">
      <div>결제가 취소되었습니다.</div>
      <Button variant="primary" onClick={() => navigate('/pointCharge')}>
        포인트 충전으로 돌아가기
      </Button>
    </Container>
  );
}

export default ChargeCancel;
