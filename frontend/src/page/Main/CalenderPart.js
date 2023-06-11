import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Calendar from 'react-calendar';
import '../../scss/calendar.scss';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import TabMenu from '../../components/myPage/TabMenu';
import FeedbackTab from '../../components/userCalendar/FeedbackTab';
import DietTab from '../../components/userCalendar/DietTab';
import ExerciseTab from '../../components/userCalendar/ExerciseTab';

function CalendarPart() {
  const loginedUser = useSelector(state => state.user);
  const [dateinfo, onChange] = useState(new Date());
  const [startdateinfo, onChangeStart] = useState(new Date());
  const [enddateinfo, onChangeEnd] = useState(new Date());
  const [currentTab, clickTab] = useState(0);
  const userid = loginedUser.id;
  const [ptinfo, setPtInfo] = useState([]);
  const year = dateinfo.getFullYear();
  const month = dateinfo.getMonth() + 1;
  const day = dateinfo.getDate();
  const formattedDate = `${year}-${month}-${day}`;

  const menuArr = [
    {
      name: '식단',
      content: <DietTab userid={userid} date={formattedDate} />,
    }, // dateinfo 정보를 통해 axios로 해당 날짜의 식단 데이터 넣으면 완료
    {
      name: '운동 루틴',
      content: <ExerciseTab userid={userid} date={formattedDate} />,
    }, // dateinfo 정보를 통해 axios로 해당 날짜의 운동 루틴 데이터 넣으면 완료
    {
      name: '피드백',
      content: (
        <FeedbackTab userid={userid} date={dateinfo.toLocaleDateString()} />
      ),
    }, // dateinfo 정보를 통해 axios로 해당 날짜의 피드백 데이터 넣으면 완료
  ];
  useEffect(() => {
    axios({
      method: 'get',
      url: `https://localhost:4000/request/date/${userid}`,
      withCredentials: true,
    }).then(response => {
      const { data } = response.data;
      setPtInfo(data);
      const tempday1 = new Date(data.start);
      const tempday2 = new Date(data.start);
      onChangeEnd(new Date(data.end));
      onChangeStart(tempday2.setDate(tempday1.getDate() - 1));
    });
  }, []);
  const selectMenuHandler = index => {
    clickTab(index);
  };

  return (
    <Container fluid className="panel">
      <div className="head">캘린더</div>
      <div className="mgauto mglf-5 mgbt">
        <Calendar
          formatDay={(location, date) =>
            date.toLocaleDateString('en', { day: 'numeric' })
          }
          onChange={onChange}
          tileDisabled={({ date }) =>
            date < startdateinfo || date > enddateinfo
          }
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

export default CalendarPart;
