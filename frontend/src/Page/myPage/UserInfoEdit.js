import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserEdit() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '김재현',
    email: 'kjh77k@ajou.ac.kr',
    phone: '010-1234-5678',
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    // axios.post('/api/user', user).then(res => {
    //   if (res.data.success) {
    //     navigate('/mypage');
    //   } else {
    //     alert(res.data.message);
    //   }
    // });
    navigate('/mypage');
    alert(`Saved ${user.username}`);
  };

  return (
    <div className="user-edit-tab">
      <h2>회원정보 수정</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="phone">전화번호</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">저장</button>
      </form>
    </div>
  );
}

export default UserEdit;
