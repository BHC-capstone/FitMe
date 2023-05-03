import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { loginUser } from '../../redux/_reducers/userSlice';

export default function LoginPage() {
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

    dispatch(loginUser(body))
      .then(res => {
        if (res.payload.loginSuccess) {
          navigate('/');
        } else {
          alert(res.payload.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const goTrainerLogin = () => {
    navigate('/trainer-login');
  };

  return (
    <div className="login">
      <Container className="panel">
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>아이디</Form.Label>
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
          <Button type="button" variant="warning" onClick={goTrainerLogin}>
            트레이너 로그인
          </Button>
        </Form>
      </Container>
    </div>
  );
}
