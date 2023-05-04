import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

import { loginTrainer, logoutTrainer } from '../../redux/_reducers/userSlice';

export default function LoginPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailHandler = event => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = event => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = event => {
    event.preventDefault();

    const body = {
      email,
      password,
    };

    axios
      .post('http://localhost:4000/trainers/login', body)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          dispatch(loginTrainer(res.data.data));
          navigate('/mypage');
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
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
              id="email"
              type="email"
              placeholder="이메일을 입력하세요."
              value={email}
              onChange={onEmailHandler}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              id="password"
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
