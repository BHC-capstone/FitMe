import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, FloatingLabel } from 'react-bootstrap';
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
      .post('/trainers/login', body, {
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
        console.log(err);
      });
  };

  const goUserLogin = () => {
    navigate('/user-login');
  };

  return (
    <div>
      <Container className="panel">
        <Head1>트레이너 로그인</Head1>
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

          <Button type="submit" variant="primary" onSubmit={onSubmitHandler}>
            로그인
          </Button>
          <StyledButton type="button" variant="secondary" onClick={goUserLogin}>
            일반 사용자 로그인
          </StyledButton>
        </Form>
      </Container>
    </div>
  );
}

const Head1 = styled.div`
  color: rgb(21, 20, 20);
  font-family: 'Black Han Sans', sans-serif;
  font-size: 30px;
  display: flex;
  text-align: center;
  align-items: center;
  width: fit-content;
  margin: 0 auto;
  padding: 10px;
`;
const StyledButton = styled(Button)`
  margin-left: 10px;
`;
