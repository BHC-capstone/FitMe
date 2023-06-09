import { React, useEffect, useState } from 'react';
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { logoutUser } from '../redux/_reducers/userSlice';

export default function TopNav() {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    if (user.isTrainer === false) {
      axios.get('https://fitme.p-e.kr:4000/users/logout').then(response => {
        if (response.status === 200) {
          alert(response.data.message);
          dispatch(logoutUser());
          navigate('user-login');
        } else {
          alert(response.data.message);
        }
      });
    } else {
      axios.get('https://fitme.p-e.kr:4000/trainers/logout').then(response => {
        if (response.status === 200) {
          alert(response.data.message);
          dispatch(logoutUser());
          navigate('trainer-login');
        } else {
          alert(response.data.message);
        }
      });
    }
  };

  const [point, setPoint] = useState(0);
  useEffect(() => {
    if (user.isTrainer === true) return;
    axios({
      method: 'get',
      url: `https://fitme.p-e.kr:4000/users/userpoint/${user.id}`,
      withCredentials: true,
    }).then(response => {
      const { data } = response.data;
      setPoint(data.amount);
    });
  }, []);

  return (
    <Navbar key="sm" expand="sm" bg="white">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src="/fitmelogo.svg" width="100" alt="FitMe logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-sm"
          aria-labelledby="offcanvasNavbarLabel-expand-sm"
          placement="start"
          responsive="sm"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-sm">
              <img src="/fitmelogo.svg" width="100" alt="FitMe logo" />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {user.isLogin === false ? (
              <Nav className="justify-content-start flex-grow-1 pe-3">
                <Nav.Link href="/signup">회원가입</Nav.Link>
                <Nav.Link href="/user-login">로그인</Nav.Link>
              </Nav>
            ) : (
              <Nav className="justify-content-start flex-grow-1 pe-3">
                <Nav.Link href="/mypage">마이페이지</Nav.Link>
                <Nav.Link href="/pointcharge">보유포인트:{point}</Nav.Link>
                {user.isTrainer === false ? (
                  <NavDropdown
                    title="PT 관리"
                    id="offcanvasNavbarDropdown-expand-sm"
                  >
                    <Nav.Link href="/trainer-list">트레이너 목록</Nav.Link>
                    <Nav.Link href="/calendar">캘린더 및 피드백</Nav.Link>
                  </NavDropdown>
                ) : (
                  <Nav.Link href="/customer-list">관리 중인 수강생</Nav.Link>
                )}
                <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
              </Nav>
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
