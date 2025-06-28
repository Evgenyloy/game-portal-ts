import { useRef, useMemo } from "react";
import Spinner from "../spinner/Spinner";
import { ErrorMessageSmall } from "../errorMessage/ErrorMessage";
import RandomGame from "../randomGame/RandomGame";
import { INews } from "../../types/types";
import NewsListItem from "./NewsListItem";
import ScrollUpButton from "./ScrollUpButton";
import { newsStore } from "../../store/newsStore";
import { useGetNewsList } from "../../hooks/gamesQueries";
import { useInfinityScroll } from "./useInfinityScroll";
import "./newsList.scss";
import { clsx } from "clsx";

const NewsList = () => {
  const {
    data: news = [] as INews[],
    isPending,
    isError,
    isSuccess,
  } = useGetNewsList();

  const setNews = newsStore.use.setNews();

  const newsListRef = useRef<HTMLUListElement>(null);

  let newsListCopy: INews[] = [];

  const onNewsLoading = (news: INews[]): INews[] => {
    const filteredNews = news.filter(
      (item) => !item.article_content.includes("&lt")
    );
    const newsList = filteredNews.slice(0, itemPerPage);

    newsListCopy = newsList;
    return newsList;
  };

  const { itemPerPage } = useInfinityScroll(newsListCopy);

  const onNewsClick = (oneNews: INews) => {
    localStorage.setItem("news", JSON.stringify(oneNews));
    setNews(oneNews);
  };

  const items = onNewsLoading(news);

  const contentClass = clsx({
    "news-list__loading-state": isPending || isError,
    "news-list__main-content": isSuccess,
  });

  const randomGameMemo = useMemo(() => <RandomGame />, []);

  return (
    <section className="news-list">
      <div className="container">
        <div className="news-list__wrapper">
          <div className="news-list__col-1">
            <ul className={contentClass} ref={newsListRef}>
              {isPending && <Spinner />}
              {isError && <ErrorMessageSmall />}
              {isSuccess && (
                <NewsListItem
                  news={items}
                  nodeRef={newsListRef}
                  onNewsClick={onNewsClick}
                />
              )}
            </ul>
          </div>
          <div className="news-list__col-2">
            <div className="container">{randomGameMemo}</div>
          </div>
          <ScrollUpButton />
        </div>
      </div>
    </section>
  );
};

export default NewsList;
