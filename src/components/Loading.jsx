import React from 'react';
import { PulseLoader } from 'react-spinners';

function Loading() {
  const override = {
    display: 'block',
    margin: '0 auto',
  };

  return (
    <div>
      <PulseLoader color="#459AFF" loading size={20} speedMultiplier={0.5} cssOverride={override} />
    </div>
  );
}

export default Loading;
