import { Card, Rate, Tag } from 'antd';
import React, { useState, useEffect } from 'react';
import { Container, Stack, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../scss/cardLayout.scss';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import TagList from '../../components/TagList';

function CustomerList() {
  const loginedUser = useSelector(state => state.user);
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    axios
      .get(`https://localhost:4000/manage/checkptuserlist/${loginedUser.id}`)
      .then(res => {
        setCustomers(res.data.data);
      });
  }, []);

  const [search, setSearch] = useState('');
  const onChange = e => {
    setSearch(e.target.value);
  };
  const filterTitle = customers.filter(p => {
    // return p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    return p.user_id;
  });
  return (
    <div className="cardLayout">
      <div className="cardLayout">
        <Container fluid className="panel">
          <Head1>관리중인 회원 목록</Head1>
          <Stack gap={2}>
            <Row className="justify-content-md-center">
              <Col md="10">
                <Form>
                  <Form.Control
                    type="text"
                    value={search}
                    onChange={onChange}
                    placeholder="트레이너 이름 검색"
                  />
                </Form>
              </Col>
            </Row>
          </Stack>
        </Container>
      </div>

      {filterTitle.map(customer => (
        <div>
          <Card
            onClick={() => navigate(`/customer-management/${customer.user_id}`)}
            key={customer.id}
            hoverable
            style={{ width: 300, margin: 20 }}
          >
            <Card.Meta
              //   title={customer.name}
              description={
                <>
                  <p
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <span style={{ fontWeight: 'bold' }}>이름:</span>{' '}
                    {customer.user_id}
                    <span style={{ fontWeight: 'bold', marginLeft: '1rem' }}>
                      남은 pt 횟수:
                    </span>{' '}
                    {customer.remain_pt_count}
                  </p>
                  <p>
                    <TagList userId={customer.user_id} closeable={false} />
                  </p>
                  <p
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <span style={{ fontWeight: 'bold' }}>
                      최근 피드백 일자:
                    </span>{' '}
                    {customer.last_feedback_date}
                  </p>
                  <p
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <span style={{ fontWeight: 'bold' }}>최근 운동 일자:</span>{' '}
                    {customer.last_exercise_date}
                  </p>
                </>
              }
            />
            {/* <Card.Meta
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
            /> */}
          </Card>
        </div>
      ))}
    </div>
  );
}
export default CustomerList;

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
