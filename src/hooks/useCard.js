import { useNavigate } from 'react-router-dom';
import { formatAgo } from 'utils/date';

export const useCard = (content) => {
  const navigate = useNavigate();
  const { idx, category, cp, title, thumbnail, logo, publishDate, viewCount } = content;
  const locale = process.env.REACT_APP_LOCALE;
  const baseURL = process.env.REACT_APP_BASE_IMG_URL;

  const handleClick = () => {
    navigate(`${process.env.REACT_APP_WEB_STORY_URL}${idx}`);
  };

  const onErrorImg = (e) => (e.target.src = '/assets/no_image.png');

  return {
    idx,
    category,
    cp,
    title,
    thumbnail: `${baseURL}Thumbnail/${thumbnail}`,
    logo: `${baseURL}cp/${logo}`,
    publishDate: formatAgo(publishDate, locale),
    viewCount: Number(viewCount).toLocaleString('ko-KR'),
    handleClick,
    onErrorImg,
  };
};
