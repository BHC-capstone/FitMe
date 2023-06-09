import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Diet from './Diet';

// eslint-disable-next-line react/prop-types
function DietTab({ userid, date }) {
  const [dietdate, setDietdate] = useState([]);
  useEffect(() => {
    setDietdate('');
    axios
      .get(`https://fitme.p-e.kr:4000/calender/mealplan/${userid}/${date}`, {
        withCredentials: true,
      })
      .then(res => {
        setDietdate(res.data.data);
      });
  }, [userid, date]);
  function onImageChange(image, num) {
    let myUrl = null;
    if (num === 0)
      myUrl = `https://fitme.p-e.kr:4000/calender/mealpicture/${userid}/${date}/breakfast`;
    else if (num === 1)
      myUrl = `https://fitme.p-e.kr:4000/calender/mealpicture/${userid}/${date}/lunch`;
    else
      myUrl = `https://fitme.p-e.kr:4000/calender/mealpicture/${userid}/${date}/dinner`;

    const formData = new FormData();
    formData.append('img', image);
    axios({
      url: myUrl,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      method: 'POST',
      withCredentials: true,
    })
      .then(response => {
        alert(response.data.message);
        axios
          .get(
            `https://fitme.p-e.kr:4000/calender/mealplan/${userid}/${date}`,
            {
              withCredentials: true,
            },
          )
          .then(res => {
            setDietdate(res.data.data);
          });
      })
      .catch(err => {});
  }

  function onImageRemove(num) {
    let myUrl = null;
    if (num === 0)
      myUrl = `https://fitme.p-e.kr:4000/calender/mealPicturedelete/${userid}/${date}/breakfast`;
    else if (num === 1)
      myUrl = `https://fitme.p-e.kr:4000/calender/mealPicturedelete/${userid}/${date}/lunch`;
    else
      myUrl = `https://fitme.p-e.kr:4000/calender/mealPicturedelete/${userid}/${date}/dinner`;

    axios({
      url: myUrl,
      method: 'DELETE',
      withCredentials: true,
    })
      .then(response => {
        alert(response.data.message);
        axios
          .get(
            `https://fitme.p-e.kr:4000/calender/mealplan/${userid}/${date}`,
            {
              withCredentials: true,
            },
          )
          .then(res => {
            setDietdate(res.data.data);
          });
      })
      .catch(err => {});
  }
  return (
    <Flexcontainers>
      <Diet
        userid={userid}
        date={date}
        breakfast={dietdate.breakfast}
        lunch={dietdate.lunch}
        dinner={dietdate.dinner}
        breakfastImg={dietdate.breakfast_image_url}
        lunchImg={dietdate.lunch_image_url}
        dinnerImg={dietdate.dinner_image_url}
        onImageChange={onImageChange}
        onImageRemove={onImageRemove}
      />
    </Flexcontainers>
  );
}
const Flexcontainers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export default DietTab;
