import { useParams } from 'react-router-dom';

function Contents() {
  const { pageId } = useParams();
  return (
    <>
      <div>{pageId}</div>
    </>
  );
}

export default Contents;
