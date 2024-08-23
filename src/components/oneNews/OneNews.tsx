import React, { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useAppSelector } from '../../hooks/hooks';

import './oneNews.scss';

const OneNews = () => {
  const selectedNews = useAppSelector((state) => state.news.selectedNews);
  const myRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    if (myRef.current === null) return;
    myRef.current.innerHTML = selectedNews.article_content;
    // eslint-disable-next-line
  }, []);

  const nodeRef = useRef(null);

  return (
    <CSSTransition
      classNames="transition"
      nodeRef={nodeRef}
      in
      timeout={{
        appear: 200,
        enter: 200,
        exit: 200,
      }}
      appear
    >
      {
        <article className="certain-news" ref={nodeRef}>
          <div className="container">
            <div className="certain-news__header">
              <h3 className="certain-news__title"> {selectedNews.title}</h3>
              <p className="certain-news__desc">
                {selectedNews.short_description}
              </p>
            </div>
            <div className="certain-news__content" ref={myRef}></div>
          </div>
        </article>
      }
    </CSSTransition>
  );
};
export default OneNews;
