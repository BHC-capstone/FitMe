import React, { useEffect } from 'react';
import styled from 'styled-components';

// eslint-disable-next-line react/prop-types
function Comments({ text1, check }) {
  useEffect(() => {
    console.log(check);
  });
  return (
    <TextareaUser check={!!check}>
      <Textarea check={!!check}>{text1}</Textarea>
    </TextareaUser>
  );
}

const TextareaUser = styled.div`
  margin-top: 10px;
  margin-right: 20px;
  text-align: ${props => (props.check != false ? 'left' : 'right')};
`;
const Textarea = styled.div`
  display: inline-block;
  position: relative;
  background-color: white;
  color: #878fa6;
  border: 1px solid ${props => (props.check != false ? '#f5a302' : '#2ba5f7')};
  border-radius: 15px;
  padding: 7px 12px;
  margin-bottom: 10px;
  max-width: 230px;
`;

export default Comments;
