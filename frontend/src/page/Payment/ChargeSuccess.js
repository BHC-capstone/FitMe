/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ChargeSuccess() {
  const navigate = useNavigate();
  const { pg_token } = useParams();
  const loginedUser = useSelector(state => state.user);
  const MY_ADMIN_KEY = 'ebd206ac5d003ad23e3a33e7ebf28aa6';
  const params = {
    cid: 'TC0ONETIME',
    tid: '',
    partner_order_id: 'FitMePointCharge',
    partner_user_id: `user${loginedUser.id}`,
    pg_token,
  };

  useEffect(() => {
    axios({
      method: 'post',
      url: 'https://kapi.kakao.com/v1/payment/approve',
      headers: {
        Authorization: `KakaoAK ${MY_ADMIN_KEY}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params,
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        alert(error.response.data.message);
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
