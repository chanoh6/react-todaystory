import { useLocation, useParams } from 'react-router-dom';

function Contents() {
  const { pageId } = useParams();
  const {
    state: { title },
  } = useLocation();
  return (
    <>
      <div>
        {pageId} {title}
      </div>
    </>
  );
}

export default Contents;
