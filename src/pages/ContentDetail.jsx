import { useParams } from 'react-router-dom';

function ContentDetail() {
  const { contentId } = useParams();

  return (
    <>
      <div>content {contentId}</div>
    </>
  );
}

export default ContentDetail;
