import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function InputBox({ text1, text2, height, datap }) {
  const [textData, setTextData] = useState([]);
  const onChangeText = e => {
    setTextData(e.target.value);
    console.log(textData);
    datap(textData);
  };
  return (
    <Flexcontainer height={height}>
      <Textarea height={height}>{text1}</Textarea>
      <input
        type="text"
        // value={textData}
        onChange={onChangeText}
        onBlur={onChangeText}
        style={{
          textAlign: 'center',
          width: '50%',
          border: 'none',
          background: 'transparent',
        }}
      />
      <RightText>{text2}</RightText>
    </Flexcontainer>
  );
}
const Flexcontainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  border: 1px solid black;
  height: ${props => (props.height === '20px' ? '20px' : props.height)};
`;
const Textarea = styled.div`
  background-color: gray;
  width: 40%;
  line-height: ${props => (props.height === '20px' ? '20px' : props.height)};
`;
const RightText = styled.text`
  float: right;
  margin-right: 5%;
  width: 10%;
`;
export default InputBox;
