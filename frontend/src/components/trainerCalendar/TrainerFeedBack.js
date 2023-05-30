/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-return-assign */
/* eslint-disable camelcase */
import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom'; //* ***
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Input } from 'antd';
// import '../../scss/trainercalendar/uploader.scss';
// eslint-disable-next-line react/prop-types
function TrainerFeedBack({
  feedbackvideo,
  feedbacktext,
  feedbackid,
  date,
  userid,
}) {
  const [Feedbacktext, setFeedBackText] = useState('');
  const [Feedbackurl, setFeedBackURL] = useState('');
  const loginedUser = useSelector(state => state.user);
  const [file, setFile] = useState({
    fileObject: '',
    preview_URL: 'img/default_image.png',
    type: 'video',
  });
  let inputRef;
  const videoInput = useRef();
  useEffect(() => {
    console.log('?', feedbackvideo);
    console.log(feedbacktext);
    setFeedBackText(feedbacktext);
    setFeedBackURL(feedbackvideo);
    setImage();
  }, [feedbacktext, feedbackvideo]);
  const setImage = () => {
    const preview_URL =
      feedbackvideo == null
        ? '../../images/sample_certificate.png'
        : Feedbackurl;
    setFile({
      fileObject: '',
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
      fileObject: '',
      preview_URL,
      type: fileType,
    });
    /* / /////
    const formData = new FormData();
    formData.append('video', videoInput.current.files[0]);
    axios({
      url: `https://localhost:4000/trainer_calender//uploadFeedbackvideo/${date}/${loginedUser.id}/${userid}`,
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
    /// / */
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
    formData.append('video', videoInput.current.files[0]);
    console.log('video', videoInput.current.files[0]);
    // formData.append('video', file.fileObject);
    // console.log('video', file.fileObject);
    axios({
      url: `https://localhost:4000/trainer_calender/updateFeedback/${feedbackid}`,
      data: { feedback_message: Feedbacktext },
      method: 'PUT',
      withCredentials: true,
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    axios({
      url: `https://localhost:4000/trainer_calender/updateFeedbackvideo/${feedbackid}`,
      // url: `https://localhost:4000/trainer_calender/uploadFeedbackvideo/${date}/${loginedUser.id}/${userid}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,

      method: 'PUT',
      withCredentials: true,
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
  const onChange = e => {
    setFeedBackText(e.target.value);
  };
  return (
    <Flexcontainers>
      <Flexcontainerg>
        <VideoTexture>
          <input
            type="file"
            accept="video/*, image/*"
            onChange={saveImage}
            onClick={e => (e.target.value = null)}
            ref={videoInput}
            // refParam => (inputRef = refParam)
            style={{ display: 'none' }}
          />
          <div className="file-wrapper">
            {file.type === 'image' ? (
              <img src={file.preview_URL} />
            ) : (
              <video
                controls
                autoPlay
                src={feedbackvideo != null ? feedbackvideo : file.preview_URL}
              />
            )}
          </div>
        </VideoTexture>
        <input onChange={onChange} value={Feedbacktext} />
        {/* <input
          type="text"
          defaultValue={Feedbacktext}
          onChange={setFeedBackText}
          onBlur={setFeedBackText}
          style={{
            textAlign: 'center',
            width: '50%',
            height: '300px',
            border: '2px solid black',
            background: 'transparent',
          }}
        /> */}
      </Flexcontainerg>
      <Flexcontainerg>
        <Button onClick={() => videoInput.current.click()}>
          영상 선택 및 변경
        </Button>
        <Button onClick={() => upload()}>피드백 수정</Button>
      </Flexcontainerg>
    </Flexcontainers>
  );
}
const Textarea = styled.div`
  font-family: 'Gowun Dodum', sans-serif;
  background-color: #2ba5f7;
  border-radius: 10px;
  width: 40%;
  color: white;
  line-height: ${props => (props.height === '20px' ? '20px' : props.height)};
`;
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
