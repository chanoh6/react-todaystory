import { useTranslation } from 'react-i18next';
import style from 'styles/PolicyPrivacy.module.css';
import { CloseIcon } from 'assets';
import { useNavigate } from 'react-router';

const Policy = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={style.contents__wrap}>
      <button className={style.icon} onClick={() => navigate(-1)}>
        <CloseIcon width={16} height={16} fill={'var(--color-black)'} />
      </button>
      <h2>{t(`privacy.main-title`)}</h2>
      <p>{t(`privacy.main-contents`)}</p>
      <article>
        <h4>{t(`privacy.sub-title1`)}</h4>
        <ul>
          <li>{t(`privacy.sub-contents1-1`)}</li>
          <li>{t(`privacy.sub-contents1-2`)}</li>
        </ul>
      </article>
      <article>
        <h4>{t(`privacy.sub-title2`)}</h4>
        <ul>
          <li>{t(`privacy.sub-title2-1`)}</li>
          <li>
            {t(`privacy.sub-title2-2`)}
            <ul>
              <br />
              <li>
                {t(`privacy.sub-title2-3`)}
                <ul>
                  <li>{t(`privacy.sub-contents2-3-a`)}</li>
                  <li>{t(`privacy.sub-contents2-3-b`)}</li>
                  <li>{t(`privacy.sub-contents2-3-c`)}</li>
                  <li>{t(`privacy.sub-contents2-3-d`)}</li>
                  <li>{t(`privacy.sub-contents2-3-e`)}</li>
                  <li>{t(`privacy.sub-contents2-3-f`)}</li>
                </ul>
              </li>
              <br />
              <li>{t(`privacy.sub-title2-4`)}</li>
              <br />
              <li>
                {t(`privacy.sub-title2-5`)}
                <ul>
                  <li>
                    {t(`privacy.sub-contents2-5-a`)}
                    <p>{t(`privacy.sub-contents2-5-a-1`)}</p>
                  </li>
                  <li>
                    {t(`privacy.sub-contents2-5-b`)}
                    <p>{t(`privacy.sub-contents2-5-b-1`)}</p>
                    <p>{t(`privacy.sub-contents2-5-b-2`)}</p>
                    <p>https://jp.weathernews.com/irinfo/securities/</p>
                  </li>
                  <li>
                    {t(`privacy.sub-contents2-5-c`)}
                    <p>{t(`privacy.sub-contents2-5-c-1`)}</p>
                  </li>
                  <li>
                    {t(`privacy.sub-contents2-5-d-1`)}
                    <p>{t(`privacy.sub-contents2-5-d-2`)}</p>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </article>
      <article>
        <h4>{t(`privacy.sub-title3`)}</h4>
        <ul>
          <li>
            {t(`privacy.sub-contents3-1`)}
            <ul>
              <li>{t(`privacy.sub-contents3-1-1`)}</li>
              <li>{t(`privacy.sub-contents3-1-2`)}</li>
              <li>{t(`privacy.sub-contents3-1-3`)}</li>
              <li>{t(`privacy.sub-contents3-1-4`)}</li>
            </ul>
          </li>
        </ul>
      </article>
      <article>
        <h4>{t(`privacy.sub-title4`)}</h4>
        <p>{t(`privacy.sub-contents4-1`)}</p>
      </article>
      <article>
        <h4>{t(`privacy.sub-title5`)}</h4>
        <ul>
          <li>{t(`privacy.sub-contents5-1`)}</li>
          <li>{t(`privacy.sub-contents5-2`)}</li>
        </ul>
      </article>
      <article>
        <h4>{t(`privacy.sub-title6`)}</h4>
        <ul>
          <li>{t(`privacy.sub-contents6-1`)}</li>
          <li>{t(`privacy.sub-contents6-2`)}</li>
        </ul>
      </article>
      <article>
        <h4>{t(`privacy.sub-title7`)}</h4>
        <ul>
          <li>{t(`privacy.sub-contents7-1`)}</li>
        </ul>
      </article>
      <article>
        <h4>{t(`privacy.sub-title8`)}</h4>
        <li>{t(`privacy.sub-contents8-1`)}</li>
        <li>{t(`privacy.sub-contents8-2`)}</li>
      </article>
      <article>
        <h4>{t(`privacy.sub-title9`)}</h4>
        <ul>
          <li>{t(`privacy.sub-title9-1`)}</li>
        </ul>
      </article>
      <section className={style.footer__wrap}>
        {t(`privacy.footer-txt1`)}
        <br />
        {t(`privacy.footer-txt2`)}
        <br />
        {t(`privacy.footer-txt3`)}
      </section>
      <section className={style.bottom__contents}>
        <h2>{t(`privacy.sub-title10`)}</h2>
        <p>{t(`privacy.sub-contents10-1`)}</p>
      </section>
      <section>
        <h2>{t(`privacy.sub-title11`)}</h2>
        <p>{t(`privacy.sub-contents11-1`)}</p>
      </section>
      <section>
        <h2>{t(`privacy.sub-title12`)}</h2>
        <p>{t(`privacy.sub-contents12-1`)}</p>
      </section>
    </div>
  );
};

export default Policy;
