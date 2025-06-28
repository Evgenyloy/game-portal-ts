import { Link } from "react-router-dom";
import { useRef } from "react";
import clsx from "clsx";
import Spinner from "../spinner/Spinner";
import { useGetMmoGame } from "../../hooks/gamesQueries";
import MmoItemsView from "./MmoItemsView";
import { ErrorMessageSmall } from "../errorMessage/ErrorMessage";
import "../exploreMoo/exploreMoo.scss";

function ExploreMmo() {
  const { data: mmoList = [], isError, isSuccess, isPending } = useGetMmoGame();
  const nodeRef = useRef(null);

  const containerClasses = clsx({
    "mmo__main-content": isSuccess,
    "mmo__loading-state": isPending || isError,
  });

  return (
    <section className="mmo">
      <div className="container">
        <div className="mmo__top-side">
          <h2 className="mmo__title">Explore mmo games</h2>
          <div className="mmo__button button">
            <Link to="/game-list">browse all </Link>
          </div>
        </div>
        <div className={containerClasses} ref={nodeRef}>
          {isPending && <Spinner />}
          {isError && <ErrorMessageSmall />}
          {isSuccess && <MmoItemsView mmoList={mmoList} nodeRef={nodeRef} />}
        </div>
      </div>
    </section>
  );
}

export default ExploreMmo;
