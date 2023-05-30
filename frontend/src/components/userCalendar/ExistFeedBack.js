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
      <Flexcontainerg>
        <VideoTexture>
          <div className="file-wrapper">
            {file.type === 'image' ? (
              <img src={file.preview_URL} />
            ) : (
              <video controls autoPlay src={file.preview_URL} />
            )}
          </div>
        </VideoTexture>
        <input value={Feedbacktext} />
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

export default ExistFeedBack;
