import { useState, useEffect } from "react";
import styled from "styled-components";
import detail_trainer_page from "./trainer_list/detail_page";
import Pagination from 'react-bootstrap/Pagination'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
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
    <BrowserRouter>
    <Layout>
      <header>
          <h1>헤더 컴포넌트가 들어갈 자리</h1> 
      </header>
      <Routes>
      <Route exact path="/">
        <Layout>
          <p1>트레이너 목록</p1>
          <input type="text" value ={search} onChange = {onChange} placeholder="트레이너 이름 검색" />
          <button className="sort_star" onClick={sort_star_func}>별점 순으로 정렬 기능</button>
          <button>홀트</button>
          <button>헬스</button>
        </Layout>
        {filterTitle.map(posts => 
        <div>
          <BoxOne>
          <article key={posts.id}>
            <h3>
              {posts.id}. {posts.title}
            </h3>
            <p>{posts.body}</p>
          </article>
          </BoxOne>
        </div>)}
      </Route>
      </Routes>
    </Layout>
    </BrowserRouter>
  );
}

const Headlayout = styled.div`
osition: relative;
padding: 0;
margin: 0;
font-family: "Raleway", sans-serif;
font-weight: 300;
font-size: 40px;
color: #080808;
-webkit-transition: all 0.4s ease 0s;
-o-transition: all 0.4s ease 0s;
transition: all 0.4s ease 0s;
text-align: center;
`;

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
`;
        
export default App;

