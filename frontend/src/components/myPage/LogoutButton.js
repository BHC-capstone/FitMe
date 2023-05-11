import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginUser, logoutUser } from '../../redux/_reducers/userSlice';

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    // axios
    //   .post('http://localhost:4000/users/logout', body)
    //   .then(res => {
    //     console.log(res);
    //     if (res.status === 200) {
    navigate('/mypage');
    //   } else {
    //     alert(res.data.message);
    //   }
    // })
    // .catch(err => {
    //   console.log(err);
    // });
  };

  return (
    <button type="button" className="btn btn-danger" onClick={handleLogout}>
      로그아웃
    </button>
  );
}

export default LogoutButton;
