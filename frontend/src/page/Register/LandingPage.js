import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function LandingPage() {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const goUserSignUp = () => {
    navigate('/user-signup');
  };
  const goTrainerSignUp = () => {
    navigate('/trainer-signup');
  };
  const goLogin = () => {
    navigate('/user-login');
  };

  const handleRedirect = () => {
    if (user.isLogin) {
      if (user.isTrainer) {
        navigate('/customer-list');
      } else {
        navigate('/trainer-list');
      }
    }
  };

  useEffect(() => {
    handleRedirect();
  }, [user]);

  return (
    <Container fluid className="panel">
      <div className="head">회원가입</div>
      <Row>
        <Col>
          <Card body border="primary" className="text-center scard">
            <Card.Header className="h5">수강생 회원가입</Card.Header>
            <Card.Text className="c">
              서비스를 이용하고 PT를 수강하고 싶은 수강생 회원가입
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
            <Card.Header className="h4">트레이너 회원가입</Card.Header>
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
