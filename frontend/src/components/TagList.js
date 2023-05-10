import React, { useState, useEffect } from 'react';
import { Tag } from 'antd';
import axios from 'axios';

function TagList({ userId }) {
  const [tags, setTags] = useState([]);
  console.log('In TagList component');

  useEffect(() => {
    const fetchTags = async () => {
      axios
        .get(`http://localhost:4000/manage/tag/${userId}`)
        .then(res => {
          setTags(res.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    };
    console.log('Before fetchTags');
    fetchTags();
    console.log('After fetchTags');
  }, [userId]);

  return (
    <p>
      {tags.map(tag => (
        <Tag key={tag.tag_name} color={tag.tag_color}>
          {tag.tag_name}
        </Tag>
      ))}
    </p>
  );
}

export default TagList;
