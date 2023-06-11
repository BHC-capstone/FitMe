import React, { useState, useEffect } from 'react';
import { Container, Stack, Row, Col, Form, Button } from 'react-bootstrap';
import { Card } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function TrainerList(props) {
  const navigate = useNavigate();

  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    axios
      .get('https://localhost:4000/trainers/trainerlist', {
        withCredentials: true,
      })
      .then(res => {
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

  return (
    <Container fluid className="panel">
      <div className="head">트레이너 목록</div>
      <div className="list mglf-3">
        <Stack gap={2}>
          <Row>
            <Col xs="8">
              <Form>
                <Form.Control
                  type="text"
                  value={search}
                  onChange={onChange}
                  placeholder="트레이너 이름 입력"
                />
              </Form>
            </Col>
            <Col>
              <Button type="submit" variant="primary" onClick={onChange}>
                검색
              </Button>
            </Col>
          </Row>
          {/* <Row>
            <Col md="10">
              <ButtonGroup size="sm" aria-label="Basic example">
                <DropdownButton
                  as={ButtonGroup}
                  title="종류"
                  id="bg-nested-dropdown"
                >
                  <Dropdown.Item eventKey="1">홈트</Dropdown.Item>
                  <Dropdown.Item eventKey="2">헬스</Dropdown.Item>
                </DropdownButton>
                <Button
                  type="button"
                  className="sort_star"
                  variant="secondary"
                  onClick={sortStarFunc}
                >
                  별점
                </Button>
              </ButtonGroup>
            </Col>
          </Row> */}
        </Stack>
        {filterTitle.map(trainer => (
          <div className="list">
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
                    <p>트레이너 이름 : {trainer.name}</p>
                    <p>트레이너 나이: {trainer.age}세</p>
                    <p>트레이너 성별: {trainer.gender}</p>
                    <p>소개: {trainer.introduction}</p>
                    <p>PT 회당 가격:{trainer.pt_point}</p>
                  </>
                }
              />
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
}
