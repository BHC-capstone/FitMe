import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

function PaymentHistoryTab() {
  const loginedUser = useSelector(state => state.user);
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    axios({
      method: 'get',
      url: `https://localhost:4000/pay/payment/user/${loginedUser.id}`,
      withCredentials: true,
    }).then(res => {
      setPayments(res.data.data);
    });
  }, []);

  //   useEffect(() => {
  //     const fetchPayments = async () => {
  //       const response = await axios.get('/api/payments');
  //       setPayments(response.data);
  //     };
  //     fetchPayments();
  //   }, []);

  if (payments === null) {
    return <div>결제내역 Loading...</div>;
  }

  return (
    <Container fluid>
      {payments.map(payment => (
        <StyledCard>
          <Card.Header as="h5">결제 내역 {payment.id}</Card.Header>
          <ListGroup variant="flush" key={payment.id}>
            <ListGroup.Item>결제일자: {payment.approved}</ListGroup.Item>
            <ListGroup.Item>결제금액: {payment.amount}</ListGroup.Item>
            <ListGroup.Item>결제수단: {payment.payname}</ListGroup.Item>
            <ListGroup.Item>결제결과: {payment.status}</ListGroup.Item>
          </ListGroup>
        </StyledCard>
      ))}
    </Container>
  );
}

const StyledCard = styled(Card)`
  font-family: 'Gowun Dodum', sans-serif;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
`;

export default PaymentHistoryTab;
