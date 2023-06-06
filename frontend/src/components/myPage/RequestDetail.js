import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Avatar, Descriptions } from 'antd';
import './RequestDetail.css';
import styled from 'styled-components';

function ButtonDisplay({
  isTrainer,
  loginedUserId,
  requestId,
  handleCancel,
  handleAccept,
  handleReject,
}) {
  if (isTrainer === 'true') {
    return (
      <>
        <StyledButton1
          variant="primary"
          type="button"
          onClick={() => handleAccept(loginedUserId, requestId)}
        >
          수락
        </StyledButton1>
        <StyledButton2
          variant="danger"
          type="button"
          onClick={() => handleReject(loginedUserId, requestId)}
        >
          거절
        </StyledButton2>
      </>
    );
  }
  return (
    <StyledButton1
      variant="danger"
      type="button"
      onClick={() => handleCancel(loginedUserId, requestId)}
    >
      취소
    </StyledButton1>
  );
}

function RequestDetail({ request, fetch }) {
  const loginedUser = useSelector(state => state.user);
  const isTrainer = loginedUser.isTrainer.toString();
  const navigate = useNavigate();
  const handleAccept = async (trainerId, requestId) => {
    try {
      await axios
        .post(
          `https://localhost:4000/request/accept/${trainerId}/${requestId}`,
          {
            response: '수락',
          },
        )
        .then(res => {
          navigate('/customer-list');
        });
      // fetchRequest();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = async (userId, requestId) => {
    try {
      await axios
        .post(
          `https://localhost:4000/request/delete/${userId}/${requestId}`,
          {
            response: '취소',
          },
          {
            withCredentials: true,
          },
        )
        .then(res => {
          navigate('/mypage');
        });
      fetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (trainerId, requestId) => {
    try {
      await axios.post(
        `https://localhost:4000/request/reject/${trainerId}/${requestId}`,
        {
          response: '거절',
        },
        {
          withCredentials: true,
        },
      );
      fetch();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <Container>
      <div>
        <div className="request-detail-container">
          <Avatar
            size={64}
            src={request && request.body_img}
            alt="회원몸사진"
          />
          <Descriptions title=" " bordered column={1}>
            <Descriptions.Item label=" 이름">
              <span className="item-value">{request.name}</span>
            </Descriptions.Item>
            <Descriptions.Item label=" 나이">
              {request && request.age}
            </Descriptions.Item>
            <Descriptions.Item label=" 성별">
              {request.gender}
            </Descriptions.Item>
            <Descriptions.Item label=" 키">{request.height}</Descriptions.Item>
            <Descriptions.Item label=" 몸무게">
              {request.weight}
            </Descriptions.Item>
            <Descriptions.Item label=" pt횟수">
              {request.count}
            </Descriptions.Item>

            <Descriptions.Item label="지병 혹은 부상">
              {request.injury}
            </Descriptions.Item>

            <Descriptions.Item label="운동 경력">
              {request.career}
            </Descriptions.Item>

            <Descriptions.Item label="특이사항">
              {request.significant}
            </Descriptions.Item>

            <Descriptions.Item label="체형과 통증">
              {request.bodyshape}
            </Descriptions.Item>

            <Descriptions.Item label="운동 목적">
              {request.purpose}
            </Descriptions.Item>

            <Descriptions.Item label="직업 또는 생활 패턴">
              {request.lifestyle}
            </Descriptions.Item>
          </Descriptions>
          <ButtonDisplay
            isTrainer={isTrainer}
            handleAccept={handleAccept}
            handleReject={handleReject}
            handleCancel={handleCancel}
            loginedUserId={loginedUser.id}
            requestId={request.id}
          />
          <div />
        </div>
      </div>
    </Container>
  );
}
const StyledButton1 = styled(Button)`
  // width: 20%;
  margin: auto;
  margin-top: 20px;
`;

const StyledButton2 = styled(Button)`
  // width: 20%;
  margin-left: 10px;
  margin-top: 20px;
`;

export default RequestDetail;
