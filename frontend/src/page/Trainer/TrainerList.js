import React, { useState, useEffect } from 'react';
import {
  Container,
  Stack,
  Row,
  Col,
  Form,
  Button,
  ButtonGroup,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';
import styled from 'styled-components';
import { Card, Rate } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function TrainerList(props) {
  const navigate = useNavigate();

  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    axios
      .get('/trainers/trainerlist', {
        withCredentials: true,
      })
      .then(res => {
        setTrainers(res.data.data);
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
    <Container fluid className="panel">
      <div className="head">트레이너 목록</div>
      <div className="mglf-10">
        <Stack gap={2}>
          <Row>
            <Col xs="9">
              <Form>
                <Form.Control
                  type="text"
                  value={search}
                  onChange={onChange}
                  placeholder="트레이너 이름 검색"
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
                    {/* <Rate allowHalf defaultValue={trainer.rating} disabled /> */}
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
      </div>
    </Container>
  );
}
