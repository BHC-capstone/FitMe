import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';
import sampleImg from '../../../images/sample_certificate.png';
import '../../../scss/certificateManage.css';

function CertificateManage() {
  const loginedUser = useSelector(state => state.user);
  const [certFile, setCertFile] = useState(sampleImg);
  const [previewSize, setPreviewSize] = useState(200);
  const imgRef = useRef();

  const saveCertFile = event => {
    event.preventDefault();
    const file = imgRef.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setCertFile(reader.result);
      };
    }
  };
  const handleImageLoad = () => {
    if (certFile !== sampleImg) {
      setPreviewSize('100%');
    }
  };

  useEffect(() => {
    setPreviewSize(200);
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', imgRef.current.files[0]);
    axios({
      method: 'POST',
      url: `http://localhost:4000/trainers/addCertificate/${loginedUser.id}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      withCredentials: true,
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Container fluid className="panel">
      <Head1>자격증 파일 관리</Head1>
      <form className="upload-form" onSubmit={handleSubmit}>
        <button
          type="button"
          className="file-upload"
          onClick={() => {
            imgRef.current.click();
          }}
        >
          <input
            type="file"
            className="certificate-file-input"
            id="file-input"
            accept="image/*"
            onChange={saveCertFile}
            ref={imgRef}
            style={{
              display: 'none',
            }}
          />
          {/* <label htmlFor="file-input" className="file-input-label">
            파일 선택
          </label> */}

          <div
            className="preview-wrapper"
            style={{
              width: previewSize,
              height: previewSize,
            }}
          >
            <img src={certFile} alt="자격증 이미지" onLoad={handleImageLoad} />
          </div>
          <div className="upload-text">
            <p>자격증 파일을 업로드 해주세요.</p>
            <p>자격증 파일은 최대 1개까지 업로드 가능합니다.</p>
          </div>
          <Button variant="primary" type="button">
            파일 선택
          </Button>
        </button>
        <Button1 variant="primary" type="submit">
          업로드
        </Button1>
      </form>
    </Container>
  );
}

const Head1 = styled.div`
  color: rgb(21, 20, 20);
  font-family: 'Black Han Sans', sans-serif;
  font-size: 30px;
  display: flex;
  text-align: center;
  align-items: center;
  width: fit-content;
  margin: 0 auto;
  padding: 10px;
`;
const Button1 = styled(Button)`
  margin-top: 3%;
`;

export default CertificateManage;
