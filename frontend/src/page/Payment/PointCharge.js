import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input, Radio, Space, Divider } from 'antd';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import payIcon from '../../components/images/payment_icon_yellow_small.png';
import { payUser } from '../../redux/_reducers/userSlice';

function PointCharge() {
  const dispatch = useDispatch();
  const loginedUser = useSelector(state => state.user);
  const [point, setPoint] = useState(0);
  const [pointCharge, setPointCharge] = useState('');
  const [alertDisplay, setAlertDisplay] = useState(0);
  const [pointChargeEtc, setPointChargeEtc] = useState(0); // pointCharge === -1 일 때 사용
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

  function postChargeTry(tid, amount, createdAt) {
    axios({
      method: 'post',
      url: 'https://localhost:4000/users/charge-success',
      data: {
        tid,
        uid: loginedUser.id,
        amount,
        created_at: createdAt,
      },
      withCredentials: true,
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const chargePoint = async () => {
    if (pointCharge < 1000) {
      if (
        pointCharge === -1 &&
        (isNaN(pointChargeEtc) || pointChargeEtc < 1000)
      ) {
        setAlertDisplay(1);
        return;
      }
      if (pointCharge !== -1) {
        setAlertDisplay(1);
        return;
      }
    }
    axios({
      method: 'post',
      url: 'https://localhost:4000/pay/payment',
      data: {
        amount: pointCharge === -1 ? pointChargeEtc : pointCharge,
        userId: loginedUser.id,
      },
    })
      .then(response => {
        const { data } = response.data;
        const { redirectUrl } = data;
        dispatch(payUser(data));
        window.location.href = redirectUrl;
      })
      .catch(error => {
        console.log(error);
      });

    // const params = {
    //   cid: 'TC0ONETIME',
    //   partner_order_id: 'FitMePointCharge',
    //   partner_user_id: `user${loginedUser.id}`,
    //   item_name: 'FitMe 포인트 충전',
    //   quantity: 1,
    //   total_amount: pointCharge === -1 ? pointChargeEtc : pointCharge,
    //   vat_amount: 0,
    //   tax_free_amount: 0,
    //   approval_url: 'https://localhost:3000/charge-success',
    //   fail_url: 'https://localhost:3000/charge-fail',
    //   cancel_url: 'https://localhost:3000/charge-cancel',
    // };
    // axios({
    //   method: 'post',
    //   url: 'https://kapi.kakao.com/v1/payment/ready',
    //   headers: {
    //     Authorization: `KakaoAK ${MY_ADMIN_KEY}`,
    //     'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    //   },
    //   params,
    // }).then(response => {
    //   const createdAt = response.data.created_at;
    //   const { tid } = response.data;
    //   const { amount } = response.data;
    //   postChargeTry(tid, amount, createdAt);
    //   const redirectUrl = response.data.next_redirect_pc_url;
    //   window.location.href = redirectUrl;
    // });
  };

  return (
    <Container fluid className="panel">
      <div className="head">포인트 충전</div>
      <Divider style={{ marginTop: '1px' }} />
      <div className="pointtext">
        <span className="b g">현재 포인트 :</span>
        {point}
      </div>
      <form style={{ margin: '20px' }}>
        <Space direction="vertical">
          <Radio.Group
            onChange={e => {
              setPointCharge(e.target.value);
            }}
            value={pointCharge}
          >
            <Space direction="vertical">
              <Radio value={10000} style={{ fontSize: '1rem' }}>
                <FontAwesomeIcon icon={faCoins} /> 10,000
              </Radio>
              <Divider style={{ margin: '1px' }} />
              <Radio value={50000} style={{ fontSize: '1rem' }}>
                <FontAwesomeIcon icon={faCoins} /> 50,000
              </Radio>
              <Divider style={{ margin: '1px' }} />
              <Radio value={100000} style={{ fontSize: '1rem' }}>
                <FontAwesomeIcon icon={faCoins} /> 100,000
              </Radio>
              <Divider style={{ margin: '1px' }} />
              <Radio value={-1} style={{ fontSize: '1rem' }}>
                {pointCharge === -1 ? (
                  <div>
                    <FontAwesomeIcon icon={faCoins} />
                    <Input
                      style={{
                        width: 100,
                        marginLeft: 10,
                      }}
                      onChange={e => {
                        setPointChargeEtc(e.target.value);
                      }}
                    />
                  </div>
                ) : (
                  '직접 입력'
                )}
              </Radio>
            </Space>
          </Radio.Group>
          <button
            type="button"
            onClick={chargePoint}
            style={{
              border: 'none',
              background: 'transparent',
              marginTop: '30px',
            }}
          >
            <img src={payIcon} width="70%" height="70%" />
          </button>
          {alertDisplay === 1 ? (
            <div style={{ color: 'red', fontSize: '13px' }}>
              1000원 이상부터 충전 가능합니다.
            </div>
          ) : null}
        </Space>
      </form>
    </Container>
  );
}

const TextPoint = styled.text`
  font-family: 'Gowun Dodum', sans-serif;
  font-size: 20px;
  color: #2ba5f7;
`;

export default PointCharge;
