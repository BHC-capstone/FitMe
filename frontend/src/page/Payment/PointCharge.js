import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import payIcon from '../../images/payment_icon_yellow_small.png';

function PointCharge() {
  const loginedUser = useSelector(state => state.user);
  const [point, setPoint] = useState(0);
  const [pointCharge, setPointCharge] = useState('');
  const [nextUrl, setNextUrl] = useState('');
  const navigate = useNavigate();
  const MY_ADMIN_KEY = 'ebd206ac5d003ad23e3a33e7ebf28aa6';

  const fetchPoint = async () => {
    axios({
      method: 'get',
      url: `https://localhost:4000/users/profile/${loginedUser.id}`,
      withCredentials: true,
    })
      .then(response => {
        const { data } = response.data;
        setPoint(data.point);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchPoint();
  }, []);

  const chargePoint = async () => {
    const params = {
      cid: 'TC0ONETIME',
      partner_order_id: '23',
      partner_user_id: '23',
      item_name: '포인트 충전',
      quantity: 1,
      total_amount: pointCharge,
      vat_amount: 0,
      tax_free_amount: 0,
      approval_url: 'https://localhost:3000/charge-success',
      fail_url: 'https://localhost:3000/charge-fail',
      cancel_url: 'https://localhost:3000/charge-cancel',
    };
    axios({
      method: 'post',
      url: 'https://kapi.kakao.com/v1/payment/ready',
      headers: {
        Authorization: `KakaoAK ${MY_ADMIN_KEY}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params,
    }).then(response => {
      const redirectUrl = response.data.next_redirect_pc_url;
      window.location.href = redirectUrl;
    });
  };

  return (
    <Container fluid className="panel">
      <h1>포인트 충전</h1>
      <h2>포인트는 1원 단위로 충전 가능합니다.</h2>
      <h2>현재 포인트: {point}</h2>
      <form>
        <input
          placeholder="충전할 포인트를 입력하세요."
          type="number"
          value={pointCharge}
          onChange={e => {
            setPointCharge(e.target.value);
          }}
        />
        <button
          type="button"
          onClick={chargePoint}
          style={{ border: 'none', background: 'transparent' }}
        >
          <img src={payIcon} width="70%" height="70%" />
        </button>
      </form>
    </Container>
  );
}

export default PointCharge;
