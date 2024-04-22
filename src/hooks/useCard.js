import { useNavigate } from 'react-router-dom';
import { decode } from 'html-entities';
import { formatAgo } from 'utils/date';

export const useCard = (content) => {
  const navigate = useNavigate();
  const { idx, category, cp, title, thumbnail, logo, publishDate, viewCount } = content;
  const locale = process.env.REACT_APP_LOCALE;

  // 카드 클릭시 해당 상세 스토리로 이동
  const handleClick = () => {
    navigate(`${process.env.REACT_APP_WEB_STORY_URL}${idx}`);
  };

  // 이미지 로딩 실패시 대체 이미지로 변경
  const onErrorImg = (e) => {
    // 더 이상의 onerror 이벤트 처리를 하지 않도록 설정
    e.target.onerror = null;
    // 대체 이미지로 변경
    e.target.src = process.env.REACT_APP_ERROR_IMG;
  };

  // 로고 로딩 실패시 대체 이미지로 변경
  const onErrorLogo = (e) => {
    e.target.onerror = null;
    e.target.src = process.env.REACT_APP_ERROR_LOGO;
  };

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
