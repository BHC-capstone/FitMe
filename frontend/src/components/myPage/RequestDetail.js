import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Avatar, Button, Descriptions } from 'antd';
import './RequestDetail.css';

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
        <Button
          type="primary"
          onClick={() => handleAccept(loginedUserId, requestId)}
        >
          수락
        </Button>
        <Button
          type="primary"
          onClick={() => handleReject(loginedUserId, requestId)}
        >
          거절
        </Button>
      </>
    );
  }
  return (
    <Button
      type="primary"
      onClick={() => handleCancel(loginedUserId, requestId)}
    >
      취소
    </Button>
  );
}

function RequestDetail({ request, fetch }) {
  const loginedUser = useSelector(state => state.user);
  const isTrainer = loginedUser.isTrainer.toString();
  const handleAccept = async (trainerId, requestId) => {
    try {
      await axios.post(
        `https://localhost:4000/request/accept/${trainerId}/${requestId}`,
        {
          response: '수락',
        },
      );
      // fetchRequest();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = async (userId, requestId) => {
    try {
      await axios.post(
        `https://localhost:4000/request/cancel/${userId}/${requestId}`,
        {
          response: '취소',
        },
      );
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
        <h1>{request.name}</h1>
        <div>
          <Avatar
            size={64}
            src={request && request.body_img}
            alt="회원몸사진"
          />
          <Descriptions title="회원정보" bordered>
            <Descriptions.Item label=" 이름" className="item-label">
              {request && request.id}
            </Descriptions.Item>
            <Descriptions.Item label=" 나이" className="item-label">
              {request && request.age}
            </Descriptions.Item>
            <Descriptions.Item label=" 성별" className="item-label">
              {request.gender}
            </Descriptions.Item>
            <Descriptions.Item label=" 키" className="item-label">
              {request.height}
            </Descriptions.Item>
            <Descriptions.Item label=" 몸무게" className="item-label">
              {request.weight}
            </Descriptions.Item>
            <Descriptions.Item label=" pt횟수" className="item-label">
              {request.count}
            </Descriptions.Item>
            <Descriptions.Item label="요청사항" className="item-label">
              {request.request}
            </Descriptions.Item>
            <Descriptions.Item label="응답 메시지" className="item-label">
              {request.response}
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

export default RequestDetail;
