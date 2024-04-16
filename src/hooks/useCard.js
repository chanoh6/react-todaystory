import { useNavigate } from 'react-router-dom';
import { formatAgo } from 'utils/date';
import { decode } from 'html-entities';

export const useCard = (content) => {
  const navigate = useNavigate();
  const { idx, category, cp, title, thumbnail, logo, publishDate, viewCount } = content;
  const locale = process.env.REACT_APP_LOCALE;

  const handleClick = () => {
    navigate(`${process.env.REACT_APP_WEB_STORY_URL}${idx}`);
  };

  const onErrorImg = (e) => {
    const thumbnailURL = `${process.env.REACT_APP_THUMBNAIL_IMG_URL2}${thumbnail}`;
    const errorURL = process.env.REACT_APP_ERROR_IMG;

    if (e.target.src !== thumbnailURL) {
      e.target.src = thumbnailURL;
      e.target.onerror = (errorEvent) => {
        if (errorEvent.target.src !== errorURL) {
          errorEvent.target.src = errorURL;
          // 더 이상의 onerror 처리가 없도록 설정
          errorEvent.target.onerror = null;
        }
      };
    }
  };

  const onErrorLogo = (e) => (e.target.src = process.env.REACT_APP_ERROR_LOGO);

  return {
    idx,
    category: decode(category),
    cp: decode(cp),
    title: decode(title),
    thumbnail: `${process.env.REACT_APP_THUMBNAIL_IMG_URL}${thumbnail}`,
    logo: `${process.env.REACT_APP_LOGO_IMG_URL}${logo}`,
    publishDate: formatAgo(publishDate, locale),
    viewCount: Number(viewCount).toLocaleString('ko-KR'),
    handleClick,
    onErrorImg,
    onErrorLogo,
  };
};
