import React, { useState, useEffect } from 'react';
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
  const [point, setPoint] = useState(0);
  useEffect(() => {
    if (user.isTrainer === true) return;
    axios({
      method: 'get',
      url: `https://localhost:4000/users/userpoint/${user.id}`,
      withCredentials: true,
    }).then(response => {
      const { data } = response.data;
      setPoint(data.amount);
    });
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/mypage');
  };

  return (
    <Navbar expand="sm" bg="white">
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
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/signup">회원가입</Nav.Link>
                <Nav.Link href="/user-login">로그인</Nav.Link>
              </Nav>
            ) : (
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/mypage">마이페이지</Nav.Link>
                {user.isTrainer === false ? (
                  <div>
                    <Nav.Link href="/trainer-list">트레이너목록</Nav.Link>
                    <Nav.Link href="/calendar">캘린더 및 피드백</Nav.Link>
                    <Nav.Link href="/pointcharge">보유포인트:{point}</Nav.Link>
                  </div>
                ) : (
                  <Nav.Link href="/customer-list">관리중인회원</Nav.Link>
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
