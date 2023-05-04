import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StatisticsTab() {
  const [statistics, setStatistics] = useState(null);
  useEffect(() => {
    setStatistics({
      weightGraph: '그래프',
      exerciseHistory: '운동기록',
      mealHistory: '식단기록',
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
    <div className="statistics-tab">
      <h2>통계페이지</h2>
      <p>몸무게 그래프: {statistics.weightGraph}</p>
      <p>운동 기록: {statistics.exerciseHistory}</p>
      <p>식단 기록: {statistics.mealHistory}</p>
    </div>
  );
}

export default StatisticsTab;
