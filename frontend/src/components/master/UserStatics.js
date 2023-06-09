import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  Text,
  TextSize,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
} from 'victory';
import axios from 'axios';

export default function UserStatics({}) {
  const [requests, setRequests] = useState([]);
  const [data, setData] = useState([]);
  const fetchRequests = async () => {
    const response = await axios.get(
      `https://fitme.p-e.kr:4000/administrator/usercount`,
    );
    setRequests(response.data.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <VictoryChart height={300} width={300} theme={VictoryTheme.material}>
      <VictoryLine
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
        interpolation="natural"
        style={{
          data: { stroke: '#2ba5f7', strokeWidth: 3, strokeLinecap: 'round' },
          parent: { border: '1px solid #ccc' },
        }}
        data={requests.userCounts}
        x="weekend"
        y="count"
      />
      <VictoryAxis
        crossAxis
        width={300}
        height={300}
        domain={[0, 10]}
        theme={VictoryTheme.material}
        offsetY={30}
        standalone={false}
      />
      <VictoryAxis
        dependentAxis
        crossAxis
        width={300}
        height={300}
        domain={[0, 10]}
        theme={VictoryTheme.material}
        offsetX={30}
        standalone={false}
      />
    </VictoryChart>
  );
}
