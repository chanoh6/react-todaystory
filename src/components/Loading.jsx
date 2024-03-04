import React from 'react';
import { PulseLoader } from 'react-spinners';
import Modal from './Modal/Modal';

function Loading() {
  const override = {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    top: '50%',
  };

  return (
    <Modal>
      <div style={{ height: '100vh' }}>
        <PulseLoader color="#459AFF" loading size={20} speedMultiplier={0.5} cssOverride={override} />
      </div>
    </Modal>
  );
}

export default Loading;
