import React from 'react';
import { PulseLoader } from 'react-spinners';

const Loading = () => {
  const override = {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    top: '50%',
  };

  return (
    <div style={{ height: '100vh' }}>
      <PulseLoader color="var(--color-blue)" loading size={20} speedMultiplier={0.5} cssOverride={override} />
    </div>
  );
};

export default Loading;
