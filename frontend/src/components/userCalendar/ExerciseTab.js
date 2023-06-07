import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Routine from './Routine';

// eslint-disable-next-line react/prop-types
function ExerciseTab({ userid, date }) {
  const [exerdate, setExerdate] = useState([]);
  // {index === currentTab ? 'submenu focused' : 'submenu'}
  const navigate = useNavigate();
  // 해당 링크로 이동, 여기서는
  const navigateToRequest = ({ link }) => {
    navigate(`${link}`);
  };
  useEffect(() => {
    setExerdate([]);
    axios
      .get(
        `https://localhost:4000/calender/exerciseroutine/${userid}/${date}`,
        {
          withCredentials: true,
        },
      )
      .then(res => {
        setExerdate(res.data.data);
      });
  }, [userid, date]);
  // 운동 루틴이 배열로 제공 된다고 가정하면 map 함수를 상위에 추가하여 밑의 컴포넌트들을 본문으로 사용할 예정
  function onVideoSubmit(videoInput, routineid) {
    const formData = new FormData();
    formData.append('video', videoInput.current.files[0]);
    axios({
      url: `https://localhost:4000/calender/exercisevideo/${userid}/${routineid}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      method: 'POST',
      withCredentials: true,
    })
      .then(response => {
        axios
          .get(
            `https://localhost:4000/calender/exerciseroutine/${userid}/${date}`,
            {
              withCredentials: true,
            },
          )
          .then(res => {
            setExerdate(res.data.data);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
  function onVideoRemove(routineid) {
    axios({
      url: `https://localhost:4000/calender/exerciseVideodelete/${routineid}`,
      method: 'DELETE',
      withCredentials: true,
    })
      .then(response => {
        axios
          .get(
            `https://localhost:4000/calender/exerciseroutine/${userid}/${date}`,
            {
              withCredentials: true,
            },
          )
          .then(res => {
            setExerdate(res.data.data);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <Flexcontainers>
      {exerdate.map((el, index) => (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <Routine
          num={index}
          exercisename={el.name}
          content={el.content}
          time={el.exercise_count}
          set={el.set_count}
          exerciseURL={el.user_video_url}
          guideURL={el.guide_video_url}
          userid={userid}
          routineid={el.id}
          onVideoSubmit={onVideoSubmit}
          onVideoRemove={onVideoRemove}
        />
      ))}
    </Flexcontainers>
  );
}
const Flexcontainers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export default ExerciseTab;
