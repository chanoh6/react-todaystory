import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAPI } from 'context/APIContext';
import useFetchData from 'hooks/useFetchData';
import { decode } from 'html-entities';
import { formatAgo } from 'utils/date';
import Vibrant from 'node-vibrant';
import styled, { StyleSheetManager } from 'styled-components';
import { LikeButton } from 'components';
import 'styles/Card.css';
import style from 'styles/EditorsPick.module.css';

// styled-components: 그라데이션 색상을 적용하기 위한 컴포넌트
const ContentWrap = styled.div`
  background: ${(props) =>
    props.gradient &&
    `linear-gradient(to bottom, rgba(${props.gradient[0].join(', ')}, 0.4) 0%, rgba(${props.gradient[1].join(
      ', ',
    )}, 0.8) 100%)`};
`;

const Background = styled.div`
  background-color: ${(props) => props.gradient && `rgba(${props.gradient[0].join(', ')}, 0.2)`};
`;

const EditorsPick = React.memo(() => {
  const locale = process.env.REACT_APP_LOCALE;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { api } = useAPI();
  const [gradient, setGradient] = useState(null);
  // 에디터픽 데이터
  const { data, error, isLoading } = useFetchData(() => api.editorsPick(), 'editorsPick');

  // 이미지 로딩 실패시 대체 이미지 적용
  const onErrorImg = (e) => {
    // 더 이상의 onerror 이벤트 처리를 하지 않도록 설정
    e.target.onerror = null;
    // 대체 이미지로 변경
    e.target.src = process.env.REACT_APP_ERROR_IMG;
  };

  // 로고 로딩 실패시 대체 이미지 적용
  const onErrorLogo = (e) => {
    e.target.onerror = null;
    e.target.src = process.env.REACT_APP_ERROR_LOGO;
  };

  // 카드 클릭 시 해당 상세 스토리로 이동
  const handleClick = (idx) => navigate(`${process.env.REACT_APP_WEB_STORY_URL}${idx}`);

  // 에디터픽 데이터가 로드되면 배경 그라데이션 색상 추출
  // issue: 이미지 파일 형식이 webp로 변경되고 나서 vibrant에서 지원하지 않는 형식이라 추출이 안될 수 있음, 다른 라이브러리 사용 필요
  useEffect(() => {
    if (!data || data.contents.length === 0) return;

    const imageURL = `${process.env.REACT_APP_THUMBNAIL_IMG_URL}${data.contents[0].thumbnail}`;

    Vibrant.from(imageURL)
      .getPalette()
      .then((palette) => {
        let startColor = palette.LightMuted ? palette.LightMuted.getRgb() : palette.Vibrant.getRgb();
        let endColor = palette.DarkMuted ? palette.DarkMuted.getRgb() : palette.Muted.getRgb();

        startColor = startColor.map((color) => Math.round(color));
        endColor = endColor.map((color) => Math.round(color));

        setGradient([startColor, endColor]);
      })
      .catch((err) => {
        console.error('Failed to extract colors with Vibrant:', err);
      });
  }, [data]);

  if (isLoading || error || !data) return null;

  return (
    <StyleSheetManager shouldForwardProp={(prop) => !['gradient'].includes(prop)}>
      <ContentWrap className={style.content__wrap} gradient={gradient}>
        <hgroup className={style.content__title}>
          <h1>{t(`main.editor`)}</h1>
          <h2>{data.subTopic || ''}</h2>
        </hgroup>
        {data.contents.map((content, i) => (
          <React.Fragment key={i}>
            <article className={style.card} onClick={() => handleClick(content.idx)}>
              <div className={style.card__img}>
                <figure className={style.thumbnail}>
                  <img
                    loading="lazy"
                    src={`${process.env.REACT_APP_THUMBNAIL_IMG_URL}${content.thumbnail}`}
                    alt="thumbnail"
                    onError={onErrorImg}
                  />
                </figure>
                <figure className={style.background}>
                  <img
                    loading="lazy"
                    src={`${process.env.REACT_APP_THUMBNAIL_IMG_URL}${content.thumbnail}`}
                    alt="background"
                    onError={onErrorImg}
                  />
                </figure>
              </div>
              <div className="card__title">
                <div className="cp">
                  <img
                    loading="lazy"
                    src={`${process.env.REACT_APP_LOGO_IMG_URL}${content.logo}`}
                    alt="cp logo"
                    onError={onErrorLogo}
                  />
                  <p>{decode(content.cp)}</p>
                </div>
                <p className="title">{decode(content.title)}</p>
              </div>
              <div className="card__more">
                <span id="publishedAt">{formatAgo(content.publishDate, locale)}</span>
                <LikeButton idx={content.idx} />
              </div>
              <Background className={style.card__background} gradient={gradient} />
            </article>
          </React.Fragment>
        ))}
      </ContentWrap>
    </StyleSheetManager>
  );
});

export default EditorsPick;
