import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CertificateManage() {
  const loginedUser = useSelector(state => state.user);

  const [certFile, setCertFile] = useState('/sample_certificate.png');
  const [previewSize, setPreviewSize] = useState(200);
  const imgRef = useRef();
  const navigate = useNavigate();

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
    if (certFile !== '/sample_certificate.png') {
      setPreviewSize('100%');
    }
  };

  useEffect(() => {
    setPreviewSize(200);
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', imgRef.current.files[0]);
    axios({
      method: 'POST',
      url: `https://localhost:4000/trainers/addCertificate/${loginedUser.id}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      withCredentials: true,
    })
      .then(response => {
        alert(response.data.message);
        navigate('/mypage');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Container fluid className="panel">
      <div className="head">자격증 파일 관리</div>
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
          </div>
          <Button variant="primary" type="button">
            파일 선택
          </Button>
        </button>
        <Button variant="primary" type="submit" className="mgtp">
          업로드
        </Button>
      </form>
    </Container>
  );
}

export default CertificateManage;
