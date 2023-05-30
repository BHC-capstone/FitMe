import React from 'react';
import styled from 'styled-components';
import TrainerDiet from './TrainerDiet';

// eslint-disable-next-line react/prop-types
function TrainerDietTab({ userid, date }) {
  return (
    <Flexcontainers>
      <TrainerDiet userid={userid} date={date} />
    </Flexcontainers>
  );
}
const Flexcontainers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export default TrainerDietTab;
