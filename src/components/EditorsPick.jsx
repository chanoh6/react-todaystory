import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAPI } from 'context/APIContext';
import { decode } from 'html-entities';
import { formatAgo } from 'utils/date';
import Vibrant from 'node-vibrant';
import styled, { StyleSheetManager } from 'styled-components';
import { LikeButton } from 'components';
import 'styles/Card.css';
import style from 'styles/EditorsPick.module.css';

// styled-components: 컴포넌트 스타일링
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

const fetchEditorsPick = async (api) => {
  const storageKey = `editorsPick`;
  const storedData = localStorage.getItem(storageKey);
  const now = new Date().getTime();

  if (storedData) {
    const { lastFetched, data } = JSON.parse(storedData);
    const staleTime = 5 * 60 * 1000;

    if (now - lastFetched < staleTime) {
      return data;
    }
  }

  try {
    const response = await api.editorsPick();
    if (response.code !== '0') {
      throw new Error(`API error: ${response.msg[process.env.REACT_APP_LOCALE]}`);
    }
    const newData = response.data;
    
    localStorage.setItem(storageKey, JSON.stringify({
      lastFetched: now,
      data: newData
    }));

    return newData;
  } catch (error) {
    throw error;
  }
};

const EditorsPick = React.memo(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { api } = useAPI();
  const [gradient, setGradient] = useState(null);
  const locale = process.env.REACT_APP_LOCALE;

  const { data, error, isLoading } = useQuery(['editorsPick'], () => fetchEditorsPick(api), {
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
    onError: (error) => console.error(error),
  });

  const onErrorImg = (e) => (e.target.src = process.env.REACT_APP_ERROR_IMG);
  const onErrorLogo = (e) => (e.target.src = process.env.REACT_APP_ERROR_LOGO);

  // Vibrant: 이미지 색상 추출
  const getGradient = async (url) => {
    const imageURL = `${process.env.REACT_APP_THUMBNAIL_IMG_URL}${url}`;

    try {
      const res = await api.imageLoad(imageURL);
      return res;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!data) return;
    // 개발 환경 적용
    /*
    getGradient(data.contents[0].thumbnail).then((res) => {
      const base64Image = res;
      Vibrant.from(`data:image/jpeg;base64,${base64Image}`)
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
    });
    */

    // 도메인 변경시 적용
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
          <h1>{t(`editor.title`)}</h1>
          <h2>{data.subTopic}</h2>
        </hgroup>
        {data.contents.map((content, i) => (
          <React.Fragment key={i}>
            <article
              className={style.card}
              onClick={() => navigate(`${process.env.REACT_APP_WEB_STORY_URL}${content.idx}`)}
            >
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
