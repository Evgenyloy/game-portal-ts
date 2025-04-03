import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { INews } from '../../types/types';
import { RefObject } from 'react';

function NewsListItem(
  news: INews[],
  nodeRef: RefObject<HTMLUListElement>,
  onNewsClick: (oneNews: INews) => void
) {
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
}

export default NewsListItem;
