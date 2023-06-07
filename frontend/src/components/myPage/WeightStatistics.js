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

export default function WeightStatics({}) {
  const loginedUser = useSelector(state => state.user);
  const [requests, setRequests] = useState([]);
  const fetchRequests = async () => {
    axios
      .get(`https://localhost:4000/users/checkbodyinfo/${loginedUser.id}`, {
        withCredentials: true,
      })
      .then(response => {
        setRequests(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
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
        data={[]}
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
