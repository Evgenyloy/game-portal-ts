import { useCallback, useEffect, useRef } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
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

  const content = NewsView(onNewsLoaded(news), setNews, nodeRef);
  const className = isPending || isError ? "news__spinner" : "news__inner";

  return (
    <section className="news">
      <div className="container">
        <div className="news__top">
          <div className="news__info">Last news</div>
          <div className="news__button button">
            <button onClick={() => handleButtonClick()}>browse all</button>
          </div>
        </div>

        <div className={className} ref={nodeRef}>
          {isError && <ErrorMessage />}
          {isPending && <Spinner />}
          {isSuccess && content}
        </div>
      </div>
    </section>
  );
}

export default NewsBlock;
