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
  border-radius: 10px;
  // border: 1px solid black;
  background-color: rgb(233, 233, 233);
  height: ${props => (props.height === '20px' ? '20px' : props.height)};
`;
const Textarea = styled.div`
  font-family: 'Gowun Dodum', sans-serif;
  background-color: #2ba5f7;
  border-radius: 10px;
  width: 40%;
  color: white;
  line-height: ${props => (props.height === '20px' ? '20px' : props.height)};
`;
const RightText = styled.text`
  font-family: 'Gowun Dodum', sans-serif;
  float: right;
  margin-right: 5%;
  width: 10%;
`;
export default InputBox;
