import React from 'react';
import '../scss/starpoint.scss';

// eslint-disable-next-line react/prop-types
function Starpoint({ starpoint }) {
  return (
    <span className="star">
      ★★★★★
      <span style={{ width: starpoint * 41.3 }}>★★★★★</span>
    </span>
  );
}
export default Starpoint;

/* import React, { useState } from 'react';

import { Rating } from 'react-simple-star-rating';
import styled from 'styled-components';

export default function StarPoint({ starpoint }) {
  return (
    <div className="App">
      <Ratingstar initialValue={starpoint} size={25} readonly />
    </div>
  );
}

const Ratingstar = styled(Rating)`
  display: flex;
  justify-content: flex-start;
  float: left;
  border: 2px solid;
`; */
