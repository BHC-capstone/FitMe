import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card } from 'react-bootstrap';
import styled from 'styled-components';
import WeightStatics from './WeightStatistics';
import BmiStatics from './BmiStatistics';

function StatisticsTab() {
  const [statistics, setStatistics] = useState(null);
  useEffect(() => {
    setStatistics({
      weightGraph: <WeightStatics />,
      exerciseHistory: <BmiStatics />,
    });
  }, []);

  //   useEffect(() => {
  //     const fetchStatistics = async () => {
  //       const response = await axios.get('/api/statistics');
  //       setStatistics(response.data);
  //     };
  //     fetchStatistics();
  //   }, []);

  if (!statistics) {
    return <div>통계 Loading...</div>;
  }

  return (
    <Container>
      {/* <h2>통계페이지</h2> */}
      <StyledCard>
        <Card.Header as="h5">몸무게 그래프</Card.Header>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            지난 한달간 추이
          </Card.Subtitle>
          <Card.Text>{statistics.weightGraph}</Card.Text>
        </Card.Body>
      </StyledCard>
      <StyledCard>
        <Card.Header as="h5">BMI 그래프</Card.Header>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            지난 한달간 추이
          </Card.Subtitle>
          <Card.Text>{statistics.exerciseHistory}</Card.Text>
        </Card.Body>
      </StyledCard>

      {/* <Card body>몸무게 그래프: {statistics.weightGraph}</Card>
      <Card body>운동 기록: {statistics.exerciseHistory}</Card>
      <Card body>식단 기록: {statistics.mealHistory}</Card> */}
    </Container>
  );
}

const StyledCard = styled(Card)`
  font-family: 'Gowun Dodum', sans-serif;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
`;

export default StatisticsTab;
