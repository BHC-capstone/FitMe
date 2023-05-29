/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-return-assign */
/* eslint-disable camelcase */
import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom'; //* ***
import axios from 'axios';
import { useSelector } from 'react-redux';
// import '../../scss/trainercalendar/uploader.scss';
// eslint-disable-next-line react/prop-types
function TrainerFeedBack({ feedbackvideo, feedbacktext }) {
  const [Feedbacktext, setFeedBackText] = useState([]);
  const loginedUser = useSelector(state => state.user);
  const [file, setFile] = useState({
    fileObject: '',
    preview_URL: 'img/default_image.png',
    type: 'video',
  });
  let inputRef;
  useEffect(() => {
    console.log(feedbackvideo);
    // console.log(feedbacktext);
    setFeedBackText({ feedbacktext });
    setImage();
  }, [feedbacktext, feedbackvideo]);
  const setImage = () => {
    const preview_URL =
      feedbackvideo == null
        ? '../../images/sample_certificate.png'
        : feedbackvideo;
    setFile({
      fileObject: null,
      preview_URL,
      type: feedbackvideo == null ? 'image' : 'video',
    });
  };
  const saveImage = e => {
    e.preventDefault();
    deleteImage();
    URL.revokeObjectURL(file.preview_URL);
    const preview_URL = URL.createObjectURL(e.target.files[0]);
    const fileType = e.target.files[0].type.split('/')[0];
    setFile({
      fileObject: e.target.files[0],
      preview_URL,
      type: fileType,
    });
  };
  const deleteImage = () => {
    // createObjectURL()을 통해 생성한 기존 URL을 폐기
    URL.revokeObjectURL(file.preview_URL);
    setFile({
      fileObject: '',
      preview_URL: 'img/default_image.png',
      type: 'image',
    });
  };
  function upload() {
    const formData = new FormData();
    formData.append('text', Feedbacktext);
    formData.append('video', file.fileObject);
    console.log(Feedbacktext, file.fileObject);
    axios({
      url: ``,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      method: 'POST',
      withCredentials: true,
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
  return (
    <Flexcontainers>
      <Flexcontainerg>
        <VideoTexture>
          <input
            type="file"
            accept="video/*, image/*"
            onChange={saveImage}
            onClick={e => (e.target.value = null)}
            ref={refParam => (inputRef = refParam)}
            style={{ display: 'none' }}
          />
          <div className="file-wrapper">
            {file.type === 'image' ? (
              <img src={file.preview_URL} />
            ) : (
              <video controls autoPlay src={file.preview_URL} />
            )}
          </div>
        </VideoTexture>
        <input
          type="text"
          defaultValue={Feedbacktext.feedbacktext}
          onChange={setFeedBackText}
          onBlur={setFeedBackText}
          style={{
            textAlign: 'center',
            width: '50%',
            height: '300px',
            border: '2px solid black',
            background: 'transparent',
          }}
        />
      </Flexcontainerg>
      <Flexcontainerg>
        <Button onClick={() => inputRef.click()}>영상 선택 및 변경</Button>
        <Button onClick={() => upload()}>피드백 수정</Button>
      </Flexcontainerg>
    </Flexcontainers>
  );
}
const Flexcontainerg = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Flexcontainers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid black;
`;
const VideoTexture = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .file-wrapper {
    margin-right: 20px;

    img,
    video {
      border: 2px solid black;
      width: 150px;
      height: 150px;
      object-fit: contain;
    }
  }
`;
export default TrainerFeedBack;
