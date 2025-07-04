import { useState, useRef } from "react";
import { ErrorMessageSmall } from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import { useGetGamesByCategory } from "../../hooks/gamesQueries";
import RandomGameView from "./RandomGameView";
import { GameGenre, GENRES } from "./utils";
import { useGameRefresh } from "./useGameRefresh";
import "./randomGame.scss";

function RandomGame() {
  const [genreHistory, setGenreHistory] = useState<GameGenre[]>([]);
  const currentGenre = genreHistory[genreHistory.length - 1] || GENRES[0];
  const nodeRef = useRef(null);

  const {
    data: games = [],
    refetch,
    isPending,
    isFetching,
    isError,
    isSuccess,
  } = useGetGamesByCategory(currentGenre);

  const { handleRefresh, isCooldown } = useGameRefresh(
    refetch,
    genreHistory,
    setGenreHistory
  );

  const displayedGames = games.slice(0, 8);

  return (
    <div className="random-game">
      <div className="random-game__header">
        <p className="random-game__headline">Games for you ({currentGenre})</p>
        <button
          onClick={handleRefresh}
          disabled={isCooldown || isFetching}
          className={
            isCooldown
              ? "random-game__refresh-button disable"
              : "random-game__refresh-button"
          }
          aria-label="Refresh games"
        >
          {isCooldown ? "Load..." : "Refresh"}
        </button>
      </div>

      <div
        className={`random-game__content-wrapper ${
          isError ? "random-game__content-wrapper--error" : ""
        }`}
      >
        {isPending && <Spinner />}
        {isError && <ErrorMessageSmall />}
        {isSuccess && (
          <>
            {games.length === 0 ? (
              <p className="random-game__empty">No games found</p>
            ) : (
              <RandomGameView games={displayedGames} nodeRef={nodeRef} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default RandomGame;
