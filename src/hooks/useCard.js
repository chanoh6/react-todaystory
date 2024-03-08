import { useNavigate } from 'react-router-dom';
import { formatAgo } from 'utils/date';

export const useCard = (content) => {
  const navigate = useNavigate();
  const { idx, category, channel, title, thumbnail, logo, publishedAt, viewCount } = content;
  const locale = process.env.REACT_APP_LOCALE;
  const baseURL = process.env.REACT_APP_BASE_IMG_URL;

  const handleClick = () => {
    navigate(`/view/${idx}`);
  };

  const onErrorImg = (e) => (e.target.src = '/assets/no_image.png');

  return {
    idx,
    category,
    channel,
    title,
    thumbnail: `${baseURL}Thumbnail/${thumbnail}`,
    logo: `${baseURL}cp/${logo}`,
    publishedAt: formatAgo(publishedAt, locale),
    viewCount: viewCount.toLocaleString('ko-KR'),
    handleClick,
    onErrorImg,
  };
};
