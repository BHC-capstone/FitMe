/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-return-assign */
/* eslint-disable camelcase */
import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Form, FloatingLabel } from 'react-bootstrap';
import { useSelector } from 'react-redux';

// import '../../scss/trainercalendar/uploader.scss';
// eslint-disable-next-line react/prop-types
function ExistFeedBack({ feedbackvideo, feedbacktext, feedbackid }) {
  const [Feedbacktext, setFeedBackText] = useState('');
  const [Feedbackurl, setFeedBackURL] = useState('');
  const loginedUser = useSelector(state => state.user);
  const [file, setFile] = useState({
    fileObject: '',
    preview_URL: 'img/default_image.png',
    type: 'video',
  });

  useEffect(() => {
    // console.log('?', feedbackvideo);
    // console.log(feedbacktext);
    setFeedBackText(feedbacktext);
    setFeedBackURL(feedbackvideo);
  }, [feedbacktext, feedbackvideo]);

  return (
    <Flexcontainers>
      <Text0>오늘의 피드백</Text0>
      <Flexcontainerg>
        <div className="feedback">
          <VideoTexture>
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
              value={Feedbacktext}
              style={{ height: '100px' }}
            />
          </FloatingLabel>
        </div>
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
`;
const VideoTexture = styled.ul`
  display: flex;
  justify-content: center;
  margin-left: -3%;
  .file-wrapper {
    img,
    video {
      border: 1px solid #fff;
      border-radius: 10px;
      width: 200px;
      height: fit-content;
      min-height: 100px;
      object-fit: contain;
    }
  }
`;
// const TextBox = styled.div`
//   padding-left: 5%;
//   text-align: left;
//   border-radius: 30px;
//   border: thin solid
//     ${props => ((props.num + props.count) % 2 === 1 ? '#2ba5f7' : 'white')};
//   width: 90%;
//   background-color: ${props =>
//     (props.num + props.count) % 2 === 1 ? '#fff' : '#2ba5f7'};
//   margin: auto;
//   margin-bottom: 5px;
//   line-height: 60px;
//   height: 60px;
//   color: ${props => ((props.num + props.count) % 2 === 1 ? 'gray' : 'white')};
// `;
export default ExistFeedBack;
