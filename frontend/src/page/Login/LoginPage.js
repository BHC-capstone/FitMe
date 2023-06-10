import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import TabMenu from '../../components/TabMenu';
import UserLoginPage from './UserLoginPage';
import TrainerLoginPage from './TrainerLoginPage';

// export default function LoginPage() {
//   const [currentTab, clickTab] = useState(0);
//   const navigate = useNavigate();

//   const menuArr = [
//     { elid: 1, name: '일반 사용자', content: <UserLoginPage /> },
//     { elid: 2, name: '트레이너', content: <TrainerLoginPage /> },
//   ];
//   const selectMenuHandler = index => {
//     clickTab(index);
//   };

//   return (
//     <Container fluid className="panel">
//       <Head1>마이페이지</Head1>
//       <TabMenu
//         menuArr={menuArr}
//         currentTab={currentTab}
//         selectMenuHandler={selectMenuHandler}
//       >
//         {menuArr.map((el, index) => (
//           // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
//           <li
//             key={el.elid}
//             className={index === currentTab ? 'submenu focused' : 'submenu'}
//             onClick={() => selectMenuHandler(index)}
//             onKeyDown={() => selectMenuHandler(index)}
//           >
//             {el.name}
//           </li>
//         ))}
//       </TabMenu>
//     </Container>
//   );
// }

// const Head1 = styled.div`
//   color: rgb(21, 20, 20);
//   font-family: 'Black Han Sans', sans-serif;
//   font-size: 30px;
//   display: flex;
//   text-align: center;
//   align-items: center;
//   width: fit-content;
//   margin: 0 auto;
//   padding: 10px;
// `;
