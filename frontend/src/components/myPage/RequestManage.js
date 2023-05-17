import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Collapse, Avatar } from 'antd';
import { Container, Button, ButtonGroup, Table } from 'react-bootstrap';
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
      <h1>PT 요청 확인</h1>

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

const StyledTable = styled(Table)`
  // width: 400px;
  text-align: center;
  item-align: center;
  vertical-align: middle;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  justify-content: space-between;
`;

export default RequestManage;
