import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { CloseIcon } from 'assets';
import style from 'styles/PolicyPrivacy.module.css';

const Service = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className={style.contents__wrap}>
      <button type="button" aria-label="close_button" className={style.icon} onClick={() => navigate(-1)}>
        <CloseIcon width={16} height={16} fill={'var(--color-black)'} />
      </button>
      <h2>{t(`service.title1`)}</h2>
      <p>{t(`service.contents1`)}</p>
      <h2>{t(`service.title2`)}</h2>
      <p>{t(`service.contents2`)}</p>
      <h2>{t(`service.title3`)}</h2>
      <p>{t(`service.contents3`)}</p>
      <h2>{t(`service.title4`)}</h2>
      <p>{t(`service.contents4`)}</p>
      <h2>{t(`service.title5`)}</h2>
      <p>{t(`service.contents5`)}</p>
      <h2>{t(`service.title6`)}</h2>
      <p>{t(`service.contents6`)}</p>
      <h2>{t(`service.title7`)}</h2>
      <p>{t(`service.contents7`)}</p>
      <p>{t(`service.contents7-1`)}</p>
    </div>
  );
};

export default Service;
