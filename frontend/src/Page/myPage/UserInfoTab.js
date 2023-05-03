import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../scss/userInfoTab.scss';

function UserInfoTab() {
  const [user, setUser] = React.useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        'http://localhost:4000/users/profile/001id',
      );
      if (response.data !== null) {
        setUser(response.data);
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return <div>회원정보 Loading...</div>;
  }

  return (
    // <div className="user-info-tab">
    //   <h2>회원정보</h2>
    //   <p>유저번호: {user.data.id}</p>
    //   <p>아이디: {user.data.user_id}</p>
    //   <p>유저이름: {user.data.username}</p>
    //   <p>유저나이: {user.data.age}</p>
    //   <p>이메일: {user.data.email}</p>
    //   <p>성별: {user.data.gender}</p>
    //   <p>전화번호: {user.data.phonenumber}</p>
    //   <Link to="/mypage/edit">
    //     <button type="button" className="btn btn-primary">
    //       회원정보 수정
    //     </button>
    //   </Link>
    //   <button type="button" className="btn btn-primary">
    //     회원 탈퇴
    //   </button>
    // </div>
    <div className="user-info-tab">
      <h2 className="user-info-tab-title">회원정보</h2>
      <ul className="user-info-list">
        <li className="user-info-item">
          <span className="user-info-label">유저번호:</span> {user.data.id}
        </li>
        <li className="user-info-item">
          <span className="user-info-label">아이디:</span> {user.data.user_id}
        </li>
        <li className="user-info-item">
          <span className="user-info-label">유저이름:</span>{' '}
          {user.data.username}
        </li>
        <li className="user-info-item">
          <span className="user-info-label">유저나이:</span> {user.data.age}
        </li>
        <li className="user-info-item">
          <span className="user-info-label">이메일:</span> {user.data.email}
        </li>
        <li className="user-info-item">
          <span className="user-info-label">성별:</span> {user.data.gender}
        </li>
        <li className="user-info-item">
          <span className="user-info-label">전화번호:</span>{' '}
          {user.data.phonenumber}
        </li>
      </ul>
      <div className="user-info-actions">
        <Link to="/mypage/edit">
          <button type="button" className="btn btn-primary">
            회원정보 수정
          </button>
        </Link>
        <button type="button" className="btn btn-primary">
          회원 탈퇴
        </button>
      </div>
    </div>
  );
}

export default UserInfoTab;
