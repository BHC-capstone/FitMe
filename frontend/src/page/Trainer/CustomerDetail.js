import { Card, Tag, Input, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TagList from '../../components/TagList';

const { TextArea } = Input;

function CustomerDetail() {
  const [customer, setCustomer] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get(`/trainer/customers/${loginedUser.id}`)
  //     .then(response => {
  //       setCustomer(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, [loginedUser.id]);

  useEffect(() => {
    const fetchCustomer = async () => {
      setCustomer({
        name: '김민수',
        remainingPt: 10,
        totalPt: 20,
        memo: '메모입니다.',
      });
    };
    fetchCustomer();
  }, []);
  const { name, remainingPt, totalPt, memo } = customer ?? {};

  return (
    <div>
      <Card>
        <Card.Meta
          title={name}
          description={
            <>
              <p style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <span style={{ fontWeight: 'bold' }}>
                  남은 PT: {remainingPt} / {totalPt}
                </span>{' '}
              </p>
              <p>
                <TagList />
              </p>
              <p style={{ fontWeight: 'bold', marginBottom: 0 }}>회원메모</p>
              <TextArea
                value={memo}
                autoSize={{ minRows: 4, maxRows: 10 }}
                style={{ marginBottom: 16 }}
                onChange={e => setCustomer({ memo: e.target.value })}
              />
              <Button type="primary" style={{ marginRight: 8 }}>
                캘린더
              </Button>
              <Button>피드백</Button>
              <Button type="danger" style={{ marginLeft: 'auto' }}>
                회원관리
              </Button>
            </>
          }
        />
      </Card>
    </div>
  );
}

export default CustomerDetail;
