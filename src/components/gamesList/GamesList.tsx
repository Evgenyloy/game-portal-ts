import { useEffect } from "react";
import { clsx } from "clsx";
import { useHeaderFiltersStore } from "../../store/headerFiltersStore";
import Filter from "../filter/Filter";
import Spinner from "../spinner/Spinner";
import { ErrorMessage } from "../errorMessage/ErrorMessage";
import { useGetFilteredGames } from "../../hooks/gamesQueries";
import GamesView from "./GamesView";
import { filterGames } from "./utils";
import "./gamesList.scss";

function GamesList() {
  const { category, inputSearch, platform, sort } = useHeaderFiltersStore();
  const {
    isLoading,
    data: filteredGame = [],
    isError,
    isSuccess,
    isPending,
  } = useGetFilteredGames({ platform, category, sort });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = filterGames(inputSearch, filteredGame);

  const containerClasses = clsx({
    "game-list__main-content": isSuccess,
    "game-list__loading-state": isPending || isError || !content?.length,
  });

  return (
    <section className="game-list">
      <div className="container">
        <Filter />
        <ul className={containerClasses}>
          {isLoading && <Spinner />}
          {isError && <ErrorMessage />}
          {!content?.length && isSuccess ? (
            <div className="game-list__filterError">
              There are no games that match these filters
            </div>
          ) : null}

          {isSuccess && content?.length > 0 ? (
            <GamesView filteredGame={content} />
          ) : null}
        </ul>
      </div>
    </section>
  );
}

export default GamesList;
