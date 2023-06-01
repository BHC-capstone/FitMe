import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function DatePick({ getdata }) {
  const [value1, setValue] = useState([0, 0, 0, 0, 0, 0, 0]);
  useEffect(() => {
    getdata({ value1 });
  }, [value1]);
  const onChangeFirst = ({ e, value }) => {
    const temp = value1;
    const indexnum = value - 1;
    temp[indexnum] = value;
    setValue(temp);
    getdata({ value1 });
    // console.log(value1);
  };
  const onChangeSecond = ({ e, value }) => {
    const temp = value1;
    const indexnum = value - 1;
    temp[indexnum] = 0;
    setValue(temp);
    getdata({ value1 });
    // console.log(value1);
  };
  return (
    <ToggleButtonGroup className="mgtp" type="checkbox" value={value1}>
      <ToggleButton
        value={1}
        onClick={(e, value) =>
          value1[0] === 0
            ? onChangeFirst({ value: 1 })
            : onChangeSecond({ value: 1 })
        }
      >
        일
      </ToggleButton>
      <ToggleButton
        value={2}
        onClick={(e, value) =>
          value1[1] === 0
            ? onChangeFirst({ value: 2 })
            : onChangeSecond({ value: 2 })
        }
      >
        월
      </ToggleButton>
      <ToggleButton
        value={3}
        onClick={(e, value) =>
          value1[2] === 0
            ? onChangeFirst({ value: 3 })
            : onChangeSecond({ value: 3 })
        }
      >
        화
      </ToggleButton>
      <ToggleButton
        value={4}
        onClick={(e, value) =>
          value1[3] === 0
            ? onChangeFirst({ value: 4 })
            : onChangeSecond({ value: 4 })
        }
      >
        수
      </ToggleButton>
      <ToggleButton
        value={5}
        onClick={(e, value) =>
          value1[4] === 0
            ? onChangeFirst({ value: 5 })
            : onChangeSecond({ value: 5 })
        }
      >
        목
      </ToggleButton>
      <ToggleButton
        value={6}
        onClick={(e, value) =>
          value1[5] === 0
            ? onChangeFirst({ value: 6 })
            : onChangeSecond({ value: 6 })
        }
      >
        금
      </ToggleButton>
      <ToggleButton
        value={7}
        onClick={(e, value) =>
          value1[6] === 0
            ? onChangeFirst({ value: 7 })
            : onChangeSecond({ value: 7 })
        }
      >
        토
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
export default DatePick;
