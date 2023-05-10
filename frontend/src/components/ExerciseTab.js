import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line react/prop-types
function ExerciseTab({ userid, date }) {
  const [exerdate, setExerdate] = useState([]);
  const navigate = useNavigate();
  // 해당 링크로 이동, 여기서는
  const navigateToRequest = ({ link }) => {
    navigate(`${link}`);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:4000/exerciseroutine/${userid}/${date}`)
      .then(res => {
        setExerdate(res.data.data);
        console.log(res.data.data);
      });
  }, [userid, date]);
  // 운동 루틴이 배열로 제공 된다고 가정하면 map 함수를 상위에 추가하여 밑의 컴포넌트들을 본문으로 사용할 예정
  return (
    <Flexcontainers>
      <Flexcontainerg>
        <Textbox>● 루틴 1: {exerdate.routine}</Textbox>
        <Flexcontainerg>
          <Button1 size="large" onClick={navigateToRequest}>
            해당 운동 루틴 영상
          </Button1>
          <Button1 size="large" onClick={navigateToRequest}>
            촬영 가이드
          </Button1>
          <Button1 size="large">운동 영상 업로드</Button1>
        </Flexcontainerg>
      </Flexcontainerg>
    </Flexcontainers>
  );
}
const Flexcontainers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Flexcontainerg = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Textbox = styled.div`
  float: left;
  font-weight: 400;
  font-size: 16px;
`;
const Button1 = styled(Button)`
  width: 120px;
  float: right;
  margin-right: 100px;
  margin-top: 0px;
  vertical-align: top;
  //border: 3px solid white;
`;
const Rightbox = styled.div`
  float: right;
`;
export default ExerciseTab;
