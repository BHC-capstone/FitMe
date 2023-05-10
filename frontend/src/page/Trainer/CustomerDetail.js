import { Card, Tag, Input, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TagList from '../../components/TagList';

const { TextArea } = Input;

function CustomerDetail() {
  const { id } = useParams();
  const [customer, setCustomer] = useState({
    name: '',
    remainingPt: '',
    totalPt: '',
    memo: '',
  });
  const loginedUser = useSelector(state => state.user);

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/manage/checkptuserdetail/${id}/${loginedUser.id}`,
      )
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
      .post(`http://localhost:4000/manage/updatememo/${id}/${loginedUser.id}`, {
        memo: customer.memo,
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div>
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
                <TagList userId={id} />
              </p>
              <p style={{ fontWeight: 'bold', marginBottom: 0 }}>
                <div style={{ float: 'center' }}>회원메모</div>
                <Button
                  type="primary"
                  style={{ marginRight: 8, float: 'right' }}
                  onClick={() => handleMemoSubmit()}
                >
                  메모 저장
                </Button>
              </p>

              <TextArea
                value={customer.memo}
                autoSize={{ minRows: 4, maxRows: 10 }}
                style={{ marginBottom: 16 }}
                onChange={e =>
                  setCustomer({ ...customer, memo: e.target.value })
                }
              />
              <p />
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
