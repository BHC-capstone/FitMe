// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import styled from 'styled-components';
// import { Container, Tab, Tabs } from 'react-bootstrap';
// import UserLoginPage from './UserLoginPage';
// import TrainerLoginPage from './TrainerLoginPage';
// import TabMenu from '../../components/TabMenu';

// export default function LoginPage() {
//   const [activeTab, setActiveTab] = useState(1);
//   const [currentTab, clickTab] = useState(0);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const menuArr = [
//     { name: '일반 사용자', content: <UserLoginPage /> },
//     { name: '트레이너', content: <TrainerLoginPage /> },
//   ];
//   const selectMenuHandler = index => {
//     clickTab(index);
//   };

//   return (
//     <Container className="panel">
//       <Tabs
//         menuArr={menuArr}
//         currentTab={currentTab}
//         selectMenuHandler={selectMenuHandler}
//         id="justify-tab-example"
//         className="mb-3"
//         justify
//       >
//         {menuArr.map((el, index) => (
//           // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
//           <li
//             className={index === currentTab ? 'submenu focused' : 'submenu'}
//             onClick={() => selectMenuHandler(index)}
//             onKeyDown={() => selectMenuHandler(index)}
//           >
//             {el.name}
//           </li>
//         ))}
//       </Tabs>
//     </Container>
//   );
// }
