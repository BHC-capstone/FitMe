import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom'; //* ***
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
// eslint-disable-next-line react/prop-types
function Routine({ userid, date }) {
  const loginedUser = useSelector(state => state.user);
  const [dietdate, setDietdate] = useState([]);
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [breakfastOpen, setBreakfastOpen] = useState(false);
  const [lunchOpen, setLunchOpen] = useState(false);
  const [dinnerOpen, setDinnerOpen] = useState(false);
  const imageInput = useRef();

  const onCickImageUpload2 = () => {
    imageInput.current.click();
  };
  useEffect(() => {
    setDietdate([]);
    axios({
      url: `https://fitme.p-e.kr:4000/calender/mealplan/${userid}/${date}`,
      method: 'GET',
      withCredentials: true,
    })
      .then(res => {
        setDietdate(res.data.data);
      })
      .catch(err => {
        setDietdate({ breakfast: '', lunch: '', dinner: '' });
        alert(err.response.data.message);
      });
  }, [userid, date]);

  useEffect(() => {
    setBreakfast(dietdate.breakfast);
    setDinner(dietdate.dinner);
    setLunch(dietdate.lunch);
  }, [dietdate]);

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
        `https://fitme.p-e.kr:4000/trainer_calender/createMealplan/${date}/${userid}/${loginedUser.id}`,
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
        alert(err.response.data.message);
      });
  };
  return (
    <div>
      <Flexcontainer num={0}>
        <Text0 num={0}>오늘의 식단</Text0>
        <Text1 num={0}>아침 식단</Text1>
        <Text2 num={0}>아침 거르지 말기!</Text2>
        <Row className="justify-content-xs-center">
          <Col xs={{ span: 10, offset: 1 }}>
            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label="아침 메뉴 입력"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  value={breakfast}
                  onChange={onChangebreakfast}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-xs-center">
          <Col xs={{ span: 10, offset: 1 }}>
            <StyledButton
              num={0}
              count={0}
              onClick={() => setBreakfastOpen(e => !e)}
            >
              회원 식단 사진 확인
              <div style={{ float: 'right', marginRight: '5%' }}>
                {breakfastOpen ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              </div>
            </StyledButton>
            {breakfastOpen ? (
              <StyledImgContainer num={2} count={2}>
                {dietdate.breakfast_image_url == null ? (
                  <div style={{ color: 'black' }}>
                    아직 이미지가 업로드되지 않았습니다.
                  </div>
                ) : (
                  <img
                    src={dietdate.breakfast_image_url}
                    alt="아침"
                    width="200"
                    height="200"
                  />
                )}
              </StyledImgContainer>
            ) : (
              <div />
            )}
          </Col>
        </Row>
        <Div />
      </Flexcontainer>
      <Flexcontainer num={1}>
        <Text0 num={1}>오늘의 식단</Text0>
        <Text1 num={1}>점심 식단</Text1>
        <Text2 num={1}>드시기 전에 식단 촬영!</Text2>
        <Row className="justify-content-xs-center">
          <Col xs={{ span: 10, offset: 1 }}>
            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label="점심 메뉴 입력"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  value={lunch}
                  onChange={onChangelunch}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-xs-center">
          <Col xs={{ span: 10, offset: 1 }}>
            <StyledButton
              num={1}
              count={1}
              onClick={() => setLunchOpen(e => !e)}
            >
              회원 식단 사진 확인
              <div style={{ float: 'right', marginRight: '5%' }}>
                {lunchOpen ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              </div>
            </StyledButton>
            {lunchOpen ? (
              <StyledImgContainer num={2} count={2}>
                {dietdate.lunch_image_url == null ? (
                  <div style={{ color: 'black' }}>
                    아직 이미지가 업로드되지 않았습니다.
                  </div>
                ) : (
                  <img
                    src={dietdate.lunch_image_url}
                    alt="점심"
                    width="200"
                    height="200"
                  />
                )}
              </StyledImgContainer>
            ) : (
              <div />
            )}
          </Col>
        </Row>
        <Div />
      </Flexcontainer>
      <Flexcontainer num={2}>
        <Text0 num={2}>오늘의 식단</Text0>
        <Text1 num={2}>저녁 식단</Text1>
        <Text2 num={2}>식사는 9시 전에 끝내기!</Text2>
        <Row className="justify-content-xs-center">
          <Col xs={{ span: 10, offset: 1 }}>
            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label="저녁 메뉴 입력"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  value={dinner}
                  onChange={onChangedinner}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-xs-center">
          <Col xs={{ span: 10, offset: 1 }}>
            <StyledButton
              num={2}
              count={2}
              onClick={() => setDinnerOpen(e => !e)}
            >
              회원 식단 사진 확인
              <div style={{ float: 'right', marginRight: '5%' }}>
                {dinnerOpen ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              </div>
            </StyledButton>
            {dinnerOpen ? (
              <StyledImgContainer num={2} count={2}>
                {dietdate.dinner_image_url == null ? (
                  <div style={{ color: 'black' }}>
                    아직 이미지가 업로드되지 않았습니다.
                  </div>
                ) : (
                  <img
                    src={dietdate.dinner_image_url}
                    alt="저녁"
                    width="200"
                    height="200"
                  />
                )}
              </StyledImgContainer>
            ) : (
              <div />
            )}
          </Col>
        </Row>
        <Div />
      </Flexcontainer>
      <Button variant="primary" type="submit" onClick={onSubmitHandler}>
        식단 업로드
      </Button>
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
  font-family: 'Gowun Dodum', sans-serif;
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
  margin-bottom: 5px;
  height: 60px;
  color: ${props => ((props.num + props.count) % 2 === 1 ? 'gray' : 'white')};
`;
const StyledImgContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-left: 5%;
  padding-top: 40px;
  border-radius: 0 0px 30px 30px;
  border: 1px solid #2ba5f7;
  width: 90%;
  background-color: ${props =>
    (props.num + props.count) % 2 === 1 ? '#2ba5f7' : 'white'};
  margin: auto;
  margin-top: -35px;
  margin-bottom: 5px;
  line-height: 60px;
  height: 250px;
  color: ${props => ((props.num + props.count) % 2 === 1 ? 'gray' : 'white')};
`;
const Div = styled(Link)`
  width: 100%;
  margin-bottom: 20px;
`;

export default Routine;
