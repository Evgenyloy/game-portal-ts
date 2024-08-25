import { useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useAppDispatch } from '../../hooks/hooks';

import { selectNews } from '../../slices/newsSlice';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { useGetNewsListQuery } from '../../api/apiSlice';
import { INews, TNodeRef } from '../../types/types';
import './newsBlock.scss';

const NewsBlock = () => {
  const dispatch = useAppDispatch();
  const {
    data: news = [],
    isLoading,
    isError,
    isSuccess,
  } = useGetNewsListQuery();

  const onNewsLoaded = (news: INews[]) => {
    const filteredNews = news.filter(
      (news) => !news.article_content.includes('&lt')
    );
    const newsArr = filteredNews.slice(0, 4);
    return newsArr;
  };

  const handleNewsClick = (oneNewsItem: INews) => {
    dispatch(selectNews(oneNewsItem));
    localStorage.setItem('news', JSON.stringify(oneNewsItem));
  };

  let newsList = useRef<null | HTMLDivElement>(null);
  const handleButtonClick = useCallback(() => {
    if (newsList.current === null) return;
    newsList.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, []);

  useEffect(() => {
    newsList.current = document.querySelector('.news-list');
  }, [handleButtonClick]);

  const nodeRef = useRef(null);
  const content = renderItemsView(onNewsLoaded(news), handleNewsClick, nodeRef);
  const className = isLoading || isError ? 'news__spinner' : 'news__inner';

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
          {isLoading && <Spinner />}
          {isSuccess && content}
        </div>
      </div>
    </section>
  );
};

const renderItemsView = (
  newsArr: INews[],
  handleNewsClick: (oneNews: INews) => void,
  nodeRef: TNodeRef
) => {
  let newsItemNum = 1;

  const items = (
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
      <>
        {newsArr.map((oneNews) => {
          let className = `news__item news__item${newsItemNum++}`;
          const { title, id, main_image } = oneNews;

          return (
            <div className={className} key={id}>
              <Link
                className="news__link"
                to="/news"
                onClick={() => {
                  handleNewsClick(oneNews);
                }}
                onContextMenu={() => {
                  handleNewsClick(oneNews);
                }}
              >
                <img className="news__img" src={main_image} alt="thumbnail" />
              </Link>
              <div className="news__title">{title}</div>
            </div>
          );
        })}
      </>
    </CSSTransition>
  );

  return items;
};

export default NewsBlock;
