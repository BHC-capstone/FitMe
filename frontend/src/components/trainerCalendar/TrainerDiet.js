import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; //* ***
import axios from 'axios';
import { useSelector } from 'react-redux';
// eslint-disable-next-line react/prop-types
function Routine({ userid, date }) {
  const [dietImg, setDietImg] = useState([]);
  const loginedUser = useSelector(state => state.user);
  const [dietdate, setDietdate] = useState([]);
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const imageInput = useRef();
  const onCickImageUpload2 = () => {
    imageInput.current.click();
  };
  useEffect(() => {
    axios
      .get(`https://localhost:4000/calender/mealplan/${userid}/${date}`, {
        withCredentials: true,
      })
      .then(res => {
        setDietdate(res.data.data);
      });
    setBreakfast(dietdate.breakfast);
    setDinner(dietdate.lunch);
    setLunch(dietdate.dinner);
  }, [userid, date, dietdate.breakfast]);
  const onChangebreakfast = e => {
    setBreakfast(e.target.value);
  };
  const onChangelunch = e => {
    setLunch(e.target.value);
  };
  const onChangedinner = e => {
    setDinner(e.target.value);
  };
  const onSubmitHandler = event => {
    event.preventDefault();

    const body = {
      breakfast,
      lunch,
      dinner,
    };
    axios
      .post(
        `https://localhost:4000/trainer_calender/createMealplan/${date}/${userid}/${loginedUser.id}`,
        body,
        {
          withCredentials: true,
        },
      )
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          console.log(res);
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
      <Flexcontainer num={0}>
        <Text0 num={0}>오늘의 식단</Text0>
        <Text1 num={0}>아침 식단</Text1>
        <Text2 num={0}>아침 거르지 말기!</Text2>
        <input type="text" value={breakfast} onChange={onChangebreakfast} />
        <li>
          <img src={dietdate.breakfast_image_url} alt="아침" width="300" />
        </li>

        <Div />
      </Flexcontainer>
      <Flexcontainer num={1}>
        <Text0 num={1}>오늘의 식단</Text0>
        <Text1 num={1}>점심 식단</Text1>
        <Text2 num={1}>몇 시에 드셨는지도 적어주세요!</Text2>
        <input type="text" value={lunch} onChange={onChangelunch} />
        <li>
          <img src={dietdate.lunch_image_url} alt="점심" width="300" />
        </li>

        <Div />
      </Flexcontainer>
      <Flexcontainer num={2}>
        <Text0 num={2}>오늘의 식단</Text0>
        <Text1 num={2}>저녁 식단</Text1>
        <Text2 num={2}>식사는 9시 전에 끝내기!</Text2>
        <input type="text" value={dinner} onChange={onChangedinner} />
        <li>
          <img src={dietdate.dinner_image_url} alt="저녁" width="300" />
        </li>
        <Div />
      </Flexcontainer>
      <StyledButton num={0} count={3} onClick={onSubmitHandler}>
        식단 업로드
      </StyledButton>
    </div>
  );
}

const Flexcontainer = styled.div`
  display: flex;
  background-color: ${props => (props.num % 2 === 1 ? 'white' : '#2ba5f7')};
  height: fit-content;
  flex-direction: column;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin-bottom: 20px;
`;
const Text0 = styled.text`
  font-weight: bolder;
  font-size: 16px;
  margin-top: 20px;
  text-align: left;
  margin-left: 5%;
  color: ${props => (props.num % 2 === 1 ? '#2ba5f7' : 'white')};
`;
const Text1 = styled.text`
  font-family: 'Black Han Sans', sans-serif;
  font-size: 28px;
  margin-top: 8px;
  text-align: left;
  margin-left: 5%;
  color: ${props => (props.num % 2 === 1 ? '#2ba5f7' : 'white')};
`;
const Text2 = styled.text`
  font-size: 12px;
  text-align: left;
  margin-left: 8%;
  margin-bottom: 5px;
  color: ${props => (props.num % 2 === 1 ? '#2ba5f7' : 'white')};
`;
const TextBox = styled.div`
  padding-left: 5%;
  text-align: left;
  border-radius: 30px;
  border: thin solid
    ${props => ((props.num + props.count) % 2 === 1 ? '#2ba5f7' : 'white')};
  width: 90%;
  background-color: ${props =>
    (props.num + props.count) % 2 === 1 ? '#fff' : '#2ba5f7'};
  margin: auto;
  margin-bottom: 5px;
  line-height: 60px;
  height: 60px;
  color: ${props => ((props.num + props.count) % 2 === 1 ? 'gray' : 'white')};
`;
const StyledButton = styled(Button)`
  padding-left: 5%;
  text-align: left;
  border-radius: 30px;
  border: 1px solid
    ${props => ((props.num + props.count) % 2 === 1 ? '#2ba5f7' : 'white')};
  width: 90%;
  background-color: ${props =>
    (props.num + props.count) % 2 === 1 ? 'white' : '#2ba5f7'};
  margin: auto;
  line-height: 60px;
  height: 60px;
  color: ${props => ((props.num + props.count) % 2 === 1 ? 'gray' : 'white')};
`;

const Div = styled(Link)`
  width: 100%;
  margin-bottom: 20px;
`;

export default Routine;
