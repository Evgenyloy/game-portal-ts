import { Link } from "react-router-dom";
import { INews, TNodeRef } from "../../types/types";
import { CSSTransition } from "react-transition-group";

export function NewsView(
  newsArr: INews[],
  setNews: (news: INews) => void,
  nodeRef: TNodeRef
) {
  const handleNewsClick = (oneNewsItem: INews) => {
    setNews(oneNewsItem);
    localStorage.setItem("news", JSON.stringify(oneNewsItem));
  };

  let newsItemNum = 1;
  const items = (
    <CSSTransition
      classNames="transition"
      nodeRef={nodeRef}
      in
      timeout={200}
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
}

export default NewsView;
