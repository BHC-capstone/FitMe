import React, { useState, useEffect } from 'react';
import { Container, Stack, Row, Col, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Card, Rate } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function TrainerList(props) {
  const navigate = useNavigate();

  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/trainers/trainerlist').then(res => {
      setTrainers(res.data.data);
      console.log(res.data.data);
    });
  }, []);

  const [search, setSearch] = useState('');
  const onChange = e => {
    setSearch(e.target.value);
  };
  const filterTitle = trainers.filter(p => {
    return p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });
  const sortStarFunc = () => {
    const tempArray = Array.from(trainers);
    tempArray.sort((b, a) => a.id - b.id);
    setTrainers(tempArray);
  };
  return (
    <Layout>
      <Layout>
        <Container>
          <Head1>트레이너 목록</Head1>
        </Container>
        <Container fluid className="panel">
          <Stack gap={2}>
            <Row>
              <div>
                <Form>
                  <Form.Control
                    type="text"
                    value={search}
                    onChange={onChange}
                    placeholder="트레이너 이름 검색"
                  />
                </Form>
              </div>
            </Row>
            <Row>
              <Col sm>
                <Button type="button" variant="info">
                  홈트
                </Button>
              </Col>
              <Col sm>
                <Button type="button" variant="info">
                  헬스
                </Button>
              </Col>
              <Col sm>
                <Button
                  type="button"
                  className="sort_star"
                  variant="warning"
                  onClick={sortStarFunc}
                >
                  별점
                </Button>
              </Col>
            </Row>
          </Stack>
        </Container>
      </Layout>

      {filterTitle.map(trainer => (
        <div>
          <Card
            onClick={() => navigate(`/trainer-info/${trainer.id}`)}
            key={trainer.id}
            hoverable
            style={{ width: 300, margin: 20 }}
          >
            <Card.Meta
              title={trainer.name}
              description={
                <>
                  <p>Name : {trainer.name}</p>
                  <p>Age: {trainer.age}</p>
                  <p>Gender: {trainer.gender}</p>
                  <p>Introduction: {trainer.introduction}</p>
                  <Rate allowHalf defaultValue={trainer.rating} disabled />
                </>
              }
            />
          </Card>

          {/* <BoxOne onclick="location.href={'/trainer_info/'+${trainers.id}};">
            <article key={trainers.id}>
              <h3>
                {trainers.id}. {trainers.title}
              </h3>
              <p>{trainers.body}</p>
              <Link to={'/trainer_info/' + trainers.id}>
                <li>바로가기</li>
              </Link>
              <Link
                to={{
                  pathname: '/trainer_info/' + trainers.id,
                  state: { id: trainers.id },
                }}
              >
                바로가기2
              </Link>
            </article>
          </BoxOne> */}
        </div>
      ))}
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
// const BoxOne = styled.div`
//   background-color: #cf6a87;
//   width: 1000px;
//   height: 200px;
//   cursor: pointer;
// `;
const Head1 = styled.div`
  color: rgb(21, 20, 20);
  font-weight: bold;
  font-size: 30px;
  display: flex;
  text-align: center;
  align-items: center;
  width: fit-content;
  margin: 0 auto;
  padding: 20px;
`;
