import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../../scss/calendar.scss';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import TabMenu from '../../components/myPage/TabMenu';
import TrainerDietTab from '../../components/trainerCalendar/TrainerDietTab';
import TrainerExerciseTab from '../../components/trainerCalendar/TrainerExerTab';
import TrainerFeedBackTab from '../../components/trainerCalendar/TrainerFeedBackTab';

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
      name: '피드백',
      content: (
        <TrainerFeedBackTab
          userid={userid}
          date={dateinfo.toLocaleDateString()}
        />
      ),
    }, // dateinfo 정보를 통해 axios로 해당 날짜의 피드백 데이터 넣으면 완료
  ];
  const selectMenuHandler = index => {
    clickTab(index);
  };
  return (
    <Container fluid className="panel">
      <div className="head">캘린더</div>
      <div className="calendarmg mgbt">
        <Calendar
          formatDay={(location, date) =>
            date.toLocaleDateString('en', { day: 'numeric' })
          }
          onChange={onChange}
          value={dateinfo}
        />
      </div>
      <TabMenu
        menuArr={menuArr}
        currentTab={currentTab}
        selectMenuHandler={selectMenuHandler}
      >
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
    </Container>
  );
}

export default TrainerCalendar;
