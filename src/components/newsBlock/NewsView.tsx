import { Link } from "react-router-dom";
import { INews, TNodeRef } from "../../types/types";
import { CSSTransition } from "react-transition-group";

interface NewsViewProps {
  content: INews[];
  setNews: (news: INews) => void;
  nodeRef: TNodeRef;
}

export function NewsView({ content, setNews, nodeRef }: NewsViewProps) {
  const handleNewsClick = (oneNewsItem: INews) => {
    setNews(oneNewsItem);
    localStorage.setItem("news", JSON.stringify(oneNewsItem));
  };

  let newsItemNum = 1;

  return (
    <CSSTransition
      classNames="transition"
      nodeRef={nodeRef}
      in
      timeout={50}
      appear
    >
      <>
        {content.map((oneNews) => {
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
              <p className="news__title">{title}</p>
            </div>
          );
        })}
      </>
    </CSSTransition>
  );
}

export default NewsView;
