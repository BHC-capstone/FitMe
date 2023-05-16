import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'antd';

function UserEdit({ props }) {
  const loginedUser = useSelector(state => state.user);
  const navigate = useNavigate();
  const blankImg =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  const [profImg, setProfImg] = useState(blankImg);
  const imgRef = useRef();
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
                { withCredentials: true },
              ))
            : (response = await axios.get(
                `https://localhost:4000/trainers/profile/${loginedUser.id}`,
                { withCredentials: true },
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
    console.log(formData.phonenumber);
    event.preventDefault();
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
        .post(
          url,
          {
            email: formData.email,
            name: formData.name,
            age: formData.age,
            gender: formData.gender,
            phonenumber: formData.phonenumber,
            password: formData.password,
            password2: formData.password2,
          },
          {
            withCredentials: true,
          },
        )
        .then(response => {
          alert(response.data.message);
          navigate('/mypage');
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }

  function handleImgSubmit(event) {
    event.preventDefault();
    const formImgData = new FormData();
    formData.append('file', imgRef.current.files[0]);
    let url = null;
    {
      loginedUser.isTrainer === false
        ? (url = `https://localhost:4000/users/profile/changeProfile/${loginedUser.id}`)
        : (url = `https://localhost:4000/trainers/profile/changeProfile/${loginedUser.id}`);
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
  return (
    <div className="container my-5">
      <h1
        style={{ textAlign: 'center', display: 'flex', alignItems: 'center' }}
      >
        <span style={{ flex: 1 }}>회원 정보 수정</span>
        {loginedUser.isTrainer === true ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate('/mypage/certificate')}
            style={{ position: 'absolute', right: '1%' }}
          >
            트레이너 자격관리
          </button>
        ) : null}
      </h1>

      <Avatar
        src={profImg}
        style={{ margin: '20px' }}
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

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">나이</label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">성별</label>
          <select
            className="form-control"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="phonenumber">전화번호</label>
          <input
            type="text"
            className="form-control"
            id="phonenumber"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">비밀번호 확인</label>
          <input
            type="password"
            className="form-control"
            id="password2"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          변경하기
        </button>
      </form>
    </div>
  );
}

export default UserEdit;
