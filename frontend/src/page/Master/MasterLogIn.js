import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Input } from 'antd';
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
          <Input
            type="password"
            placeholder="인증번호를 입력하세요"
            value={password}
            style={{
              width: '40%',
              margin: '3%',
            }}
            onChange={e => setPassword(e.target.value)}
          />
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
