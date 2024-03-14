import { useTranslation } from 'react-i18next';
import { useEditorsPick } from 'hooks/useStories';
import { TypeD } from 'components';
import 'styles/Card.css';
import style from 'styles/EditorsPick.module.css';
import { useState, useEffect } from 'react';

const EditorsPick = () => {
  const { t } = useTranslation();
  const { loading, error, data } = useEditorsPick();
  const { contents } = data || {};
  const [colors, setColors] = useState([]);

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
  if (loading || error || !contents) return null;

  return (
    <section className={style.content__wrap}>
      <hgroup className={style.content__title}>
        <h1>{t(`editor.title`)}</h1>
        <h2>{contents.subtitle}</h2>
      </hgroup>
      {contents.map((content, i) => (
        <TypeD key={i} content={content} />
      ))}
    </section>
  );
};

export default EditorsPick;
