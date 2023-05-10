import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';

export default function SignUpPage() {
  // const dispatch = useDispatch();
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
      .post('http://localhost:4000/users/signup', body)
      .then(res => {
        navigate('/login');
        alert(res.data.message);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const goTrainerSignUp = () => {
    navigate('/trainer-signup');
  };

  return (
    <div className="signup">
      <Container>
        <Head1>일반 사용자 회원가입</Head1>
      </Container>
      <Container className="panel">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={onChangeEmail}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>패스워드</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPasswordCheck">
            <Form.Label>패스워드 재입력</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password Check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
              required
            />
          </Form.Group>
          <Row>
            <Col md="5">
              <Form.Group controlId="formBasicname">
                <Form.Label>이름</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={onChangeName}
                />
              </Form.Group>
            </Col>
            <Col md="7">
              <Form.Group controlId="formBasicPhonenumber">
                <Form.Label>전화번호</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Phonenumber"
                  value={phonenumber}
                  onChange={onChangePhonenumber}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formBasicGender">
                <Form.Label>성별</Form.Label>
                <Form.Control as="select" onChange={onChangeGender}>
                  <option value="">선택하세요</option>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                  <option value="others">기타</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicAge">
                <Form.Label>나이</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter age"
                  value={age}
                  onChange={onChangeAge}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="info" type="submit" onClick={onSubmit}>
            제출
          </Button>
          <Button variant="warning" type="button" onClick={goTrainerSignUp}>
            트레이너 회원가입
          </Button>
        </Form>
      </Container>
    </div>
  );
}

const Head1 = styled.div`
  color: rgb(21, 20, 20);
  font-weight: bold;
  font-size: 30px;
  display: flex;
  text-align: center;
  align-items: center;
  width: fit-content;
  margin: 0 auto;
  padding: 20px;
`;
