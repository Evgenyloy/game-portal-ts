import { useEffect } from "react";
import { useHeaderFiltersStore } from "../../store/headerFiltersStore";
import Filter from "../filter/Filter";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
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
    error,
  } = useGetFilteredGames({ platform, category, sort });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = GamesView(
    Array.isArray(filteredGame) ? filterGames(inputSearch, filteredGame) : []
  );

  const className =
    isLoading || isError || content.length === 0 || error
      ? "gamelist__spinner"
      : "gamelist__inner";

  return (
    <section className="gamelist">
      <div className="container">
        <Filter />
        <ul className={className}>
          {isLoading && <Spinner />}
          {isError && <ErrorMessage />}
          {content.length === 0 && isSuccess ? (
            <div className="gamelist__filterError">
              There are no games that match these filters
            </div>
          ) : null}

          {isSuccess && Array.isArray(filteredGame) ? content : null}
        </ul>
      </div>
    </section>
  );
}

export default GamesList;
