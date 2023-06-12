import React, { useState } from 'react';
import { Container, Button, Form, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MasterLogin() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = () => {
    axios({
      method: 'post',
      url: 'https://localhost:4000/administrator/login',
      data: {
        password,
      },
    }).then(response => {
      if (response.status === 200) {
        alert(response.data.message);
        navigate('/master-main');
      } else {
        alert(response.data.message);
      }
    });
  };

  return (
    <Container fluid className="panel">
      <div className="head">관리자 로그인</div>
      <div className="body">
        <div className="input">
          <Form>
            <FloatingLabel
              controlId="floatingInput"
              label="인증번호"
              className="mb-3"
              style={{
                width: '40%',
                margin: 'auto',
              }}
            >
              <Form.Control
                id="password"
                type="password"
                placeholder="인증번호를 입력하세요."
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </FloatingLabel>
          </Form>
        </div>
        <div className="button">
          <Button type="submit" onClick={onSubmit}>
            인증하기
          </Button>
        </div>
      </div>
    </Container>
  );
}
export default MasterLogin;
