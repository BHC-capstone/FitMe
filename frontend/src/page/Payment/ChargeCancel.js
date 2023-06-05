import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ChargeCancel() {
  const navigate = useNavigate();
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
