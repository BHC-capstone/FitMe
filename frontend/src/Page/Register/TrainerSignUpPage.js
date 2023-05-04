import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

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

    const body = {
      email,
      name,
      password,
      phonenumber,
      age,
      gender,
      introduction,
    };

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
      url: 'http://localhost:4000/trainers/signup',
      data: formData,
      method: 'POST',
    }).catch(err => {
      console.log(err);
    });
  };

  const goSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="signup">
      <Container fluid className="panel">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={onChangeEmail}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>패스워드</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPasswordCheck">
            <Form.Label>패스워드 재입력</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password Check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </Form.Group>
          <Form.Group controlId="formBasicname">
            <Form.Label>이름</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={onChangeName}
            />
          </Form.Group>
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
          <Form.Group controlId="formBasicGender">
            <Form.Label>성별</Form.Label>
            <Form.Control as="select" onChange={onChangeGender}>
              <option value="">선택하세요</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
              <option value="others">기타</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formBasicAge">
            <Form.Label>나이</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter age"
              value={age}
              onChange={onChangeAge}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCertificationFile">
            <Form.Label>자격증 파일</Form.Label>
            <Form.Control
              type="file"
              placeholder="Enter certificationFile"
              onChange={onChangeCertificationFile}
            />
          </Form.Group>
          <Form.Group controlId="formBasicIntroduction">
            <Form.Label>간단한 자기소개를 입력해주세요</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={introduction}
              onChange={onChangeIntroduction}
            />
          </Form.Group>

          <Button variant="info" type="submit" onClick={onSubmit}>
            제출
          </Button>
          <Button variant="warning" type="button" onClick={goSignUp}>
            일반 회원가입
          </Button>
        </Form>
      </Container>
    </div>
  );
}
