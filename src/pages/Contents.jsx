import { useParams } from 'react-router-dom';

function Contents() {
  const { pageTitle, pageId } = useParams();
  return (
    <>
      <div>
        {pageTitle} {pageId}
      </div>
    </>
  );
}

export default Contents;
