import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Collapse, Button, Avatar } from 'antd';
import axios from 'axios';
import styled from 'styled-components';
import RequestDetailTrainer from '../../components/master/RequestDetailTrainer';
import RequestTrainer from '../../components/master/RequestTrainer';

const { Panel } = Collapse;
function MasterTrainerRequest() {
  const [requests, setRequests] = useState(null);
  const loginedUser = useSelector(state => state.user);

  const fetchRequests = async () => {
    const response = await axios.get(
      `https://localhost:4000/administrator/trainerlist`,
    );
    setRequests(response.data.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) {
    return <div>남은 Trainer 회원가입 요청이 없습니다.</div>;
  }

  return (
    <div>
      <Head1> 트레이너 회원가입 요청</Head1>
      {requests.map(request => (
        <Collapse style={{ marginBottom: 10 }}>
          <Panel
            header={<RequestTrainer key={request.id} request={request} />}
            key="1"
          >
            <RequestDetailTrainer
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

export default MasterTrainerRequest;
