import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'antd';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
} from 'react-bootstrap';

function UserEdit({ props }) {
  const loginedUser = useSelector(state => state.user);
  const navigate = useNavigate();
  const blankImg =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  const [profImg, setProfImg] = useState(blankImg);
  const [PasswordVisible, setPasswordVisible] = useState(false);
  const imgRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phonenumber: '',
    currentPassword: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordCheck: '',
  });
  const TogglePasswordVisible = () => {
    setPasswordVisible(!PasswordVisible);
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        let response = null;
        {
          loginedUser.isTrainer === false
            ? (response = await axios.get(
                `https://localhost:4000/users/profile/${loginedUser.id}`,
                { withCredentials: true },
              ))
            : (response = await axios.get(
                `https://localhost:4000/trainers/profile/${loginedUser.id}`,
                { withCredentials: true },
              ));
        }

        const { data } = response.data;
        setFormData({
          name: data.name,
          age: data.age,
          gender: data.gender,
          phonenumber: data.phonenumber,
          currentPassword: '',
        });
      } catch (error) {
        console.error(error);
      }
    }
    async function fetchUserImg() {
      try {
        let response = null;
        {
          loginedUser.isTrainer === false
            ? (response = await axios.get(
                `https://localhost:4000/users/profileImg/${loginedUser.id}`,
                { withCredentials: true },
              ))
            : (response = await axios.get(
                `https://localhost:4000/trainers/profileImg/${loginedUser.id}`,
                { withCredentials: true },
              ));
        }
        const { data } = response.data;
        data.profileImg === null
          ? setProfImg(blankImg)
          : setProfImg(data.profileImg);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserData();
    fetchUserImg();
  }, [loginedUser.id]);

  const saveProfFile = event => {
    const file = imgRef.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfImg(reader.result);
      };
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    let url = null;
    {
      loginedUser.isTrainer === false
        ? (url = `https://localhost:4000/users/profile/changeProfile/${loginedUser.id}`)
        : (url = `https://localhost:4000/trainers/profile/changeProfile/${loginedUser.id}`);
    }
    axios
      .post(
        url,
        {
          name: formData.name,
          age: formData.age,
          gender: formData.gender,
          phonenumber: formData.phonenumber,
          currentPassword: formData.currentPassword,
        },
        {
          withCredentials: true,
        },
      )
      .then(response => {
        if (response.status === 200) {
          alert('회원정보가 수정되었습니다.');
          if (imgRef !== null) handleImgSubmit(event);
          navigate('/mypage');
        } else alert(response.data.message);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  function handlePasswordSubmit(event) {
    event.preventDefault();
    if (passwordData.newPassword !== passwordData.newPasswordCheck) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    let url = null;
    {
      loginedUser.isTrainer === false
        ? (url = `https://localhost:4000/users/profile/changePassword/${loginedUser.id}`)
        : (url = `https://localhost:4000/trainers/profile/changePassword/${loginedUser.id}`);
    }
    axios
      .post(
        url,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
          newPassword2: passwordData.newPasswordCheck,
        },
        {
          withCredentials: true,
        },
      )
      .then(response => {
        if (response.status === 200) {
          alert('비밀번호가 수정되었습니다.');
          navigate('/mypage');
        } else alert(response.data.message);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  function handleImgSubmit(event) {
    event.preventDefault();
    const formImgData = new FormData();
    formImgData.append('profileImage', imgRef.current.files[0]);
    let url = null;
    {
      loginedUser.isTrainer === false
        ? (url = `https://localhost:4000/users/changeProfileImage/${loginedUser.id}`)
        : (url = `https://localhost:4000/trainers/changeProfileImage/${loginedUser.id}`);
    }
    axios
      .post(url, formImgData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  const goBack = () => {
    navigate('/mypage');
  };

  return (
    <div>
      <Container fluid className="panel">
        <div className="head">회원 정보 수정</div>
        <Avatar
          src={profImg}
          style={{ margin: '20px', cursor: 'pointer' }}
          size={200}
          onClick={() => {
            imgRef.current.click();
          }}
        />
        <input
          type="file"
          style={{ display: 'none' }}
          accept="image/jpg,image/png,image/jpeg"
          name="profile_img"
          onChange={saveProfFile}
          ref={imgRef}
        />
        <Form onSubmit={handleSubmit}>
          <div className="mgtp mgbt">
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
                <FloatingLabel
                  controlId="floatingInput"
                  label="성별"
                  className="mb-3"
                >
                  <Form.Select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
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
              label="현재 비밀번호 입력"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="currentPassword"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
          </div>
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            회원정보 제출
          </Button>
          {PasswordVisible === false && (
            <Button
              type="button"
              variant="secondary"
              className="mglf-3"
              onClick={TogglePasswordVisible}
            >
              비밀번호 변경
            </Button>
          )}
          <Button
            type="button"
            variant="danger"
            className="mglf-3"
            onClick={goBack}
          >
            돌아가기
          </Button>
        </Form>
        <div className="mgtp">
          {PasswordVisible && (
            <Form onSubmit={handlePasswordSubmit}>
              <hr />
              <div className="mgtp mgbt">
                <FloatingLabel
                  controlId="floatingInput"
                  label="현재 비밀번호 입력"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={e => {
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      });
                    }}
                    required
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="새 비밀번호 입력"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={e => {
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      });
                    }}
                    required
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="새 비밀번호 확인"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    id="newPasswordCheck"
                    name="newPasswordCheck"
                    value={passwordData.newPasswordCheck}
                    onChange={e => {
                      setPasswordData({
                        ...passwordData,
                        newPasswordCheck: e.target.value,
                      });
                    }}
                    required
                  />
                </FloatingLabel>
              </div>
              <Button
                type="submit"
                variant="secondary"
                onClick={handlePasswordSubmit}
              >
                비밀번호 변경
              </Button>
              <Button
                type="button"
                variant="danger"
                className="mglf-3"
                onClick={TogglePasswordVisible}
              >
                비밀번호 변경 취소
              </Button>
            </Form>
          )}
        </div>
      </Container>
    </div>
  );
}

export default UserEdit;
