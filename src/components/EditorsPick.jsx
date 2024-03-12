import { useTranslation } from 'react-i18next';
import { useEditorsPick } from 'hooks/useStories';
import { TypeD } from 'components';
import 'styles/Card.css';
import style from 'styles/EditorsPick.module.css';

function EditorsPick() {
  const { t } = useTranslation();
  const { loading, error, data } = useEditorsPick();
  const { contents } = data;

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
}

export default EditorsPick;
