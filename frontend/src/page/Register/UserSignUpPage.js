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
        console.log(res.data.data);
        if (res.status === 200) {
          navigate('/user-login');
          alert(res.data.message);
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
  const goTrainerSignUp = () => {
    navigate('/trainer-signup');
  };

  return (
    <div>
      <Container fluid className="panel">
        <div className="head">수강생 회원가입</div>
        <Form onSubmit={onSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="이메일"
            className="mb-3"
          >
            <Form.Control
              id="email"
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
            required
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
                required
              >
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={onChangeName}
                  required
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
              <FloatingLabel controlId="floatingSelect" label="성별" required>
                <Form.Select onChange={onChangeGender} required>
                  <option>선택하세요</option>
                  <option value="남성">남성</option>
                  <option value="여성">여성</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="floatingSelect" label="나이">
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
          <Button variant="primary" type="submit" className="mgtp">
            제출
          </Button>
        </Form>
        <Button variant="link" type="button" onClick={goUserLogin}>
          이미 계정이 있나요?
        </Button>
        <hr />
        <Button variant="secondary" type="button" onClick={goTrainerSignUp}>
          트레이너 회원가입
        </Button>
      </Container>
    </div>
  );
}
