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

export default function BmiStatics({}) {
  const loginedUser = useSelector(state => state.user);
  const [requests, setRequests] = useState([]);
  const fetchRequests = async () => {
    axios
      .get(`https://localhost:4000/users/checkbodyinfo/${loginedUser.id}`, {
        withCredentials: true,
      })
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
        data={requests}
        x="date"
        y="bmi"
      />
      <VictoryAxis
        crossAxis
        width={300}
        height={300}
        domain={[0, requests.length]}
        theme={VictoryTheme.material}
        offsetY={30}
        standalone={false}
      />
      <VictoryAxis
        dependentAxis
        crossAxis
        width={300}
        height={300}
        domain={[0, 100]}
        theme={VictoryTheme.material}
        offsetX={30}
        standalone={false}
      />
    </VictoryChart>
  );
}
