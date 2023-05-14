import React, { useState, useEffect } from 'react';
import { Tag } from 'antd';
import axios from 'axios';

function TagList({ userId, closeable, tagcount }) {
  const [tags, setTags] = useState([]);
  function deleteTag(tagId) {
    axios
      .post(`https://localhost:4000/manage/deletetag/${tagId}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    const fetchTags = async () => {
      axios
        .get(`https://localhost:4000/manage/tag/${userId}`)
        .then(res => {
          setTags(res.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    };
    fetchTags();
  }, [tagcount]);

  return (
    <p>
      {tags.map(
        tag =>
          closeable ? (
            <Tag
              closable
              onClose={() => deleteTag(tag.id)}
              key={tag.tag_name}
              color={tag.tag_color}
            >
              {tag.tag_name}
            </Tag>
          ) : (
            <Tag key={tag.tag_name} color={tag.tag_color}>
              {tag.tag_name}
            </Tag>
          ),

        // <Tag
        //   closable
        //   onClose={() => deleteTag(tag.id)}
        //   key={tag.tag_name}
        //   color={tag.tag_color}
        // >
        //   {tag.tag_name}
        // </Tag>
      )}
    </p>
  );
}

export default TagList;
