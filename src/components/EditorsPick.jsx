import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAPI } from 'context/APIContext';
import { TypeD } from 'components';
import 'styles/Card.css';
import style from 'styles/EditorsPick.module.css';

function EditorsPick() {
  const { t } = useTranslation();
  const { api } = useAPI();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setContent(null);

      try {
        return api.editors();
      } catch (e) {
        setError(e);
      }
    };

    fetchData().then((res) => {
      setContent(res);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    });
  }, []);

  if (loading || error || !content) return null;

  return (
    <section className={style.content__wrap}>
      <hgroup className={style.content__title}>
        <h1>{t(`editor.title`)}</h1>
        <h2>{content.subtitle}</h2>
      </hgroup>
      <TypeD content={content} />
    </section>
  );
}

export default EditorsPick;
