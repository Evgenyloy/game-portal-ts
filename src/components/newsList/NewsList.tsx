import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import { CSSTransition } from 'react-transition-group';
import { useAppDispatch } from '../../hooks/hooks';

import { selectNews } from '../../slices/newsSlice';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import RandomGame from '../randomGame/RandomGame';
import { useGetNewsListQuery } from '../../api/apiSlice';
import { INews, TNodeRef } from '../../types/types';
import './newsList.scss';

const NewsList = () => {
  const {
    data: news = [],
    isLoading,
    isError,
    isSuccess,
  } = useGetNewsListQuery();

  const dispatch = useAppDispatch();

  const [itemPerPage, setItemPerPage] = useState(10);
  const [scrollUp, setScrollUp] = useState(false);
  let newsListCopy;

  const onNewsLoading = (news: INews[]) => {
    const filteredNews = news.filter(
      (news) => !news.article_content.includes('&lt')
    );
    const newsList = filteredNews.slice(0, itemPerPage);

    newsListCopy = newsList;
    return newsList;
  };

  const scrollHandler = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const innerHeight = window.innerHeight;

    if (
      scrollHeight - (scrollTop + innerHeight) < 150 &&
      newsListCopy.length < 45
    ) {
      setItemPerPage(itemPerPage + 10);
    }
  };

  const scrollUpHandler = () => {
    const scrollY = window.scrollY;
    scrollY > 700 ? setScrollUp(true) : setScrollUp(false);
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    window.addEventListener('scroll', scrollUpHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('scroll', scrollUpHandler);
    };
  });

  const onBtnUpClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const onNewsClick = (oneNews: INews) => {
    localStorage.setItem('news', JSON.stringify(oneNews));
    dispatch(selectNews(oneNews));
  };

  const nodeRef = useRef(null);
  const items = renderItemsView(onNewsLoading(news), nodeRef, onNewsClick);
  const className =
    isLoading || isError ? 'news-list__spinner ' : 'news-list__inner';
  const btnUpClassName = scrollUp ? 'btn-up' : 'btn-up btn-up_hide';

  return (
    <section className="news-list">
      <div className="container">
        <div className="news-list__wrapper">
          <div className="news-list__col-1">
            <ul className={className} ref={nodeRef}>
              {isLoading && <Spinner />}
              {isError && <ErrorMessage />}
              {isSuccess && items}
            </ul>
          </div>
          <div className="news-list__col-2">
            <div className="container">
              {' '}
              <RandomGame />{' '}
            </div>
          </div>
          <div className={btnUpClassName} onClick={onBtnUpClick}>
            <BsFillArrowUpCircleFill />
          </div>
        </div>
      </div>
    </section>
  );
};

const renderItemsView = (
  news: INews[],
  nodeRef: TNodeRef,
  onNewsClick: (oneNews: INews) => void
) => {
  const item = (
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
        {news.map((item) => {
          const { short_description, title, thumbnail, id } = item;
          return (
            <li className="news-list__item" key={id}>
              <div className="news-list__img-cont">
                <img src={thumbnail} alt={title} className="news-list__img" />
              </div>
              <div className="news-list__content-cont">
                <h3 className="news-list__title">{title}</h3>
                <Link
                  className="news-list__desc"
                  to="/news"
                  onClick={() => onNewsClick(item)}
                  onContextMenu={() => onNewsClick(item)}
                >
                  {short_description}
                </Link>
              </div>
            </li>
          );
        })}
      </>
    </CSSTransition>
  );

  return item;
};

export default NewsList;
