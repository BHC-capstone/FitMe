import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { loginUser } from '../../_actions/userAction';

export default function LoginPage(props) {
  // const dispatch = useDispatch();
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
      .post('http://localhost:4000/users/login', body)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          navigate('/trainer-list');
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
      });

    // dispatch(loginUser(body))
    //   .then(res => {
    //     if (res.payload.loginSuccess) {
    //       navigate('/');
    //     } else {
    //       alert(res.payload.message);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

  const goTrainerLogin = () => {
    navigate('/trainer-login');
  };
  const onSubmit = e => {
    const body = {
      email,
      password,
    };
    axios
      .post('http://localhost:4000/users/signup', body)
      .then(res => {
        if (res.data.success) {
          navigate('/login');
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="login">
      <Container className="panel">
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              id="id"
              type="text"
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
          <Button type="button" variant="warning" onClick={goTrainerLogin}>
            트레이너 로그인
          </Button>
        </Form>
      </Container>
    </div>
  );
}
