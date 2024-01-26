import { useParams } from 'react-router-dom';

function ContentDetail() {
  const { contentId } = useParams();

  return (
    <>
      <div>ContentDetail {contentId}</div>
    </>
  );
}

export default ContentDetail;
