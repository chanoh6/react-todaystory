import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAPI } from 'context/APIContext';
import { decode } from 'html-entities';
import { formatAgo } from 'utils/date';
import Vibrant from 'node-vibrant';
import styled, { StyleSheetManager } from 'styled-components';
import { LikeButton } from 'components';
import { ViewIcon } from 'assets';
import 'styles/Card.css';
import style from 'styles/EditorsPick.module.css';

// styled-components: 컴포넌트 스타일링
const ContnetWrap = styled.section`
  background: ${(props) =>
    props.gradient
      ? `linear-gradient(180deg, rgba(${props.gradient[0].join(', ')}, 0.5) 0%, rgba(${props.gradient[1].join(
          ', ',
        )}, 0.5) 100%)`
      : 'var(--color-white)'};
`;

const EditorsPick = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { api } = useAPI();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [gradient, setGradient] = useState(null);
  const locale = process.env.REACT_APP_LOCALE;

  const onErrorImg = (e) => (e.target.src = process.env.REACT_APP_ERROR_IMG);
  const onErrorLogo = (e) => (e.target.src = process.env.REACT_APP_ERROR_LOGO);

  // Vibrant: 이미지 색상 추출
  const getGradient = async (image) => {
    const palatte = await Vibrant.from('/ko_v2/assets/test.jpg').getPalette();

    if (palatte && palatte.Vibrant && palatte.Muted) {
      let startColor = palatte.LightVibrant ? palatte.LightVibrant.getRgb() : palatte.Vibrant.getRgb();
      let endColor = palatte.LightMuted ? palatte.DarkVibrant.getRgb() : palatte.Muted.getRgb();

      setGradient([startColor, endColor]);
    }
  };

  // fetchData: API 호출
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await api.editorsPick();
      return res;
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  // useEffect: 컴포넌트 렌더링 후 한 번만 실행
  useEffect(() => {
    fetchData().then((res) => {
      if (res.code === '0') {
        setData(res.data);
        getGradient();
      } else {
        console.log(`API error: ${res.msg[process.env.REACT_APP_LOCALE]}`);
      }
    });
  }, []);

  if (loading || error || !data) return null;

  return (
    <StyleSheetManager shouldForwardProp={(prop) => !['gradient'].includes(prop)}>
      <ContnetWrap className={style.content__wrap} gradient={gradient}>
        <hgroup className={style.content__title}>
          <h1>{t(`editor.title`)}</h1>
          <h2>{data.subTopic}</h2>
        </hgroup>
        {data.contents.map((content, i) => (
          <article
            key={i}
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
              <div className="date">
                <span id="publishedAt">{formatAgo(content.publishDate, locale)}</span>
                <span>|</span>
                <span id="category">{decode(content.category)}</span>
              </div>
              <div className="like">
                <ViewIcon width={16} height={16} />
                <p id="viewCount">{Number(content.viewCount).toLocaleString('ko-KR')}</p>
                <LikeButton idx={content.idx} />
              </div>
            </div>
          </article>
        ))}
      </ContnetWrap>
    </StyleSheetManager>
  );
};

export default EditorsPick;
