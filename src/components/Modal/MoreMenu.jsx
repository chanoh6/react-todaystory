import React, { useEffect, useState } from 'react';
import style from 'styles/MenuModal.module.css';
import Modal from './Modal';

function MoreMenu() {
  const menuTitle = ['메뉴1', '메뉴2', '메뉴3', '메뉴4'];

  return (
    <Modal>
      <div className={style.modal__wrap}>
        <ul>
          {menuTitle.map((category, idx) => {
            return <li key={idx}>{category}</li>;
          })}
        </ul>
      </div>
    </Modal>
  );
}

export default MoreMenu;
