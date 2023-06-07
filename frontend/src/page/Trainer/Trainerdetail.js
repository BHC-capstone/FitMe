/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import TabMenu from '../../components/TabMenu';
import TrainerProfileDisplay from './TrainerProfileDisplay';

function Trainerdetail() {
  const navigate = useNavigate();
  const blankImg = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`;

  const { id } = useParams();
  const [trainer, setTrainer] = useState({});
  const [currentTab, clickTab] = useState(0);
  const [profImg, setProfImg] = useState(blankImg);

  const menuArr = [
    { name: '자기 소개', content: `${trainer.introduction}` },
    { name: '프로필', content: <TrainerProfileDisplay trainerId={id} /> },
  ];

  const selectMenuHandler = index => {
    // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
    // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
    clickTab(index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trainerResponse = await axios.get(
          `https://localhost:4000/trainers/profile/${id}`,
          {
            withCredentials: true,
          },
        );
        const imgResponse = await axios.get(
          `https://localhost:4000/trainers/profileimg/${id}`,
          {
            withCredentials: true,
          },
        );
        const { data: trainerData } = trainerResponse.data;
        const { data: imgData } = imgResponse.data;
        console.log(trainerData);
        setTrainer(trainerData);
        if (imgData === null) {
          setProfImg(blankImg);
        } else {
          setProfImg(imgData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const navigateToRequest = () => {
    navigate(`/ptrequest/${id}`);
  };

  return (
    <Container fluid className="panel">
      <div className="head">트레이너 소개</div>
      <div className="upbox">
        <div>
          <img
            src={profImg}
            className="imageposition"
            style={{ zIndex: 2 }}
            alt="트레이너 프로필 이미지"
          />
        </div>
        <div className="box1">
          <text className="nameblock">
            <text className="nameblock a">{trainer.name}</text>
            <text className="nameblock b">
              {trainer.gender} {trainer.age}세
            </text>
          </text>
        </div>
        <div className="box2">
          <text className="emailblock">
            <span className="b">E-mail :</span>
            {trainer.email}
          </text>
          <text className="emailblock">
            <span className="b">H.P :</span>
            {trainer.phonenumber}
          </text>
          <Button
            variant="secondary"
            className="flrg mgtp"
            onClick={navigateToRequest}
          >
            PT 신청
          </Button>
        </div>
      </div>
      <TabMenu
        menuArr={menuArr}
        currentTab={currentTab}
        selectMenuHandler={selectMenuHandler}
      >
        {menuArr.map((el, index) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <li
            className={index === currentTab ? 'submenu focused' : 'submenu'}
            onClick={() => selectMenuHandler(index)}
            onKeyDown={() => selectMenuHandler(index)}
          >
            {el.name}
          </li>
        ))}
      </TabMenu>
      <div />
    </Container>
  );
}

export default Trainerdetail;
