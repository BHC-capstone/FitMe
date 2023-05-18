import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../../scss/calendar.scss';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import TrainerDietTab from '../../components/trainerCalendar/TrainerDietTab';
import FeedbackTab from '../../components/FeedbackTab';
import TrainerExerciseTab from '../../components/trainerCalendar/TrainerExerTab';

function TrainerCalendar() {
  const { userid } = useParams();
  const [dateinfo, onChange] = useState(new Date());
  const [currentTab, clickTab] = useState(0);
  const menuArr = [
    {
      name: '식단',
      content: (
        <TrainerDietTab userid={userid} date={dateinfo.toLocaleDateString()} />
      ),
    }, // dateinfo 정보를 통해 axios로 해당 날짜의 식단 데이터 넣으면 완료
    {
      name: '운동 루틴',
      // content: <ExerciseTab userid={userid} date={dateinfo} />,
      content: (
        <TrainerExerciseTab
          userid={userid}
          date={dateinfo.toLocaleDateString()}
        />
      ),
    }, // dateinfo 정보를 통해 axios로 해당 날짜의 운동 루틴 데이터 넣으면 완료
    {
      name: '트레이너 피드백	',
      content: <FeedbackTab userid={userid} date={dateinfo} />,
    }, // dateinfo 정보를 통해 axios로 해당 날짜의 피드백 데이터 넣으면 완료
  ];
  const selectMenuHandler = index => {
    clickTab(index);
  };
  return (
    <Container fluid className="panel">
      <Head1>캘린더</Head1>
      <Div1>
        <Calendar
          formatDay={(location, date) =>
            date.toLocaleDateString('en', { day: 'numeric' })
          }
          onChange={onChange}
          value={dateinfo}
        />
      </Div1>
      <Div />
      <TabMenu>
        {menuArr.map((el, index) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <li
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={index === currentTab ? 'submenu focused' : 'submenu'}
            onClick={() => selectMenuHandler(index)}
            onKeyDown={() => selectMenuHandler(index)}
          >
            {el.name}
          </li>
        ))}
      </TabMenu>
      <Desc>
        <div>{menuArr[currentTab].content}</div>
      </Desc>
    </Container>
  );
}

const TabMenu = styled.ul`
  background-color: #ffffff;
  color: rgb(21, 20, 20);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  margin-bottom: 30px;
  margin-top: 10px;
  border-bottom: solid 1px;
  border-bottom-color: #d1d1d1;

  .submenu {
    display: flex;
    justify-content: space-around;
    width: 390px;
    height: 40px; */
    width: calc(50% / 3);
    padding: 10px;
    font-size: 15px;
    transition: 0.5s;
    border-radius: 10px 10px 0px 0px;
  }

  .focused {
    color: #fff;
    background-color: #2ba5f7;
  }

  & div.desc {
    text-align: center;
  }
`;
const Head1 = styled.div`
  color: rgb(21, 20, 20);
  font-family: 'Black Han Sans', sans-serif;
  font-size: 30px;
  display: flex;
  text-align: center;
  align-items: center;
  width: fit-content;
  margin: 0 auto;
  padding: 10px;
`;
const Div = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;
const Div1 = styled.div`
  margin-left: 8%;
`;
const Desc = styled.div`
  text-align: center;
`;
export default TrainerCalendar;
