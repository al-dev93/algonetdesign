import React, { memo, useEffect, useMemo, useReducer } from 'react';

import { SkillsList } from '@components/SkillsList';
import { SocialMediaNavBar } from '@components/SocialMediaNavBar';
import { useFetchData } from '@hooks/useFetchData';

import { Fade } from './components/Fade';
import { PicturesScroller } from './components/PicturesScroller';
import { ScrollButtons } from './components/ScrollButtons';
import { SlideshowDots } from './components/SlideshowDots';
import { slideshowInitialState } from './reducer/slideshowInitialState';
import { slideshowReducer } from './reducer/slideshowReducer';
import style from './style.module.css';
import { INIT_MAX_INDEX_SLIDE, PENDING, SLIDE_TRANSITION, START, STOP } from './utils/constants';

import type { SlideshowProps } from './types';
import type { AccountLink, ProjectData } from '@/types';

/**
 *
 * @description // TODO: add comment
 * @param {SlideshowProps} { projectData, url }
 * @return {React.JSX.Element}
 * @al-dev93
 */
function MemoizedSlideshow({ data: slideshowData, url }: SlideshowProps): React.JSX.Element {
  // COMMENT: determine if we should fetch data based on the presence of buttons
  const shouldFetch = !slideshowData;
  // COMMENT: only use useFetch if shouldFetch is true
  const { data: fetchedData } = useFetchData(shouldFetch ? url : null, { method: 'GET' });

  // useEffect(() => {
  //   setFetchOptionsData(shouldFetch ? url : null, { method: 'GET' });
  // }, [setFetchOptionsData, shouldFetch, url]);

  // TODO: otherwise use buttons ... complete
  const data = useMemo(() => {
    return (slideshowData || (fetchedData as ProjectData[]))?.filter((item) => item.display === 'slideshow');
  }, [fetchedData, slideshowData]);

  const [slideshowState, slideshowDispatch] = useReducer(slideshowReducer, slideshowInitialState);

  useEffect(() => {
    if (data) slideshowDispatch({ type: INIT_MAX_INDEX_SLIDE, payload: { maxIndexSlide: data.length - 1 } });
  }, [data]);

  /**
   * @description // TODO: add comment
   */
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (slideshowState.slideTransition === START) {
      timer = setTimeout(() => slideshowDispatch({ type: SLIDE_TRANSITION, payload: PENDING }), 300);
    }
    if (slideshowState.slideTransition === PENDING) {
      timer = setTimeout(() => slideshowDispatch({ type: SLIDE_TRANSITION, payload: STOP }), 300);
    }
    return () => clearTimeout(timer);
  }, [slideshowState.slideTransition]);

  const activeSlide = data?.[slideshowState.slideTransition === START ? slideshowState.current : slideshowState.new];

  return (
    activeSlide && (
      <article className={style.slideshow}>
        <div className={style.picturesScrollerWrapper}>
          <ScrollButtons slideshowDispatch={slideshowDispatch} />
          <PicturesScroller slideContent={data} slideshowState={slideshowState} />
          <SlideshowDots
            slidesIndex={[...data.keys()]}
            slideshowDispatch={slideshowDispatch}
            slideshowState={slideshowState}
          />
        </div>
        <Fade state={slideshowState}>
          <div className={style.slideshowWrapper}>
            <header className={style.header}>
              <h3>{activeSlide.title}</h3>
            </header>
            <p className={style.description}>{activeSlide.description}</p>
            <footer className={style.footer}>
              <SkillsList list={activeSlide.tags} tagType='filled' />
              <SocialMediaNavBar
                className={style.navButtons}
                changeLinkColor={style.externalLinks}
                buttons={activeSlide.deliverables as AccountLink[]}
              />
            </footer>
          </div>
        </Fade>
      </article>
    )
  );
}

export const Slideshow = memo(MemoizedSlideshow);
