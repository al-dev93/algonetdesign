import { useEffect, useState } from 'react';

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
import type { AccountLink, ProjectData } from '@/types';

/**
 * @description
 * @returns
 */
export function Slideshow({ projectData, url }: SlideshowProps): JSX.Element {
  // COMMENT: determine if we should fetch data based on the presence of buttons
  const shouldFetch = !projectData;
  // COMMENT: only use useFetch if shouldFetch is true
  const { data: fetchedData } = useFetchData(shouldFetch ? url : null, { method: 'GET' });
  // COMMENT: otherwise use buttons
  const data = (projectData || (fetchedData as ProjectData[]))?.filter((item) => item.display === 'slideshow');

  const [slide, setSlide] = useState<Slide>({ current: 0, new: 0, loopSlide: false });
  const [state, setState] = useState<State>(STOP);
  const pictoLinkList = data.reduce((acc: { link: string | undefined; picture: string }[], current) => {
    const link = current.deliverables.find((item) => item.service === 'external')?.address;
    return current.picture ? [...acc, { link, picture: current.picture }] : [...acc];
  }, []);

  /**
   * @description
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
    <article className={style.slideshow}>
      <div className={style.picturesScrollerWrapper}>
        <ScrollButtons slide={slide} setSlide={setSlide} setState={setState} maxIndex={pictoLinkList.length - 1} />
        <PicturesScroller pictoLinkList={pictoLinkList} slide={slide} state={state} />
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
              buttons={data[state === START ? slide.current : slide.new].deliverables as AccountLink[]}
            />
          </footer>
        </div>
      </Fade>
    </article>
  );
}
