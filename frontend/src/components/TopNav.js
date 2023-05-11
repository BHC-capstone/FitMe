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

export default function TopNav() {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  return (
    <Navbar expand="lg" variant="light" bg="light">
      <Container fluid>
        <Navbar.Brand href="/">FitMe</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {user.isLogin === false ? (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto my-2 my-lg-0" />
            <Nav.Link className="me-2" href="/login">
              <Button variant="info">로그인</Button>
            </Nav.Link>
            <Nav.Link className="me-2" href="/signup">
              <Button variant="warning">회원가입</Button>
            </Nav.Link>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto my-2 my-lg-0" />
            <Nav.Link className="me-2" href="/mypage">
              <Button variant="info">마이페이지</Button>
            </Nav.Link>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}
