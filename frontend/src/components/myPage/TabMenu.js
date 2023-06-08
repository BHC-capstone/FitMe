import React from 'react';

function TabMenu({ menuArr, currentTab, selectMenuHandler }) {
  return (
    <div>
      <ul className="tab">
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
      </ul>
      <div className="pd">{menuArr[currentTab].content}</div>
    </div>
  );
}

export default TabMenu;
