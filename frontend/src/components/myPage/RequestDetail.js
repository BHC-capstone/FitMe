import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Descriptions } from 'antd';

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
          variant="primary"
          type="button"
          className="mgauto mgtp"
          onClick={() => handleAccept(loginedUserId, requestId)}
        >
          수락
        </Button>
        <Button
          variant="danger"
          type="button"
          className="mglf-5 mgtp"
          onClick={() => handleReject(loginedUserId, requestId)}
        >
          거절
        </Button>
      </>
    );
  }
  return (
    <Button
      variant="danger"
      type="button"
      className="mgauto mgtp"
      onClick={() => handleCancel(loginedUserId, requestId)}
    >
      취소
    </Button>
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
          alert(res.data.message);
          navigate('/customer-list');
        });
      // fetchRequest();
    } catch (error) {
      alert(error.response.data.message);
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
          alert(res.data.message);
          navigate('/mypage');
        });
      fetch();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleReject = async (trainerId, requestId) => {
    try {
      await axios
        .post(
          `https://localhost:4000/request/reject/${trainerId}/${requestId}`,
          {
            response: '거절',
          },
          {
            withCredentials: true,
          },
        )
        .then(res => {
          alert(res.data.message);
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

export default RequestDetail;
