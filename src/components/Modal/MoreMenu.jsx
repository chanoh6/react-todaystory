import React from 'react';
import style from 'styles/MenuModal.module.css';

function MoreMenu() {
  const menuTitle = ['메뉴1', '메뉴2', '메뉴3'];

  return (
    <>
      <div className={style.modal__wrap}>
        <ul>
          {menuTitle.map((category, idx) => {
            return (
              <li key={idx} className={style.menu__list}>
                {category}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default MoreMenu;
