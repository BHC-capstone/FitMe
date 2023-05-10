import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginUser, logoutUser } from '../../redux/_reducers/userSlice';

function WithdrawPage() {
  const [password, setPassword] = useState('');
  const loginedUser = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('user_id : ', loginedUser.id, '삭제 시도');
    try {
      let url = null;
      {
        loginedUser.isTrainer === false
          ? (url = `http://localhost:4000/users/withdraw/${loginedUser.id}`)
          : (url = `http://localhost:4000/trainers/withdraw/${loginedUser.id}`);
      }
      const response = await axios.post(url, {
        password,
      });
      console.log(response.data.message);
      dispatch(logoutUser());
      navigate('/login');
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <div>
      <h1>회원탈퇴 페이지</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">회원탈퇴</button>
      </form>
      <Link to="/mypage">
        <button type="button" className="btn btn-primary">
          취소하기
        </button>
      </Link>
    </div>
  );
}

export default WithdrawPage;
