import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Collapse } from 'antd';
import axios from 'axios';
import RequestTrainer from '../../components/master/RequestTrainer';
import RequestDetailCertification from '../../components/master/RequestDetailCertification';

const { Panel } = Collapse;
function MasterCertification() {
  const [requests, setRequests] = useState(null);
  const loginedUser = useSelector(state => state.user);

  const fetchRequests = async () => {
    const response = await axios.get(
      `https://localhost:4000/administrator/trainer/certificatelist`,
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
      <div className="head">트레이너 자격증 변경 요청</div>
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

export default MasterCertification;
