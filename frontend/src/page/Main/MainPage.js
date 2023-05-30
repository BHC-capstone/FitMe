/* import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Carousel } from 'react-bootstrap';

export default function MainPage() {
  const navigate = useNavigate();
  
  const onClickHandler = () => {
    axios.get('users/logout').then(response => {
      if (response.data.success) {
        navigate('/login');
      } else {
        alert(res.payload.message);
      }
    });
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/signup">SignUp</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Button type="button" variant="primary" onClick={onClickHandler}>
            로그아웃
          </Button>
        </li>
      </ul>
    </nav>
  );
}
 */
