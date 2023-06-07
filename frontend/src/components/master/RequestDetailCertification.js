import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Avatar, Descriptions } from 'antd';
import '../myPage/RequestDetail.css';
import styled from 'styled-components';

function ButtonDisplay({
  loginedUserId,
  requestId,
  handleAccept,
  handleReject,
}) {
  return (
    <>
      <StyledButton1
        variant="primary"
        type="button"
        onClick={() => handleAccept()}
      >
        수락
      </StyledButton1>
      <StyledButton2
        variant="danger"
        type="button"
        onClick={() => handleReject()}
      >
        거절
      </StyledButton2>
    </>
  );
}

function RequestDetailCertification({ request, fetch }) {
  const loginedUser = useSelector(state => state.user);
  const navigate = useNavigate();
  const handleAccept = async () => {
    try {
      await axios
        .post(
          ``,
          {
            response: '수락',
          },
          {
            withCredentials: true,
          },
        )
        .then(res => {
          // console.log();
        });
      // fetchRequest();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async () => {
    try {
      await axios
        .post(
          ``,
          {
            response: '거절',
          },
          {
            withCredentials: true,
          },
        )
        .then(res => {
          // console.log();
        });
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
          <Descriptions title=" " bordered column={1}>
            <Descriptions.Item label="트레이너 이름">
              <span className="item-value">{request.name}</span>
            </Descriptions.Item>
            <Descriptions.Item label=" 자격증 취득 날짜">
              {request.height}
            </Descriptions.Item>
            <Descriptions.Item label=" 자격증 설명">
              {request.weight}
            </Descriptions.Item>
            <Descriptions.Item label="추가할 트레이너 자격증">
              <img
                style={{ width: '200px', height: '300px' }}
                src={request.image_url}
                alt="자격증"
              />
            </Descriptions.Item>
          </Descriptions>
          <ButtonDisplay
            handleAccept={handleAccept}
            handleReject={handleReject}
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

export default RequestDetailCertification;
