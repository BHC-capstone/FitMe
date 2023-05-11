import { Card, Rate, Tag } from 'antd';
import React, { useState, useEffect } from 'react';
import { Container, Stack, Row, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../scss/cardLayout.scss';
import { useSelector } from 'react-redux';
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
        <Container>
          <h2>관리중인 회원 목록</h2>
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
                    placeholder="회원 이름 검색"
                  />
                </Form>
              </div>
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
