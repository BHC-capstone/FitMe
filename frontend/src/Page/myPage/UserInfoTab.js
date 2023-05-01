import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserInfoTab() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser({
      username: '김재현',
      email: 'kjh77k@ajou.ac.kr',
      phone: '010-1234-5678',
    });
  }, []);

  //   useEffect(() => {
  //     const fetchUser = async () => {
  //       const response = await axios.get('/api/user');
  //       setUser(response.data);
  //     };
  //     fetchUser();
  //   }, []);

  if (!user) {
    return <div>회원정보 Loading...</div>;
  }

  return (
    <div className="user-info-tab">
      <h2>회원정보</h2>
      <p>아이디: {user.username}</p>
      <p>이메일: {user.email}</p>
      <p>전화번호: {user.phone}</p>
      <Link to="/mypage/edit">
        <button type="button" className="btn btn-primary">
          회원정보 수정
        </button>
      </Link>
    </div>
  );
}

export default UserInfoTab;
