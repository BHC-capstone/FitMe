import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import '../../scss/userInfoTab.scss';
import { Container } from 'react-bootstrap';
import { async } from 'regenerator-runtime';
import LogoutButton from './LogoutButton';

function UserInfoTab({ loginedUser }) {
  const [user, setUser] = React.useState(null);
  const blankImg = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`;
  const [profImg, setProfImg] = useState(blankImg);
  useEffect(() => {
    const fetchUser = async () => {
      if (!loginedUser.id) {
        return;
      }
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
      if (response.data !== null) {
        setUser(response.data);
      }
    };
    const fetchUserImg = async () => {
      try {
        let response = null;
        {
          loginedUser.isTrainer === false
            ? (response = await axios.get(
                `https://localhost:4000/users/profileimg/${loginedUser.id}`,
                {
                  withCredentials: true,
                },
              ))
            : (response = await axios.get(
                `https://localhost:4000/trainers/profileimg/${loginedUser.id}`,
                {
                  withCredentials: true,
                },
              ));
        }
        const { data } = response.data;
        data === null ? setProfImg(blankImg) : setProfImg(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
    fetchUserImg();
  }, []);
  if (!loginedUser.id) {
    return <div>로그인 후 이용해주세요.</div>;
  }
  if (!user) {
    return <div>회원정보 Loading...</div>;
  }

  return (
    <Container>
      <div className="user-info-tab">
        <div className="user-info-profile">
          <Avatar
            size={150}
            src={profImg}
            style={{
              marginRight: '1rem',
              marginLeft: '1rem',
              marginBottom: '1rem',
            }}
          />
          <ul className="user-info-list">
            <li className="user-info-item">
              <span className="user-info-label b">이메일:</span>{' '}
              {user.data.email}
            </li>
            <li className="user-info-item">
              <span className="user-info-label b">이름:</span> {user.data.name}
            </li>
            <li className="user-info-item">
              <span className="user-info-label b">나이:</span> {user.data.age}
            </li>
            <li className="user-info-item">
              <span className="user-info-label b">성별:</span>{' '}
              {user.data.gender === 'female' ? '여성' : '남성'}
            </li>
            <li className="user-info-item">
              <span className="user-info-label b">전화번호:</span>
              {user.data.phonenumber}
            </li>
          </ul>
          <div className="user-info-actions">
            <Link to="/mypage/edit">
              <button type="button" className="btn btn-primary">
                회원정보 수정
              </button>
            </Link>
            <LogoutButton />
            <Link to="/mypage/withdraw">
              <button type="button" className="btn btn-danger">
                회원 탈퇴
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default UserInfoTab;
