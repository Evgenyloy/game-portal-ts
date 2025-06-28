import { useCallback, useEffect, useRef } from "react";
import clsx from "clsx";
import { ErrorMessage } from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import { newsStore } from "../../store/newsStore";
import { useGetNewsList } from "../../hooks/gamesQueries";
import NewsView from "./NewsView";
import { onNewsLoaded } from "./utils";
import "./newsBlock.scss";

function NewsBlock() {
  const { data: news = [], isPending, isError, isSuccess } = useGetNewsList();
  const setNews = newsStore.use.setNews();
  let newsList = useRef<null | HTMLDivElement>(null);
  const nodeRef = useRef(null);

  const handleButtonClick = useCallback(() => {
    if (newsList.current === null) return;
    newsList.current.scrollIntoView({ block: "start", behavior: "smooth" });
  }, []);

  useEffect(() => {
    newsList.current = document.querySelector(".news-list");
  }, [handleButtonClick]);

  const content = onNewsLoaded(news);

  const contentClassName = clsx({
    "news__main-content": isSuccess,
    "news__loading-state": isPending || isError,
  });

  return (
    <section className="news">
      <div className="container">
        <div className="news__top">
          <h2 className="news__info-title">Last news</h2>
          <div className="news__button button">
            <button onClick={() => handleButtonClick()}>browse all</button>
          </div>
        </div>

        <div className={contentClassName} ref={nodeRef}>
          {isError && <ErrorMessage />}
          {isPending && <Spinner />}
          {isSuccess && (
            <NewsView content={content} setNews={setNews} nodeRef={nodeRef} />
          )}
        </div>
      </div>
    </section>
  );
}

export default NewsBlock;
