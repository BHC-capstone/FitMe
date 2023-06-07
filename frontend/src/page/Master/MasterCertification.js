import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Collapse, Button, Avatar } from 'antd';
import axios from 'axios';
import styled from 'styled-components';
import RequestTrainer from '../../components/master/RequestTrainer';
import RequestDetailCertification from '../../components/master/RequestDetailCertification';

const { Panel } = Collapse;
function MasterCertification() {
  const [requests, setRequests] = useState(null);
  const loginedUser = useSelector(state => state.user);

  const fetchRequests = async () => {
    const response = await axios.get(
      `https://fitme.p-e.kr:4000/administrator/trainer/certificatelist`,
    );
    setRequests(response.data.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) {
    return <div>남은 자격증 변경 요청이 없습니다.</div>;
  }

  return (
    <div>
      <Head1> 트레이너 자격증 변경 요청</Head1>
      {requests.map(request => (
        <Collapse style={{ marginBottom: 10 }}>
          <Panel
            header={<RequestTrainer key={request.id} request={request} />}
            key="1"
          >
            <RequestDetailCertification
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

export default MasterCertification;
