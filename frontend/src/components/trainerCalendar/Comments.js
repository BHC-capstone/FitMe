import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom'; //* ***
import axios from 'axios';
import { useSelector } from 'react-redux';
// eslint-disable-next-line react/prop-types
function Comments({ text1, check }) {
  useEffect(() => {
    console.log(check);
  });
  return (
    <TextareaUser check={!!check}>
      <Textarea check={!!check}>{text1}</Textarea>
    </TextareaUser>
  );
}
// <TextBox num={1} count={1}>
//        color: ${props => (props.num % 2 === 1 ? '#2ba5f7' : 'white')};
const Flexcontainers = styled.div`'
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100% !important;
`;
const TextareaUser = styled.div`
  margin-top: 10px;
  margin-right: 20px;
  text-align: ${props => (props.check != false ? 'left' : 'right')};
`;
const Textarea = styled.div`
  display: inline-block;
  position: relative;
  background-color: ${props => (props.check != false ? '#ea5936' : 'skyblue')};
  border-radius: 20px;
  color: #fff;
  padding: 7px 12px;
  margin-bottom: 10px;
  max-width: 230px;
`;
const TextareaTrainer = styled.div`
  font-family: 'Gowun Dodum', sans-serif;
  background-color: skyblue;
  border-radius: 10px;
  width: 40%;
  color: white;
  width: 100%;
  line-height: 20px;
`;
/*
.myChat {
  margin-top: 10px;
  margin-right: 20px;
  text-align: right;
}

.chatBox {
  display: inline-block;
  position: relative;
  background-color: #ea5936;
  border-radius: 20px;
  color: #fff;
  padding: 7px 12px;
  margin-bottom: 10px;
  max-width: 230px;
}
*/
export default Comments;
