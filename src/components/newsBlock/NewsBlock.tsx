import { useRef } from "react";
import clsx from "clsx";
import { ErrorMessage } from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import { newsStore } from "../../store/newsStore";
import { useGetNewsList } from "../../hooks/gamesQueries";
import NewsView from "./NewsView";
import { onNewsLoaded } from "./utils";
import { Link } from "react-router-dom";
import "./newsBlock.scss";

function NewsBlock() {
  const { data: news = [], isPending, isError, isSuccess } = useGetNewsList();
  const setNews = newsStore.use.setNews();
  const nodeRef = useRef(null);

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
            <Link to={"/news-list"}>browse all</Link>
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
