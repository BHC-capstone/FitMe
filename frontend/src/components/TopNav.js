import React from 'react';
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from './myPage/LogoutButton';

export default function TopNav() {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const goLogin = () => {
    navigate('/user-login');
  };
  const goSignup = () => {
    navigate('/signup');
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
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-sm">
              <img src="/fitmelogo.svg" width="100" alt="FitMe logo" />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {user.isLogin === false ? (
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/signup">서비스 소개</Nav.Link>
                <Nav.Link href="/signup">회원가입</Nav.Link>
                <Nav.Link href="/user-login">로그인</Nav.Link>
              </Nav>
            ) : (
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/signup">서비스 소개</Nav.Link>
                <Nav.Link href="/mypage">마이페이지</Nav.Link>
                <Nav.Link onClick={<LogoutButton />}>로그아웃</Nav.Link>
              </Nav>
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
