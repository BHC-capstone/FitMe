import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, ListGroup } from 'react-bootstrap';
import styled from 'styled-components';

function PaymentHistoryTab() {
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    setPayments([
      {
        id: 1,
        date: '2021-01-01',
        amount: 10000,
        method: '신용카드',
      },
      {
        id: 2,
        date: '2021-01-02',
        amount: 20000,
        method: '신용카드',
      },
    ]);
  }, []);

  //   useEffect(() => {
  //     const fetchPayments = async () => {
  //       const response = await axios.get('/api/payments');
  //       setPayments(response.data);
  //     };
  //     fetchPayments();
  //   }, []);

  if (payments.length === 0) {
    return <div>결제내역 Loading...</div>;
  }

  return (
    <Container fluid>
      {payments.map(payment => (
        <StyledCard>
          <Card.Header as="h5">결제 내역 {payment.id}</Card.Header>
          <ListGroup variant="flush" key={payment.id}>
            <ListGroup.Item>결제일자: {payment.date}</ListGroup.Item>
            <ListGroup.Item>결제금액: {payment.amount}</ListGroup.Item>
            <ListGroup.Item>결제수단: {payment.method}</ListGroup.Item>
          </ListGroup>
        </StyledCard>
      ))}
    </Container>
  );
}

const StyledCard = styled(Card)`
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
`;

export default PaymentHistoryTab;
