import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import axios from 'axios';
// eslint-disable-next-line react/prop-types
function DietTab({ userid, date }) {
  const imageInput1 = useRef();
  const imageInput2 = useRef();
  const imageInput3 = useRef();
  const [Dietdate, setDietdate] = useState([]);
  const [ImageBreakfast, setImageBreakfast] = useState([]);
  const [ImageLunch, setImageLunch] = useState([]);
  const [ImageDinner, setImageDinner] = useState([]);
  /* 업로드 부분은 업로드 버튼을 누를때마다 데이터베이스 변경
    신청을 보낼지 아니면 제출 버튼을 하나 더만들어서 보내고 수정이
    불가능하게 할지 토론할 부분이 있어, 구현이 크게 오래걸리지 않는
    부분이므로 잠시 보류함 */
  useEffect(() => {
    axios
      .get(`https://localhost:4000/calender/mealplan/${userid}/${date}`)
      .then(res => {
        setDietdate(res.data.data);
        console.log(res.data.data);
      });
  }, [userid, date]);

  const onCickImageUpload1 = () => {
    imageInput1.current.click();
  };
  const onCickImageUpload2 = () => {
    imageInput2.current.click();
  };
  const onCickImageUpload3 = () => {
    imageInput3.current.click();
  };
  // 각각 입력받는 api가 3개가 되어야함
  function onBreakfastChange(event) {
    setImageBreakfast(event.target.files[0]);
    const formData = new FormData();
    formData.append('img', event.target.files[0]);

    axios({
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      url: `https://localhost:4000/calender/mealpicture/${userid}/${date}/breakfast`,
      data: formData,
      method: 'POST',
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log('fail');
      });
    // console.log(event.target.files);
  }
  function onLunchChange(event) {
    setImageLunch(event.target.files[0]);
    const formData = new FormData();
    formData.append('img', ImageLunch);
    axios
      .post(
        `https://localhost:4000/calender/mealpicture/${userid}/${date}/lunch`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log('fail');
      });
    // console.log(event.target.files);
  }
  function onDinnerChange(event) {
    setImageDinner(event.target.files[0]);
    const formData = new FormData();
    formData.append('img', ImageDinner);
    axios
      .post(
        `https://localhost:4000/calender/mealplan/${userid}/${date}/dinner`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log('fail');
      });
    // console.log(event.target.files);
  }

  return (
    <Flexcontainers>
      <Flexcontainerg>
        <Textbox>● 아침: {Dietdate.breakfast}</Textbox>
        <Rightbox>
          <input
            type="file"
            style={{ display: 'none' }}
            ref={imageInput1}
            accept="image/png, image/jpeg, image/jpg"
            onChange={event => onBreakfastChange(event)}
          />
          <Button1 onClick={onCickImageUpload1}>이미지 확인</Button1>
        </Rightbox>
      </Flexcontainerg>
      <Flexcontainerg>
        <Textbox>● 점심: {Dietdate.lunch}</Textbox>
        <Rightbox>
          <input
            type="file"
            style={{ display: 'none' }}
            ref={imageInput2}
            accept="image/png, image/jpeg, image/jpg"
            onChange={event => onLunchChange(event)}
          />
          <Button1 onClick={onCickImageUpload2}>이미지 확인</Button1>
        </Rightbox>
      </Flexcontainerg>
      <Flexcontainerg>
        <Textbox>● 저녁: {Dietdate.dinner}</Textbox>
        <Rightbox>
          <input
            type="file"
            style={{ display: 'none' }}
            ref={imageInput3}
            accept="image/png, image/jpeg, image/jpg"
            onChange={event => onDinnerChange(event)}
          />
          <Button1 onClick={onCickImageUpload3}>이미지 확인</Button1>
        </Rightbox>
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
  height: 150px;
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
export default DietTab;
