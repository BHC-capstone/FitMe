import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

function UserEdit({ props }) {
  const loginedUser = useSelector(state => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    age: '',
    gender: '',
    phonenumber: '',
    password: '',
    password2: '',
  });

  useEffect(() => {
    async function fetchUserData() {
      try {
        let response = null;
        {
          loginedUser.isTrainer === false
            ? (response = await axios.get(
                `https://localhost:4000/users/profile/${loginedUser.id}`,
                {
                  withCredentials: true,
                },
              ))
            : (response = await axios.get(
                `https://localhost:4000/trainers/profile/${loginedUser.id}`,
                {
                  withCredentials: true,
                },
              ));
        }

        const { data } = response.data;
        setFormData({
          email: data.email,
          name: data.name,
          age: data.age,
          gender: data.gender,
          phonenumber: data.phonenumber,
          password: '',
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserData();
  }, [loginedUser.id]);

  const handleSubmit = e => {
    console.log(formData.phonenumber);
    e.preventDefault();
    if (formData.password !== formData.password2) {
      alert('비밀번호가 일치하지 않습니다.');
    } else {
      let url = null;
      {
        loginedUser.isTrainer === false
          ? (url = `https://localhost:4000/users/profile/changeProfile/${loginedUser.id}`)
          : (url = `https://localhost:4000/trainers/profile/changeProfile/${loginedUser.id}`);
      }
      axios
        .post(url, {
          email: formData.email,
          name: formData.name,
          age: formData.age,
          gender: formData.gender,
          phonenumber: formData.phonenumber,
          password: formData.password,
          password2: formData.password2,
        })
        .then(response => {
          alert(response.data.message);
          navigate('/mypage');
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <Container fluid className="panel">
        <Head1>회원 정보 수정</Head1>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="이메일"
            className="mb-3"
          >
            <Form.Control
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
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
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  id="phonenumber"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel id="gender" name="gender" value={formData.gender}>
                <Form.Select onChange={handleChange}>
                  <option>선택하세요</option>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                  <option value="others">기타</option>
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
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <FloatingLabel
            controlId="floatingInput"
            label="비밀번호"
            className="mb-3"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
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
              id="password2"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            변경
          </Button>
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

export default UserEdit;
