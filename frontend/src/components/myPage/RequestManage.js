import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Collapse, Button, Avatar } from 'antd';
import axios from 'axios';
import styled from 'styled-components';
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
        ? await axios.get(`/request/checklists/${loginedUser.id}`, {
            withCredentials: true,
          })
        : await axios.get(`/request/checklists/${loginedUser.id}`, {
            withCredentials: true,
          });
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
      <Head1>PT요청 관리</Head1>
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

export default RequestManage;
