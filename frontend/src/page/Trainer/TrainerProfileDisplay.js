import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { Form, Upload } from 'antd';

function TrainerProfile({ trainerId }) {
  const loginedUser = useSelector(state => state.user);
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const response = await axios.get(
        `https://fitme.p-e.kr:4000/trainers/getListOfCertification/${trainerId}`,
        { withCredentials: true },
      );
      const { data } = response.data;
      setCertifications(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="trainer-profile">
      {loginedUser.isTrainer ? (
        <Form>
          <Form.Item label="트레이너 프로필 사진">
            <Upload.Dragger name="files" />
          </Form.Item>
        </Form>
      ) : null}

      <Container fluid>
        <div className="certification-list">
          <div className="head">보유 자격증</div>
          {certifications.map(certification => (
            <div key={certification.id} className="certification-item">
              <img
                style={{ width: '230px', height: 'auto' }}
                src={certification.image_url}
                alt="자격증"
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default TrainerProfile;
