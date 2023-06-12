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

function RequestDetailCertification({ request, fetch }) {
  const handleAccept = async ({ requestId }) => {
    axios({
      method: 'post',
      url: `https://fitme.p-e.kr:4000/administrator/trainer/certificateauth/${requestId}`,
    })
      .then(response => {
        fetch();
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  };

  const handleReject = async ({ requestId }) => {
    axios({
      method: 'post',
      url: `https://fitme.p-e.kr:4000/administrator/trainer/certificatereject/${requestId}`,
    })
      .then(response => {
        fetch();
      })
      .catch(error => {
        alert(error.response.data.message);
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
            <Descriptions.Item label="트레이너 이름">
              <span className="item-value">{request.name}</span>
            </Descriptions.Item>
            <Descriptions.Item label=" 트레이너 아이디">
              {request.trainer_id}
            </Descriptions.Item>
            <Descriptions.Item label="추가할 트레이너 자격증">
              <img
                style={{ width: '200px', height: 'auto' }}
                src={request.image_url}
                alt="자격증"
              />
            </Descriptions.Item>
          </Descriptions>
          <ButtonDisplay
            handleAccept={handleAccept}
            handleReject={handleReject}
            requestId={request.trainer_id}
          />
          <div />
        </div>
      </div>
    </Container>
  );
}

export default RequestDetailCertification;
