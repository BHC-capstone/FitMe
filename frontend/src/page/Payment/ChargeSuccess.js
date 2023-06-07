/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Container } from 'react-bootstrap';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

function ChargeSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const loginedUser = useSelector(state => state.user);
  const params = new URLSearchParams(location.search);
  const pgToken = params.get('pg_token');
  // const MY_ADMIN_KEY = 'ebd206ac5d003ad23e3a33e7ebf28aa6';
  // const params = {
  //   cid: 'TC0ONETIME',
  //   tid: '',
  //   partner_order_id: 'FitMePointCharge',
  //   partner_user_id: `user${loginedUser.id}`,
  //   pg_token,
  // };

  useEffect(() => {
    console.log(pgToken);
    console.log(loginedUser.tid);
    axios({
      method: 'post',
      url: 'https://localhost:4000/pay/payment/approve',
      data: {
        pgToken,
        userId: loginedUser.id,
        tId: loginedUser.tid,
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
      <div>결제가 완료되었습니다.</div>
      <Button variant="primary" onClick={() => navigate('/mypage')}>
        마이페이지로 돌아가기
      </Button>
    </Container>
  );
}

export default ChargeSuccess;
