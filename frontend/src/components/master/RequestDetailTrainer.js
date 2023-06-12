import React, { useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import { Descriptions } from 'antd';

function ButtonDisplay({ requestId, handleAccept, handleReject }) {
  return (
    <>
      <Button
        variant="primary"
        type="button"
        className="mgauto mgtp"
        onClick={() => handleAccept({ requestId })}
      >
        수락
      </Button>
      <Button
        variant="danger"
        type="button"
        className="mglf-5 mgtp"
        onClick={() => handleReject({ requestId })}
      >
        거절
      </Button>
    </>
  );
}

function RequestDetailTrainer({ request, fetch }) {
  const handleAccept = async ({ requestId }) => {
    axios({
      method: 'post',
      url: `https://fitme.p-e.kr:4000/administrator/trainerauth/${requestId}`,
    })
      .then(response => {
        fetch();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleReject = async ({ requestId }) => {
    axios({
      method: 'post',
      url: `https://fitme.p-e.kr:4000/administrator/trainerreject/${requestId}`,
    })
      .then(response => {
        fetch();
      })
      .catch(error => {
        console.log(error);
      });
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
            <Descriptions.Item label=" 전화번호">
              {request && request.phonenumber}
            </Descriptions.Item>
            <Descriptions.Item label=" 성별">
              {request.gender}
            </Descriptions.Item>
            <Descriptions.Item label=" 나이">{request.age}</Descriptions.Item>
            <Descriptions.Item label=" 자기소개">
              {request.introduction}
            </Descriptions.Item>
            <Descriptions.Item label=" 트레이너 자격증">
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
            requestId={request.id}
          />
          <div />
        </div>
      </div>
    </Container>
  );
}

export default RequestDetailTrainer;
