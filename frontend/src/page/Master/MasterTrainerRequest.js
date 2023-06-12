import React, { useEffect, useState } from 'react';
import { Collapse } from 'antd';
import axios from 'axios';
import RequestDetailTrainer from '../../components/master/RequestDetailTrainer';
import RequestTrainer from '../../components/master/RequestTrainer';

const { Panel } = Collapse;

function MasterTrainerRequest() {
  const [requests, setRequests] = useState(null);

  const fetchRequests = async () => {
    const response = await axios.get(
      `https://fitme.p-e.kr:4000/administrator/trainerlist`,
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
      <div className="head">트레이너 회원가입 요청</div>
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

export default MasterTrainerRequest;
