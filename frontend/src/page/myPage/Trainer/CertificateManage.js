import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import axios from 'axios';
import sampleImg from '../../../images/sample_certificate.png';
import '../../../scss/certificateManage.css';

function CertificateManage() {
  const loginedUser = useSelector(state => state.user);
  const [certFile, setCertFile] = useState(sampleImg);
  const [previewSize, setPreviewSize] = useState(200);
  const imgRef = useRef();

  const saveCertFile = event => {
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
    axios
      .post(`http://localhost:4000/certificate/${loginedUser.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="form-wrapper">
      <h1>자격증 파일 관리</h1>
      <form className="upload-form">
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
            style={{ display: 'none' }}
          />
          {/* <label htmlFor="file-input" className="file-input-label">
            파일 선택
          </label> */}

          <div
            className="preview-wrapper"
            style={{ width: previewSize, height: previewSize }}
          >
            <img src={certFile} alt="자격증 이미지" onLoad={handleImageLoad} />
          </div>
          <div className="upload-text">
            <p>자격증 파일을 업로드 해주세요.</p>
            <p>자격증 파일은 최대 1개까지 업로드 가능합니다.</p>
          </div>
          <Button type="primary" className="file-input-label">
            파일 선택
          </Button>
        </button>
        <button type="submit" className="submit-btn">
          업로드
        </button>
      </form>
    </div>
  );
}

export default CertificateManage;
