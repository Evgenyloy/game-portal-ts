import React, { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { newsStore } from "../../store/newsStore";
import "./oneNews.scss";

const OneNews = () => {
  const news = newsStore.use.selectedNews();
  const myRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    if (myRef.current === null) return;
    myRef.current.innerHTML = news.article_content;
    // eslint-disable-next-line
  }, []);

  const nodeRef = useRef(null);

  return (
    <CSSTransition
      classNames="transition"
      nodeRef={nodeRef}
      in
      timeout={200}
      appear
    >
      {
        <article className="certain-news" ref={nodeRef}>
          <div className="container">
            <div className="certain-news__header">
              <h3 className="certain-news__title"> {news.title}</h3>
              <p className="certain-news__desc">{news.short_description}</p>
            </div>
            <div className="certain-news__content" ref={myRef}></div>
          </div>
        </article>
      }
    </CSSTransition>
  );
};

export default OneNews;
