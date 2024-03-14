import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAPI } from 'context/APIContext';
import { TypeD } from 'components';
import 'styles/Card.css';
import style from 'styles/EditorsPick.module.css';

const EditorsPick = () => {
  const { t } = useTranslation();
  const { api } = useAPI();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [colors, setColors] = useState([]);

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
      } else {
        console.log(`API error: ${res.msg[process.env.REACT_APP_LOCALE]}`);
      }
    });
  }, []);

  // useEffect(() => {
  //   const image = new Image();
  //   image.crossOrigin = 'Anonymous';
  //   image.src = imageUrl;

  //   image.onload = () => {
  //     const canvas = document.createElement('canvas');
  //     canvas.width = image.width;
  //     canvas.height = image.height;

  //     const context = canvas.getContext('2d');
  //     context.drawImage(image, 0, 0);

  //     const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;

  //     const pixelColors = [];
  //     for (let i = 0; i < imageData.length; i += 4) {
  //       const r = imageData[i];
  //       const g = imageData[i + 1];
  //       const b = imageData[i + 2];
  //       pixelColors.push(`rgb(${r}, ${g}, ${b})`);
  //     }

  //     setColors(pixelColors);
  //   };
  // }, [imageUrl]);

  if (loading || error || !data) return null;

  return (
    <section className={style.content__wrap}>
      <hgroup className={style.content__title}>
        <h1>{t(`editor.title`)}</h1>
        <h2>{data.subTopic}</h2>
      </hgroup>
      {data.contents.map((content, i) => (
        <TypeD key={i} content={content} />
      ))}
    </section>
  );
};

export default EditorsPick;
