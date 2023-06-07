import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  FloatingLabel,
} from 'react-bootstrap';
import styled from 'styled-components';
import { loginTrainer } from '../../redux/_reducers/userSlice';

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
      .post('https://fitme.p-e.kr:4000/trainers/login', body, {
        withCredentials: true,
      })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          dispatch(loginTrainer(res.data.data));
          navigate('/customer-list');
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => {
        alert(err.response.data.message);
      });
  };

  const goUserLogin = () => {
    navigate('/user-login');
  };
  const goLandingPage = () => {
    navigate('/');
  };

  return (
    <div>
      <Container fluid className="panel">
        <div className="head">트레이너 로그인</div>
        <Form onSubmit={onSubmitHandler}>
          <FloatingLabel
            controlId="floatingInput"
            label="이메일"
            className="mb-3"
          >
            <Form.Control
              id="email"
              type="email"
              placeholder="이메일을 입력하세요."
              value={email}
              onChange={onEmailHandler}
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="비밀번호"
            className="mb-3"
          >
            <Form.Control
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={onPasswordHandler}
              required
            />
          </FloatingLabel>
          <Row>
            <Col>
              <Button type="submit" variant="primary">
                로그인
              </Button>
            </Col>
          </Row>
          <Row>
            <Button variant="link" type="button" onClick={goLandingPage}>
              회원가입이 필요하신가요?
            </Button>
          </Row>
        </Form>
        <hr />
        <Button type="button" variant="secondary" onClick={goUserLogin}>
          수강생 로그인
        </Button>
      </Container>
    </div>
  );
}
