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
  const [certificationFile, setCertificationFile] = React.useState(null);
  const [pointforPt, setPointforPt] = React.useState(0);
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
  const onChangePoint = e => {
    setPointforPt(e.target.value);
  };

  // eslint-disable-next-line consistent-return
  const onSubmit = e => {
    e.preventDefault();
    if (password !== passwordCheck) {
      return setPasswordCheck('');
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('name', name);
    formData.append('password', password);
    formData.append('phonenumber', phonenumber);
    formData.append('age', age);
    formData.append('gender', gender);
    formData.append('introduction', introduction);
    formData.append('certificationFile', certificationFile);
    formData.append('pt_point', pointforPt);

    axios({
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      url: 'https://localhost:4000/trainers/signup',
      data: formData,
      method: 'POST',
    })
      .then(res => {
        alert(res.data.message);
        navigate('/login');
      })
      .catch(err => {
        alert(err.response.data.message);
      });
  };

  const goLogin = () => {
    navigate('/login');
  };
  const goUserSignUp = () => {
    navigate('/user-signup');
  };

  return (
    <div>
      <Container fluid className="panel">
        <div className="head">트레이너 회원가입</div>
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
                label="이름 (7글자 이하)"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={onChangeName}
                  maxLength="7"
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
            <Col xs="4">
              <FloatingLabel
                controlId="floatingSelect"
                label="성별"
                className="mb-3"
                required
              >
                <Form.Select value={gender} onChange={onChangeGender} required>
                  <option>선택하세요</option>
                  <option value="남성">남성</option>
                  <option value="여성">여성</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col xs="3">
              <FloatingLabel
                controlId="floatingSelect"
                label="나이"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  placeholder="나이 입력"
                  value={age}
                  onChange={onChangeAge}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col xs="5">
              <FloatingLabel
                controlId="floatingSelect"
                label="회당 PT 가격 (원)"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  placeholder="PT회당 가격 입력"
                  value={pointforPt}
                  onChange={onChangePoint}
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
              placeholder="Leave a introduction here."
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
          <Button variant="primary" type="submit" className="mgtp">
            제출
          </Button>
        </Form>
        <Button variant="link" type="button" onClick={goLogin}>
          이미 계정이 있나요?
        </Button>
        <hr />
        <Button variant="secondary" type="button" onClick={goUserSignUp}>
          수강생 회원가입
        </Button>
      </Container>
    </div>
  );
}
