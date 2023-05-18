import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Form, Button, Stack, FloatingLabel } from 'react-bootstrap';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logoutUser } from '../../redux/_reducers/userSlice';

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
          ? (url = `https://localhost:4000/users/withdraw/${loginedUser.id}`)
          : (url = `https://localhost:4000/trainers/withdraw/${loginedUser.id}`);
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
    <Container className="panel">
      <Head1>회원 탈퇴</Head1>
      <Stack gap={2} className="col-md-5 mx-auto">
        <Form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="비밀번호"
            className="mb-3"
          >
            <Form.Control
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={handleInputChange}
              required
            />
          </FloatingLabel>
          <Link to="/mypage">
            <Button type="button" variant="secondary">
              취소하기
            </Button>
          </Link>
          <StyledButton variant="danger" type="submit">
            회원탈퇴
          </StyledButton>
        </Form>
      </Stack>
    </Container>
  );
}

export default WithdrawPage;

const Head1 = styled.div`
  color: rgb(21, 20, 20);
  font-family: 'Black Han Sans', sans-serif;
  font-size: 30px;
  display: flex;
  text-align: center;
  align-items: center;
  width: fit-content;
  margin: 0 auto;
  padding: 10px;
`;
const StyledButton = styled(Button)`
  margin-left: 10px;
`;
