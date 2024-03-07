import { PulseLoader } from 'react-spinners';
import Modal from 'components/Modal/Modal';

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
        <PulseLoader color="var(--color-blue)" loading size={20} speedMultiplier={0.5} cssOverride={override} />
      </div>
    </Modal>
  );
}

export default Loading;