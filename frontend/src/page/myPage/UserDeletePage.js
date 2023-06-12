import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Form, Button, Stack, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
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
          ? (url = `https://fitme.p-e.kr:4000/users/withdraw/${loginedUser.id}`)
          : (url = `https://fitme.p-e.kr:4000/trainers/withdraw/${loginedUser.id}`);
      }
      const response = await axios.post(
        url,
        {
          password,
        },
        {
          withCredentials: true,
        },
      );
      alert(response.data.message);
      dispatch(logoutUser());
      navigate('/login');
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const deleteCancel = () => {
    navigate('/mypage');
  };

  return (
    <Container fluid className="panel">
      <div className="head">회원 탈퇴</div>
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
          <Button
            type="button"
            variant="secondary"
            className="mgtp"
            onClick={deleteCancel}
          >
            취소하기
          </Button>
          <hr />
          <Button variant="danger" type="submit">
            회원탈퇴
          </Button>
        </Form>
      </Stack>
    </Container>
  );
}

export default WithdrawPage;
