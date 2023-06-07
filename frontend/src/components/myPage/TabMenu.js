import React from 'react';
import styled from 'styled-components';

function TabMenu({ menuArr, currentTab, selectMenuHandler }) {
  return (
    <TabsContainer>
      <Tab>
        {menuArr.map((el, index) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
          <li
            key={el.elid}
            className={index === currentTab ? 'submenu focused' : 'submenu'}
            onClick={() => selectMenuHandler(index)}
          >
            {el.name}
          </li>
        ))}
      </Tab>
      <TabContent>{menuArr[currentTab].content}</TabContent>
    </TabsContainer>
  );
}

const TabsContainer = styled.div`
  // margin: auto;
`;

const Tab = styled.ul`
background-color: #ffffff;
color: rgb(21, 20, 20);
font-weight: bold;
display: flex;
flex-direction: row;
align-items: center;
list-style: none;
margin-bottom: 30px;
margin-top: 10px;
border-bottom: solid 1px #d1d1d1;

.submenu {
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
  border-top: none;
`;

export default TabMenu;
