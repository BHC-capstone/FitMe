import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Collapse } from 'antd';
import axios from 'axios';
import Request from './Request';
import RequestDetail from './RequestDetail';

const { Panel } = Collapse;
function RequestManage() {
  const [requests, setRequests] = useState(null);
  const loginedUser = useSelector(state => state.user);
  const isTrainer = loginedUser.isTrainer.toString();
  const fetchRequests = async () => {
    const response =
      isTrainer === 'true'
        ? await axios.get(
            `https://localhost:4000/request/checklists/${loginedUser.id}`,
            {
              withCredentials: true,
            },
          )
        : await axios.get(
            `https://localhost:4000/request/checklist/${loginedUser.id}`,
            {
              withCredentials: true,
            },
          );
    setRequests(response.data.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) {
    return <div>PT 요청 정보가 없습니다.</div>;
  }

  return (
    <div>
      <div className="head">PT요청 관리</div>
      {requests.map(request => (
        <Collapse style={{ marginBottom: 10 }}>
          <Panel
            header={<Request key={request.id} request={request} />}
            key="1"
          >
            <RequestDetail
              key={request.id}
              request={request}
              fetch={fetchRequests}
            />
          </Panel>
        </Collapse>
      ))}
    </div>
  );
}

export default RequestManage;
