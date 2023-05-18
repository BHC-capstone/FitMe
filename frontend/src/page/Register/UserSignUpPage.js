import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
} from 'react-bootstrap';
import styled from 'styled-components';

export default function TrainerSignUpPage() {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [phonenumber, setPhonenumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordCheck, setPasswordCheck] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [age, setAge] = React.useState('');

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };
  const onChangeName = e => {
    setName(e.target.value);
  };
  const onChangePassword = e => {
    setPassword(e.target.value);
  };
  const onChangePasswordCheck = e => {
    setPasswordCheck(e.target.value);
  };
  const onChangeGender = e => {
    setGender(e.target.value);
  };
  const onChangeAge = e => {
    setAge(e.target.value);
  };
  const onChangePhonenumber = e => {
    setPhonenumber(e.target.value);
  };

  // eslint-disable-next-line consistent-return
  const onSubmit = e => {
    e.preventDefault();
    if (password !== passwordCheck) {
      return setPasswordCheck('');
    }

    const body = {
      email,
      name,
      phonenumber,
      password,
      age,
      gender,
    };
    axios
      .post('https://localhost:4000/users/signup', body, {
        withCredentials: true,
      })
      .then(res => {
        navigate('/user-login');
        alert(res.data.message);
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
      <Container fluid className="panel">
        <Head1>일반 사용자 회원가입</Head1>
        <Form onSubmit={onSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="이메일"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={onChangeEmail}
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="비밀번호"
            className="mb-3"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="비밀번호 재입력"
            className="mb-3"
          >
            <Form.Control
              type="password"
              placeholder="Password Check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
              required
            />
          </FloatingLabel>
          <Row>
            <Col xs="5">
              <FloatingLabel
                controlId="floatingInput"
                label="이름"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={onChangeName}
                />
              </FloatingLabel>
            </Col>
            <Col xs="7">
              <FloatingLabel
                controlId="floatingInput"
                label="전화번호"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter Phonenumber"
                  value={phonenumber}
                  onChange={onChangePhonenumber}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel
                controlId="floatingSelect"
                label="성별"
                className="mb-3"
                required
              >
                <Form.Select onChange={onChangeGender}>
                  <option>선택하세요</option>
                  <option value="남성">남성</option>
                  <option value="여성">여성</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingSelect"
                label="나이"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  placeholder="Enter age"
                  value={age}
                  onChange={onChangeAge}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Button variant="primary" type="submit" onClick={onSubmit}>
            제출
          </Button>
        </Form>
        <Button variant="link" type="button" onClick={goUserLogin}>
          이미 계정이 있나요?
        </Button>
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
