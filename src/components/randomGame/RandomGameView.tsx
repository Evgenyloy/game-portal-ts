import { Link } from "react-router-dom";
import { IGamesList, TNodeRef } from "../../types/types";
import { CSSTransition } from "react-transition-group";

function RandomGameView(games: IGamesList[], nodeRef: TNodeRef) {
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={true}
      timeout={200}
      classNames="transition"
      appear
    >
      <ul className="random-game__list" ref={nodeRef}>
        {games.map(({ title, id, thumbnail, short_description }) => (
          <li className="random-game__item" key={id}>
            <div className="random-game__img-cont">
              <img
                src={thumbnail}
                alt={title}
                className="random-game__img"
                loading="lazy"
              />
            </div>
            <div className="random-game__content">
              <Link to={`game/${id}`} className="random-game__link">
                <p className="random-game__text line-clamp">
                  {short_description?.slice(0, 70) + "..." || ""}
                </p>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </CSSTransition>
  );
}

export default RandomGameView;
