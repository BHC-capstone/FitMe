/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-return-assign */
/* eslint-disable camelcase */
import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
function TrainerFeedBack({ feedbackvideo, feedbacktext, feedbackid }) {
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
      url: `https://fitme.p-e.kr:4000/trainer_calender//uploadFeedbackvideo/${date}/${loginedUser.id}/${userid}`,
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
        alert(err.response.data.message);
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
      url: `https://fitme.p-e.kr:4000/trainer_calender/updateFeedback/${feedbackid}`,
      data: { feedback_message: Feedbacktext },
      method: 'PUT',
      withCredentials: true,
    })
      .then(res => {
        alert(res.data.message);
      })
      .catch(err => {
        alert(err.response.data.message);
      });
    axios({
      url: `https://fitme.p-e.kr:4000/trainer_calender/updateFeedbackvideo/${feedbackid}`,
      // url: `https://fitme.p-e.kr:4000/trainer_calender/uploadFeedbackvideo/${date}/${loginedUser.id}/${userid}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,

      method: 'PUT',
      withCredentials: true,
    })
      .then(res => {
        alert(res.data.message);
      })
      .catch(err => {
        alert(err.response.data.message);
      });
  }
  const onChange = e => {
    setFeedBackText(e.target.value);
  };
  return (
    <Flexcontainers>
      <Text0>오늘의 피드백</Text0>
      <Flexcontainerg>
        <div className="feedback">
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
                <img src="/Video_Camera_Icon.svg" />
              ) : (
                <video
                  controls
                  autoPlay
                  src={feedbackvideo != null ? feedbackvideo : file.preview_URL}
                />
              )}
            </div>
          </VideoTexture>
          <FloatingLabel
            controlId="floatingTextarea"
            label="Comments"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              onChange={onChange}
              value={Feedbacktext}
              style={{ height: '100px', marginLeft: '5%' }}
            />
          </FloatingLabel>
        </div>
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
      <Flexcontainerg className="jcct">
        <StyledButton
          className="mglf-0 mgbt mgtp"
          onClick={() => videoInput.current.click()}
        >
          영상 선택 및 변경
        </StyledButton>
        <StyledButton className="mglf-15 mgbt mgtp" onClick={() => upload()}>
          피드백 수정
        </StyledButton>
      </Flexcontainerg>
    </Flexcontainers>
  );
}

const Text0 = styled.text`
  font-family: 'Gowun Dodum', sans-serif;
  font-weight: bolder;
  font-size: 16px;
  margin-top: 20px;
  text-align: left;
  margin-left: 5%;
  margin-bottom: 10px;
  color: ${props => (props.num % 2 === 1 ? '#2ba5f7' : 'white')};
`;
const Flexcontainerg = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
`;
const Flexcontainers = styled.div`
  display: flex;
  background-color: ${props => (props.num % 2 === 1 ? 'white' : '#2ba5f7')};
  height: fit-content;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 0 3%;
`;
const VideoTexture = styled.div`
  display: flex;
  justify-content: center;
  .file-wrapper {
    img,
    video {
      border: 1px solid #fff;
      border-radius: 10px;
      width: 150px;
      height: fit-content;
      height: 100px;
      object-fit: contain;
    }
  }
`;
const StyledButton = styled(Button)`
  background-color: white;
  color: #2ba5f7;
`;
export default TrainerFeedBack;
