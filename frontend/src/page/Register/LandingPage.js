import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row, Card, Button } from 'react-bootstrap';

export default function LandingPage() {
  const navigate = useNavigate();

  const goUserSignUp = () => {
    navigate('/user-signup');
  };
  const goTrainerSignUp = () => {
    navigate('/trainer-signup');
  };
  const goLogin = () => {
    navigate('/user-login');
  };

  return (
    <Container fluid className="panel">
      <div className="head">회원가입</div>
      <Row>
        <Col>
          <Card body border="primary" className="text-center scard">
            <Card.Header className="h5">수강생 회원가입</Card.Header>
            <Card.Text className="c">
              PT를 수강하고 싶은 수강생 회원가입
            </Card.Text>
            <div>
              <Button variant="primary" onClick={goUserSignUp}>
                이동
              </Button>
            </div>
          </Card>
        </Col>
        <Col>
          <Card body border="secondary" className="text-center scard">
            <Card.Header className="h5">트레이너 회원가입</Card.Header>
            <Card.Text className="c">
              트레이너 자격에 대한 확인 및 승인이 필요한 회원가입
            </Card.Text>
            <div>
              <Button variant="secondary" onClick={goTrainerSignUp}>
                이동
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
      <br />
      <hr />
      <Button variant="link" type="button" onClick={goLogin}>
        이미 계정이 있나요?
      </Button>
    </Container>
  );
}
