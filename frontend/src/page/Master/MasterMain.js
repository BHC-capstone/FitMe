import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import TabMenu from '../../components/myPage/TabMenu';
import MasterCertification from './MasterCertification';
import MasterTrainerRequest from './MasterTrainerRequest';
import MasterStatics from './MasterStatics';

function MasterMain() {
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    {
      name: '트레이너 신청',
      content: <MasterTrainerRequest />,
    }, // dateinfo 정보를 통해 axios로 해당 날짜의 식단 데이터 넣으면 완료
    {
      name: '자격증 신청',
      content: <MasterCertification />,
    }, // dateinfo 정보를 통해 axios로 해당 날짜의 운동 루틴 데이터 넣으면 완료
    {
      name: '통계',
      content: <MasterStatics />,
    }, // dateinfo 정보를 통해 axios로 해당 날짜의 피드백 데이터 넣으면 완료
  ];

  const selectMenuHandler = index => {
    clickTab(index);
  };

  return (
    <Container fluid className="panel">
      <div className="head">관리자 페이지</div>
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

export default MasterMain;
