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
import { useSelector } from 'react-redux';

export default function UserStatics({}) {
  const loginedUser = useSelector(state => state.user);
  const [requests, setRequests] = useState([]);
  const fetchRequests = async () => {
    axios
      .get(`https://fitme.p-e.kr:4000/administrator/usercount`)
      .then(response => {
        setRequests(response.data.data);
        console.log('잘 가져옴', response.data.data);
      })
      .catch(error => {
        console.log('에러', error);
      });
    console.log('저장 ', requests);
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
        data={requests.userCounts}
        x="weekend"
        y="count"
      />
      <VictoryAxis
        crossAxis
        width={350}
        height={350}
        domain={[0, 10]}
        theme={VictoryTheme.material}
        offsetY={30}
        standalone={false}
        label="주차"
        style={{
          axis: { stroke: '#756f6a' },
          axisLabel: { fontSize: 10, padding: 20 },
        }}
      />
      <VictoryAxis
        dependentAxis
        crossAxis
        width={350}
        height={350}
        domain={[0, 10]}
        theme={VictoryTheme.material}
        offsetX={30}
        standalone={false}
        label="가입 인원 수"
        style={{
          axis: { stroke: '#756f6a' },
          axisLabel: { fontSize: 10, padding: 20 },
        }}
      />
    </VictoryChart>
  );
}
