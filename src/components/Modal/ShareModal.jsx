import React from 'react';
import Modal from './Modal';
import style from 'styles/ShareModal.module.css';

function ShareModal() {
  return (
    <Modal>
      <div className={style.dimm}>
        <button></button>
      </div>
    </Modal>
  );
}

export default ShareModal;
