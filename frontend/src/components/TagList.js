import React, { useState, useEffect } from 'react';
import { Tag } from 'antd';

function TagList() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      //   const response = await fetch('/api/tags');
      //   const data = await response.json();
      const data = [
        {
          id: 1,
          name: '태그1',
          color: 'red',
        },
        {
          id: 2,
          name: '태그2',
          color: 'blue',
        },
        {
          id: 3,
          name: '태그3',
          color: 'green',
        },
        {
          id: 4,
          name: '태그4',
          color: 'yellow',
        },
        {
          id: 5,
          name: '태그5',
          color: 'orange',
        },
      ];
      setTags(data);
    };
    fetchTags();
  }, []);

  return (
    <p>
      {tags.map(tag => (
        <Tag key={tag.id} color={tag.color}>
          {tag.name}
        </Tag>
      ))}
    </p>
  );
}

export default TagList;
