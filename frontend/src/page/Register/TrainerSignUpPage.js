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
  const [certificationFile, setCertificationFile] = React.useState(null);
  const [introduction, setIntroduction] = React.useState('');

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
  const onChangeCertificationFile = e => {
    setCertificationFile(e.target.files[0]);
  };
  const onChangeIntroduction = e => {
    setIntroduction(e.target.value);
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

    // const body = {
    //   email,
    //   name,
    //   password,
    //   phonenumber,
    //   age,
    //   gender,
    //   introduction,
    // };

    // axios
    //   .post('http://localhost:4000/trainers/signup', body)
    //   .then((res) => {
    //     if (res.data.success) {
    //       navigate('/login');
    //     } else {
    //       alert(res.data.message);
    //     }
    //   })

    const formData = new FormData();
    formData.append('email', email);
    formData.append('name', name);
    formData.append('password', password);
    formData.append('phonenumber', phonenumber);
    formData.append('age', age);
    formData.append('gender', gender);
    formData.append('introduction', introduction);
    formData.append('certificationFile', certificationFile);

    axios({
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      url: 'https://localhost:4000/trainers/signup',
      data: formData,
      method: 'POST',
    })
      .then(res => {
        navigate('/trainer-login');
        alert(res.data.message);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const goTrainerLogin = () => {
    navigate('/trainer-login');
  };

  return (
    <div>
      <Container fluid className="panel">
        <Head1>트레이너 회원가입</Head1>
        <Form>
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
          <Row className="mb-3">
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
                  <option value="male">남성</option>
                  <option value="female">여성</option>
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
          <FloatingLabel
            controlId="floatingTextarea"
            label="자기소개"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a instroduction here."
              value={introduction}
              onChange={onChangeIntroduction}
            />
          </FloatingLabel>
          <Form.Group controlId="formBasicCertificationFile">
            <Form.Label>자격증 파일</Form.Label>
            <Form.Control
              type="file"
              placeholder="Enter certificationFile"
              onChange={onChangeCertificationFile}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={onSubmit}>
            제출
          </Button>
        </Form>
        <Button variant="link" type="button" onClick={goTrainerLogin}>
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
