import React, { useState } from 'react';
import { Descriptions } from 'antd';

function Request({ request }) {
  const simple = (
    <Descriptions title={request.name}>
      <Descriptions.Item label="회원 이름">{request.name}</Descriptions.Item>
      <Descriptions.Item label="pt횟수">{request.count}</Descriptions.Item>
      <Descriptions.Item label="목적">{request.purpose}</Descriptions.Item>
    </Descriptions>
  );
  const print = simple;
  return <div>{print}</div>;
}

export default Request;
