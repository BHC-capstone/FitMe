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
  const [requests, setRequests] = useState(null);

  const fetchRequests = async () => {
    const response = await axios.get(
      `https://fitme.p-e.kr:4000/administrator/usercount`,
    );
    setRequests(response.data.data);
    console.log(response.data.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  return (
    <VictoryChart height={300} width={300} theme={VictoryTheme.material}>
      <VictoryLine
        style={{
          data: { stroke: '#c43a31' },
          parent: { border: '1px solid #ccc' },
        }}
        data={[
          { x: 1, y: 2 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 4 },
          { x: 5, y: 7 },
          { x: 6, y: 7 },
        ]}
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
