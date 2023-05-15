import React from 'react';
import { Container, Nav } from 'react-bootstrap';

import styled from 'styled-components';

function TabMenu({ menuArr, currentTab, selectMenuHandler }) {
  return (
    <TabsContainer>
      <Nav className="nav-tabs" variant="pills">
        {menuArr.map((el, index) => (
          <Nav.Item key={el.id}>
            <NavTabLink
              className={index === currentTab ? 'nav-link active' : 'nav-link'}
              onClick={() => selectMenuHandler(index)}
            >
              {el.name}
            </NavTabLink>
          </Nav.Item>
        ))}
      </Nav>
      <TabContent>{menuArr[currentTab].content}</TabContent>
    </TabsContainer>
  );
}

// const TabMenuWrapper = styled.ul`
//   background-color: #ffffff;
//   color: rgb(21, 20, 20);
//   font-weight: bold;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   list-style: none;
//   margin-bottom: 7rem;
//   margin-top: 10px;
//   border-bottom: solid 1px;
//   border-bottom-color: #d1d1d1;

//   .submenu {
//     display: flex;
//     width: calc(100% / 3);
//     padding: 10px;
//     font-size: 15px;
//     transition: 0.5s;
//     border-radius: 10px 10px 0px 0px;
//   }

//   .focused {
//     border-bottom: solid 3px;
//   }
// `;

const Desc = styled.div`
  text-align: center;
`;

const TabsContainer = styled.div`
  margin: auto;
`;

const NavTabLink = styled.a`
  background-color: #ffffff;
  color: rgb(21, 20, 20);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  margin-bottom: 30px;
  margin-top: 10px;
  border-bottom: solid 1px;
  border-bottom-color: #d1d1d1;

  .submenu {
    display: flex;
    justify-content: space-around;
    width: 390px;
    height: 40px; */
    width: calc(50% / 3);
    padding: 10px;
    font-size: 15px;
    transition: 0.5s;
    border-radius: 10px 10px 0px 0px;
  }

  .focused {
    color: #fff;
    background-color: #2ba5f7;
  }

  & div.desc {
    text-align: center;
  }
`;

const TabContent = styled.div`
  padding: 1rem;
  //border: 1px solid #dee2e6;
  border-top: none;
`;

export default TabMenu;
