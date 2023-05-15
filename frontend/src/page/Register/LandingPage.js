import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';

export default function LandingPage() {
  const navigate = useNavigate();

  const goUserSignUp = () => {
    navigate('/user-signup');
  };
  const goTrainerSignUp = () => {
    navigate('/trainer-signup');
  };

  return (
    <Layout>
      <Container className="panel">
        <Head1>회원가입</Head1>
        <Row>
          <Col>
            <Card1 body border="primary" className="text-center">
              <Card.Title tag="h5">일반 사용자 회원가입</Card.Title>
              <Card.Text>PT를 수강하고 싶은 고객 회원가입</Card.Text>
              <div>
                <Button variant="primary" onClick={goUserSignUp}>
                  이동
                </Button>
              </div>
            </Card1>
          </Col>
          <Col>
            <Card1 body border="secondary" className="text-center">
              <Card.Title tag="h5">트레이너 회원가입</Card.Title>
              <Card.Text>
                트레이너 자격에 대한 확인 및 승인이 필요한 회원가입
              </Card.Text>
              <div>
                <Button variant="secondary" onClick={goTrainerSignUp}>
                  이동
                </Button>
              </div>
            </Card1>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;

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

const Card1 = styled(Card)`
  width: fit-content;
  margin: 0 auto;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;
