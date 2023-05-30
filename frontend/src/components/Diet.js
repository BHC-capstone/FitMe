import React, { useRef } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; //* ***
import { CloseOutlined } from '@ant-design/icons';
// eslint-disable-next-line react/prop-types
function Diet({
  userid,
  date,
  breakfast,
  lunch,
  dinner,
  breakfastImg,
  lunchImg,
  dinnerImg,
  onImageChange,
  onImageRemove,
}) {
  const breakfastNum = 0;
  const lunchNum = 1;
  const dinnerNum = 2;
  const breakfastImageInput = useRef();
  const lunchImageInput = useRef();
  const dinnerImageInput = useRef();
  const onCickImageUploadBreakfast = () => {
    breakfastImageInput.current.click();
  };

  const onCickImageUploadLunch = () => {
    lunchImageInput.current.click();
  };

  const onCickImageUploadDinner = () => {
    dinnerImageInput.current.click();
  };

  return (
    <div>
      <Flexcontainer num={0}>
        <Text0 num={0}>오늘의 식단</Text0>
        <Text1 num={0}>아침 식단</Text1>
        <Text2 num={0}>아침 거르지 말기!</Text2>
        <TextBox num={0} count={1}>
          <span className="b">아침</span> : {breakfast}
        </TextBox>
        <input
          type="file"
          style={{ display: 'none' }}
          ref={breakfastImageInput}
          accept="image"
          onChange={event => onImageChange(event.target.files[0], breakfastNum)}
        />
        <StyledButton num={0} count={2} onClick={onCickImageUploadBreakfast}>
          아침 사진 업로드
        </StyledButton>
        {breakfastImg ? (
          <StyledImgContainer num={2} count={2}>
            <img src={breakfastImg} alt="아침" width="200px" height="200px" />
            <div style={{ float: 'right', marginLeft: '10%', color: 'gray' }}>
              <CloseOutlined onClick={() => onImageRemove(breakfastNum)} />
            </div>
          </StyledImgContainer>
        ) : null}
        <Div />
      </Flexcontainer>
      <Flexcontainer num={1}>
        <Text0 num={1}>오늘의 식단</Text0>
        <Text1 num={1}>점심 식단</Text1>
        <Text2 num={1}>드시기 전에 식단 촬영!</Text2>
        <TextBox num={1} count={1}>
          <span className="b">점심</span> : {lunch}
        </TextBox>
        <input
          type="file"
          style={{ display: 'none' }}
          ref={lunchImageInput}
          accept="image"
          onChange={event => onImageChange(event.target.files[0], lunchNum)}
        />
        <StyledButton num={1} count={2} onClick={onCickImageUploadLunch}>
          점심 사진 업로드
        </StyledButton>
        {lunchImg ? (
          <StyledImgContainer num={2} count={2}>
            <img src={lunchImg} alt="점심" width="200px" height="200px" />
            <div style={{ float: 'right', marginLeft: '10%', color: 'gray' }}>
              <CloseOutlined onClick={() => onImageRemove(lunchNum)} />
            </div>
          </StyledImgContainer>
        ) : null}
        <Div />
      </Flexcontainer>
      <Flexcontainer num={2}>
        <Text0 num={2}>오늘의 식단</Text0>
        <Text1 num={2}>저녁 식단</Text1>
        <Text2 num={2}>식사는 9시 전에 끝내기!</Text2>
        <TextBox num={2} count={1}>
          <span className="b">저녁</span> : {dinner}
        </TextBox>
        <input
          type="file"
          style={{ display: 'none' }}
          ref={dinnerImageInput}
          accept="image"
          onChange={event => onImageChange(event.target.files[0], dinnerNum)}
        />
        <StyledButton num={2} count={2} onClick={onCickImageUploadDinner}>
          저녁 사진 업로드
        </StyledButton>
        {dinnerImg ? (
          <StyledImgContainer num={2} count={2}>
            <img src={dinnerImg} alt="저녁" width="200px" height="200px" />
            <div style={{ float: 'right', marginLeft: '10%', color: 'gray' }}>
              <CloseOutlined onClick={() => onImageRemove(dinnerNum)} />
            </div>
          </StyledImgContainer>
        ) : null}
        <Div />
      </Flexcontainer>
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
  z-index: 1;
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

export default Diet;
