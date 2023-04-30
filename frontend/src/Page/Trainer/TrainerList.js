import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import styled from "styled-components";


const TrainerList = (props) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const [search, setSearch] = useState("");
  const onChange = (e) => {
        setSearch(e.target.value)
    }
  const filterTitle = posts.filter((p) => {
    return p.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  })
  const sort_star_func = () =>{
    let tempArray = Array.from(posts);
    tempArray.sort((b, a) => a.id-b.id);
    setPosts(tempArray)
  }
	return (
		<Layout>
        <Layout>
          <p1>트레이너 목록</p1>
          <input type="text" value ={search} onChange = {onChange} placeholder="트레이너 이름 검색" />
          <button className="sort_star" onClick={sort_star_func}>별점 순으로 정렬 기능</button>
          <button>홀트</button>
          <button>헬스</button>
        </Layout>
        {filterTitle.map(posts => 
        <div>
          <BoxOne onclick="location.href={'/trainer_info/'+${posts.id}};">
          <article key={posts.id}>
            <h3>
              {posts.id}. {posts.title}
            </h3>
            <p>{posts.body}</p>
            <Link to={"/trainer_info/"+posts.id}><li>바로가기</li></Link>
            <Link to={{pathname: "/trainer_info/"+posts.id, state: { id : posts.id }}}>
              바로가기2
            </Link>
          </article>
          </BoxOne>
        </div>)}
    </Layout>

	);
	
};


const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;
const BoxOne = styled.div`
  background-color: #cf6a87;
  width: 1000px;
  height: 200px;
  cursor: pointer;
`;


export default TrainerList;