import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom'; //* ***
import axios from 'axios';
import { useSelector } from 'react-redux';
// eslint-disable-next-line react/prop-types
function Comments({ text1, check }) {
  return (
    <Flexcontainers>
      {check ? (
        <TextareaUser>{text1}</TextareaUser>
      ) : (
        <TextareaTrainer>{text1}</TextareaTrainer>
      )}
    </Flexcontainers>
  );
}
const Flexcontainers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const TextareaUser = styled.div`
  font-family: 'Gowun Dodum', sans-serif;
  background-color: #2ba5f7;
  border-radius: 10px;
  width: 40%;
  color: white;
  line-height: 20px;
`;
const TextareaTrainer = styled.div`
  font-family: 'Gowun Dodum', sans-serif;
  background-color: blue;
  border-radius: 10px;
  width: 40%;
  color: white;
  line-height: 20px;
`;
export default Comments;
