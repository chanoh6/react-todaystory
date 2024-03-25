import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAPI } from 'context/APIContext';
import { TypeD } from 'components';
import 'styles/Card.css';
import style from 'styles/EditorsPick.module.css';
import Vibrant from 'node-vibrant';
import styled, { css } from 'styled-components';

const EditorsPick = () => {
  const { t } = useTranslation();
  const { api } = useAPI();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [colors, setColors] = useState(null);

  const ContnetWrap = styled.section`
    ${colors &&
    css`
      background: linear-gradient(
        180deg,
        rgba(${colors[0].join(', ')}, 0.5) 0%,
        rgba(${colors[1].join(', ')}, 0.5) 100%
      );
    `}
  `;

  const getGradient = async (image) => {
    const palatte = await Vibrant.from('/ko_v2/assets/test.jpg').getPalette();

    if (palatte && palatte.Vibrant && palatte.Muted) {
      let startColor = palatte.LightVibrant ? palatte.LightVibrant.getRgb() : palatte.Vibrant.getRgb();
      let endColor = palatte.LightMuted ? palatte.DarkVibrant.getRgb() : palatte.Muted.getRgb();

      setColors([startColor, endColor]);
    }
  };

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
    <ContnetWrap className={style.content__wrap}>
      <hgroup className={style.content__title}>
        <h1>{t(`editor.title`)}</h1>
        <h2>{data.subTopic}</h2>
      </hgroup>
      {data.contents.map((content, i) => (
        <TypeD key={i} content={content} />
      ))}
    </ContnetWrap>
  );
};

export default EditorsPick;
