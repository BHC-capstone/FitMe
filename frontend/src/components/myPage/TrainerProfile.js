import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Container, FloatingLabel, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { UploadOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../../scss/myPage/trainerProfile.scss';

function TrainerProfile() {
  const loginedUser = useSelector(state => state.user);
  const navigate = useNavigate();
  const [certifications, setCertifications] = useState([]);
  const [introduction, setIntroduction] = useState('');
  const fileList = [];
  const handleFileUpload = event => {
    event.preventDefault();
    const formData = new FormData();
  };

  useEffect(() => {
    fetchCertifications();
    fetchIntroduction();
  }, []);

  const fetchCertifications = async () => {
    try {
      const response = await axios.get(
        `https://localhost:4000/trainers/getListOfCertification/${loginedUser.id}`,
        { withCredentials: true },
      );
      const { data } = response.data;
      setCertifications(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchIntroduction = async () => {
    axios({
      method: 'get',
      url: `https://localhost:4000/trainers/profile/${loginedUser.id}`,
      withCredentials: true,
    })
      .then(response => {
        const { data } = response.data;
        setIntroduction(data.introduction);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const submitIntroduction = async e => {
    e.preventDefault();
    axios({
      method: 'post',
      url: `https://localhost:4000/trainers/profile/changeIntroduction/${loginedUser.id}`,
      data: {
        introduction,
      },
      withCredentials: true,
    })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const certificationDelete = async id => {
    axios({
      method: 'post',
      url: `https://localhost:4000/trainers/deleteCertification/${id}`,
      withCredentials: true,
    })
      .then(response => {
        fetchCertifications();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="trainer-profile">
      <Container1 fluid>
        <div className="profile">
          <Head1>자기 소개</Head1>
          <Form onSubmit={submitIntroduction}>
            <FloatingLabel
              controlId="floatingTextarea"
              label="자기 소개"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="자기 소개를 입력해주세요."
                style={{ height: '100px' }}
                value={introduction}
                onChange={e => setIntroduction(e.target.value)}
              />
            </FloatingLabel>
            <Button variant="primary" type="submit">
              저장
            </Button>
          </Form>
        </div>
      </Container1>

      <Container1 fluid>
        <div className="certification-list">
          <Head1>보유 자격증</Head1>
          <Button
            variant="primary"
            onClick={() => navigate('/mypage/certificate')}
          >
            트레이너 자격증 업로드
          </Button>
          {certifications.map(certification => (
            <div key={certification.id} className="certification-item">
              <h3 className="certification-name">
                {certification.name}
                <div>
                  <CloseOutlined
                    onClick={() => certificationDelete(certification.id)}
                  />
                </div>
              </h3>
              <img src={certification.image_url} alt="자격증" />
            </div>
          ))}
        </div>
      </Container1>
    </div>
  );
}

const Container1 = styled(Container)`
  margin-bottom: 10%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //border: 2px solid black;
`;
const Head1 = styled.div`
  color: rgb(21, 20, 20);
  font-family: 'Black Han Sans', sans-serif;
  font-size: 30px;
  display: flex;
  text-align: center;
  align-items: center;
  width: fit-content;
  margin: 0 auto;
  // padding: 10px;
`;

export default TrainerProfile;
