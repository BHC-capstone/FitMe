import React, { useState } from 'react';
import { Descriptions } from 'antd';

function RequestTrainer({ request }) {
  const simple = <Descriptions title={request.name} />;
  const print = simple;
  return <div>Trainer {print}</div>;
}

export default RequestTrainer;
