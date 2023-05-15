import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import sampleImg from '../../../images/sample_certificate.png';
import '../../../scss/certificateManage.css';

function CertificateManage() {
  const loginedUser = useSelector(state => state.user);
  const [certFile, setCertFile] = useState(null);
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
        <div className="file-upload">
          <input
            type="file"
            className="certificate-file-input"
            id="file-input"
            accept="image/*"
            onChange={saveCertFile}
            ref={imgRef}
          />
          <label htmlFor="file-input" className="file-input-label">
            파일 선택
          </label>
        </div>
        <div className="preview-wrapper">
          <img src={certFile || sampleImg} alt="자격증 이미지" />
        </div>
        <button type="submit" className="submit-btn">
          업로드
        </button>
      </form>
    </div>
  );
}

export default CertificateManage;
