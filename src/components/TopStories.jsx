import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useAPI } from 'context/APIContext';
import { useAdContext } from 'context/AdContext';
import useFetchData from 'hooks/useFetchData';
import { StoriesSkeleton, TypeA, TypeB, TypeC } from 'components';
import style from 'styles/Stories.module.css';
import adStyle from 'styles/Ad.module.css';

const TopStories = React.memo(() => {
  const { t } = useTranslation();
  const { api } = useAPI();
  const { isGPTLoaded } = useAdContext();
  const size = process.env.REACT_APP_TOP_STORIES_SIZE;
  // 탑 스토리 데이터
  const { data, error, isLoading } = useFetchData(() => api.topStories(size), `topStories`);

  // 광고 로드
  const loadAd = (adUnitPath, adSizes, adSlotId) => {
    if (window.googletag && document.getElementById(adSlotId)) {
      window.googletag.cmd.push(function () {
        const existingSlot = window.googletag
          .pubads()
          .getSlots()
          .find((slot) => slot.getSlotElementId() === adSlotId);
        if (existingSlot) return;

        window.googletag.defineSlot(adUnitPath, adSizes, adSlotId).addService(window.googletag.pubads());
        window.googletag.display(adSlotId);
      });
    }
  };

  useEffect(() => {
    loadAd(
      '/284705699/Samsung_life/Samsung_KR_life_list_between_top_list',
      [[200, 200], [320, 100], [320, 180], [320, 50], [336, 280], [300, 250], 'fluid'],
      'div-gpt-ad-1628051169428-0',
    );
  }, [isGPTLoaded]);

  if (isLoading || error || !data) return <StoriesSkeleton />;

  const middleIndex = Math.ceil(data.contents.length / 2);

  return (
    <>
      <div className={style.content__title}>
        <h1 className={style.title} style={{ color: `var(--color-dark-blue)` }}>
          {t(`main.top`)}
        </h1>
      </div>
      <ul className={style.list}>
        {data.contents.map((content, i) => {
          if (i === 0) {
            return <TypeA key={i} content={content} />;
          } else if (i === 1 || i === 2) {
            return <TypeB key={i} content={content} />;
          } else if (i === middleIndex) {
            return (
              <React.Fragment key={i}>
                {/* /284705699/Samsung_life/Samsung_KR_life_list_between_top_list */}
                <li className={adStyle.ad__home}>
                  <div id="div-gpt-ad-1628051169428-0"></div>
                </li>
                <TypeC key={i} content={content} />
              </React.Fragment>
            );
          } else {
            return <TypeC key={i} content={content} />;
          }
        })}
      </ul>
    </>
  );
});

export default TopStories;
