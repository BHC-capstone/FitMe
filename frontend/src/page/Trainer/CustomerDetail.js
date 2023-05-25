import { Card, Tag, Form, Input, Select } from 'antd';
import { Container, Button, ButtonGroup, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import TagList from '../../components/TagList';

const { TextArea } = Input;

function CustomerDetail() {
  const [tags, setTags] = useState(0);
  const { id } = useParams();
  const [customer, setCustomer] = useState({
    name: '',
    remainingPt: '',
    totalPt: '',
    memo: '',
  });
  const loginedUser = useSelector(state => state.user);
  const [form] = Form.useForm();
  const [color, setColor] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`/manage/checkptuserdetail/${id}/${loginedUser.id}`)
      .then(response => {
        setCustomer({
          name: response.data.data.user_id,
          remainingPt: response.data.data.remain_pt_count,
          totalPt: response.data.data.total_pt_count,
          memo: response.data.data.manage_memo,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function handleMemoSubmit(event) {
    axios
      .post(`/manage/updatememo/${id}/${loginedUser.id}`, {
        memo: customer.memo,
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
  const onColorChange = value => {
    switch (value) {
      case '건강':
        setColor('orange');
        break;
      case '알러지':
        setColor('red');
        break;
      case '기타':
        setColor('brown');
        break;
      default:
    }
  };

  const onFinish = values => {
    axios
      .post(`/manage/maketag/${id}/${loginedUser.id}`, {
        tag_name: values['tag name'],
        tag_color: color,
      })
      .then(response => {
        console.log(response);
        setTags(tags + 1);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Container className="panel">
      <Head1>회원 메모</Head1>
      <Card>
        <Card.Meta
          title={customer.name}
          description={
            <>
              <p style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <span style={{ fontWeight: 'bold' }}>
                  남은 PT: {customer.remainingPt} / {customer.totalPt}
                </span>{' '}
              </p>
              <p>
                <Form onFinish={onFinish}>
                  <p style={{ fontWeight: 'bold', marginBottom: 0 }}>
                    <div
                      style={{
                        float: 'center',
                        color: 'gray',
                        fontFamily: 'Gowun Dodum',
                        marginBottom: '10px',
                      }}
                    >
                      태그 추가
                    </div>
                  </p>
                  <Row>
                    <Col xs="8">
                      <Form.Item name="tag name" rules={[{ required: true }]}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs="4">
                      <Form.Item name="tag color" rules={[{ required: true }]}>
                        <Select
                          placeholder="종류 선택"
                          onChange={onColorChange}
                          allowClear
                        >
                          <Select.Option value="건강">건강</Select.Option>
                          <Select.Option value="알러지">알러지</Select.Option>
                          <Select.Option value="기타">기타</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      추가
                    </Button>
                  </Form.Item>
                </Form>
              </p>
              <p>
                <TagList userId={id} closeable tagcount={tags} />
              </p>
              <p style={{ fontWeight: 'bold', marginBottom: 0 }}>
                <div
                  style={{
                    float: 'center',
                    fontFamily: 'Gowun Dodum',
                    marginBottom: '10px',
                  }}
                >
                  회원 메모
                </div>
                <TextArea
                  value={customer.memo}
                  autoSize={{ minRows: 4, maxRows: 10 }}
                  style={{ marginBottom: 16 }}
                  onChange={e =>
                    setCustomer({ ...customer, memo: e.target.value })
                  }
                />
                <Button variant="primary" onClick={() => handleMemoSubmit()}>
                  저장
                </Button>
              </p>
              <p />
              <Button
                variant="secondary"
                onClick={() => navigate(`/trainercalendar/${id}`)}
              >
                캘린더로 이동
              </Button>
            </>
          }
        />
      </Card>
    </Container>
  );
}

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

export default CustomerDetail;
