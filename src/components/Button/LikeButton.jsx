import React from 'react';
import { useFavorite } from 'hooks/useLocalStorage';
import { LikeFilledIcon, LikeUnfilledIcon } from 'assets';

const LikeButton = (props) => {
  const { idx, onClick } = props;
  const { favorite, saveFavorite } = useFavorite(idx);

  // 좋아요 버튼 클릭시 즐겨찾기 저장
  const handleButtonClick = (e) => {
    saveFavorite(e);
    // 공감한 콘텐츠 페이지에서 공감 취소시 콘텐츠 삭제
    onClick?.(idx);
  };

  return (
    <button type="button" aria-label="like_button" onClick={handleButtonClick}>
      {favorite ? (
        <LikeFilledIcon width={18} height={16} fill={'var(--color-blue)'} />
      ) : (
        <LikeUnfilledIcon width={18} height={16} fill={'var(--color-blue)'} />
      )}
    </button>
  );
};

export default LikeButton;
