import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatAgo } from 'utils/date';
import { LikeFilledIcon, LikeUnfilledIcon, ViewIcon } from 'assets';
import 'styles/Card.css';

const onErrorImg = (e) => (e.target.src = '/assets/no_image.png');

const TypeA = ({ content }) => {
  const navigate = useNavigate();
  const locale = process.env.REACT_APP_LOCALE;
  const baseURL = process.env.REACT_APP_BASE_IMG_URL;
  const { idx, thumbnail, logo, channel, title, category, publishedAt, viewCount } = content;
  const [isFavorite, setIsFavorite] = useState(false);

  // 1. 해당 idx가 좋아요 되어 있는지 확인
  useEffect(() => {
    // 로컬스토리지 데이터 꺼냄
    let favorites = localStorage.getItem('favorites');

    // 있을 경우 따옴표 제거하고 다시 favorites에 저장
    if (favorites) {
      favorites = JSON.parse(favorites);

      // favorites에 해당 idx가 있는지 확인
      const found = favorites.find((i) => i === idx);

      // 있을 경우 true 반환
      if (found) {
        setIsFavorite(true);
      }
    }
  }, []);

  // 2. 좋아요 되어있을시 아이콘 변경

  // 3. 좋아요 누를시 로컬스토리지에 해당 idx 저장
  const saveFavorites = (idx) => {
    // 로컬스토리지 데이터 꺼냄
    let favorites = localStorage.getItem('favorites');

    // 로컬스토리지에 데이터가 없을 경우 새로운 배열 생성
    if (favorites === null) {
      favorites = [];
    } else {
      // favorites에서 자료를 꺼내 따옴표를 제거하고 다시 favorites에 저장
      favorites = JSON.parse(favorites);
    }

    // 해당 idx를 favorites에 저장
    favorites.push(idx);

    // 중복된 데이터를 넣지 않는 set 자료형에 favorites를 담아 중복 제거
    favorites = new Set(favorites);

    // 중복 제거된 set 자료형의 favorites를 일반 배열로 변경
    favorites = [...favorites];

    // 로컬스토리지에 json 자료형으로 저장
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  const onClick = () => {
    setIsFavorite(!isFavorite);
    saveFavorites(idx);
  };

  // 4. 좋아요 다시 누를시 로컬스토리지에서 해당 idx 삭제

  return (
    <li data-idx={idx} className="card" onClick={() => navigate(`/view/${idx}`, { state: { content } })}>
      <figure className="thumbnail">
        <img src={`${baseURL}Thumbnail/${thumbnail}`} alt="thumbnail" onError={onErrorImg} />
      </figure>
      <div className="card__title">
        <div className="cp">
          <img src={`${baseURL}cp/${logo}`} alt="cp logo" onError={onErrorImg} />
          <p>{channel}</p>
        </div>
        <p className="title">{title}</p>
      </div>
      <div className="card__more">
        <div className="date">
          <span id="publishedAt">{formatAgo(publishedAt, locale)}</span>
          <span>|</span>
          <span id="category">{category}</span>
        </div>
        <div className="like" onClick={(e) => e.stopPropagation()}>
          <ViewIcon width={16} height={16} fill={'var(--color-blue)'} />
          <p id="viewCount">{viewCount.toLocaleString('ko-KR')}</p>
          {isFavorite ? (
            <LikeFilledIcon width={16} height={16} fill={'var(--color-blue)'} />
          ) : (
            <LikeUnfilledIcon width={16} height={16} fill={'var(--color-blue)'} onClick={onClick} />
          )}
        </div>
      </div>
    </li>
  );
};

export default TypeA;
