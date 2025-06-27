import { CSSTransition } from "react-transition-group";
import { IGamesList, TNodeRef } from "../../types/types";
import { Link } from "react-router-dom";
import { randomGames } from "./utils";

function MmoItemsView({
  mmoList,
  nodeRef,
}: {
  nodeRef: TNodeRef;
  mmoList: IGamesList[];
}) {
  const mmo = randomGames(mmoList);

  const items = (
    <CSSTransition
      classNames="transition"
      nodeRef={nodeRef}
      in
      timeout={200}
      appear
    >
      <>
        {mmo.map((item) => {
          const { thumbnail, title, id } = item;
          return (
            <div className="mmo__item" key={id}>
              <Link className="mmo__link" to={`game/${id}`}>
                <div className="mmo__img-cont">
                  <img className="mmo__img" src={thumbnail} alt={title} />
                </div>
                <div className="mmo__desc-inner">
                  <div className="mmo__desc">{title.toLowerCase()}</div>
                  <span className="mmo__price">free</span>
                </div>
              </Link>
            </div>
          );
        })}
      </>
    </CSSTransition>
  );

  return items;
}

export default MmoItemsView;
