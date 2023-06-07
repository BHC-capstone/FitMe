import React, { useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ChargeCancel() {
  const navigate = useNavigate();
  useEffect(() => {
    axios({
      method: 'post',
      url: 'https://localhost:4000/pay/payment/status',
      data: {
        status: 'cancel',
      },
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
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
