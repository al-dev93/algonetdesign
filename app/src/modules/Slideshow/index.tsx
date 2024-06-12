import { memo, useEffect, useMemo, useState } from 'react';

import { SkillsList } from '@components/SkillsList';
import { SocialMediaNavBar } from '@components/SocialMediaNavBar';
import { useFetchData } from '@hooks/useFetchData';

import { Fade } from './components/Fade';
import { PicturesScroller } from './components/PicturesScroller';
import { ScrollButtons } from './components/ScrollButtons';
import { SlideshowDots } from './components/SlideshowDots';
import style from './style.module.css';
import { PENDING, START, STOP } from './utils/constants';

import type { Slide, SlideshowProps, State } from './types';
import type { ProjectData } from '@/types';

/**
 *
 * @description // TODO: add comment
 * @param {SlideshowProps} { projectData, url }
 * @return {*}  {JSX.Element}
 * @al-dev93
 */
function MemoizedSlideshow({ projectData, url }: SlideshowProps): JSX.Element {
  // COMMENT: determine if we should fetch data based on the presence of buttons
  const shouldFetch = !projectData;
  // COMMENT: only use useFetch if shouldFetch is true
  const { data: fetchedData } = useFetchData(shouldFetch ? url : null, { method: 'GET' });
  console.log(fetchedData, url);
  // TODO: otherwise use buttons ... complete
  const data = useMemo(() => {
    return (projectData || (fetchedData as ProjectData[]))?.filter((item) => item.display === 'slideshow');
  }, [fetchedData, projectData]);

  const [slide, setSlide] = useState<Slide>({ current: 0, new: 0, loopSlide: false });
  const [state, setState] = useState<State>(STOP);

  /**
   * @description // TODO: add comment
   */
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (state === START) {
      timer = setTimeout(() => setState(PENDING), 300);
    }
    if (state === PENDING) {
      timer = setTimeout(() => setState(STOP), 300);
    }
    return () => clearTimeout(timer);
  }, [state]);

  return (
    data && (
      <article className={style.slideshow}>
        <div className={style.picturesScrollerWrapper}>
          <ScrollButtons slide={slide} setSlide={setSlide} setState={setState} maxIndex={data.length - 1} />
          <PicturesScroller slideContent={data} slide={slide} state={state} />
          <SlideshowDots slidesIndex={[...data.keys()]} active={slide.new} setSlide={setSlide} setState={setState} />
        </div>
        <Fade state={state} slide={slide}>
          <div className={style.slideshowWrapper}>
            <header className={style.header}>
              <h3>{data[state === START ? slide.current : slide.new].title}</h3>
            </header>
            <p className={style.description}>{data[state === START ? slide.current : slide.new].description}</p>
            <footer className={style.footer}>
              <SkillsList list={data[state === START ? slide.current : slide.new].tags} />
              <SocialMediaNavBar
                className={style.navButtons}
                changeLinkColor={style.externalLinks}
                buttons={data[state === START ? slide.current : slide.new].deliverables}
              />
            </footer>
          </div>
        </Fade>
      </article>
    )
  );
}

export const Slideshow = memo(MemoizedSlideshow);
