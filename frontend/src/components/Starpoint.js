import React, { useEffect, useState } from 'react';
import '../scss/starpoint.css';

// eslint-disable-next-line react/prop-types
function Starpoint({ starpoint }) {
  function onChange() {
    console.log(starpoint * 43);
    return starpoint * 43;
  }
  return (
    <span className="star">
      ★★★★★
      <span style={{ width: 215 }}>★★★★★</span>
    </span>
  );
}
export default Starpoint;
