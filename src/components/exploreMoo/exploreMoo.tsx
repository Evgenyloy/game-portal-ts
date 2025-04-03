import { Link } from "react-router-dom";
import { useRef } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { useGetMmoGame } from "../../hooks/gamesQueries";
import MmoItemsView from "./MmoItemsView";
import { randomGames } from "./utils";
import "../exploreMoo/exploreMoo.scss";

function ExploreMmo() {
  const { data: mmoList = [], isError, isSuccess, isPending } = useGetMmoGame();
  const nodeRef = useRef(null);
  const items = MmoItemsView(randomGames(mmoList), nodeRef);
  const className = isPending || isError ? "mmo__spinner" : "mmo__inner";

  return (
    <section className="mmo">
      <div className="container">
        <div className="mmo__top-side">
          <div className="mmo__title">Explore mmo games</div>
          <div className="mmo__button button">
            <Link to="/game-list">browse all </Link>
          </div>
        </div>
        <div className={className} ref={nodeRef}>
          {isPending && <Spinner />}
          {isError && <ErrorMessage />}
          {isSuccess && items}
        </div>
      </div>
    </section>
  );
}

export default ExploreMmo;
