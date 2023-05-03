import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import {
  loginTrainer,
  logoutTrainer,
} from '../../redux/_reducers/trainerSlice';

export default function TrainerLoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userid, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const onUserIdHandler = event => {
    setUserId(event.currentTarget.value);
  };
  const onPasswordHandler = event => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = event => {
    event.preventDefault();

    const body = {
      userid,
      password,
    };

    const login = e => {
      dispatch(loginTrainer(body));
    };
  };

  const goUserLogin = () => {
    navigate('/login');
  };

  return (
    <div className="login">
      <Container className="panel">
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              id="id"
              type="id"
              placeholder="아이디를 입력하세요."
              value={userid}
              onChange={onUserIdHandler}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={onPasswordHandler}
              required
            />
          </Form.Group>

          <Button type="submit" variant="info">
            로그인
          </Button>
          <Button type="button" variant="warning" onClick={goUserLogin}>
            일반 사용자 로그인
          </Button>
        </Form>
      </Container>
    </div>
  );
}
