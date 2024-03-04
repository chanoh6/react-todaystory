import React, { useEffect, useState, forwardRef } from 'react';
import style from 'styles/MoreMenu.module.css';

function MoreMenu() {
  const menuTitle = ['메뉴1', '메뉴2', '메뉴3', '메뉴4'];

  return (
    <div className={style.modal__wrap}>
      <ul>
        {menuTitle.map((category, idx) => {
          return <li key={idx}>{category}</li>;
        })}
      </ul>
    </div>
  );
}

export default MoreMenu;
