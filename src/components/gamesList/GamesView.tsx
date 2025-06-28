import { DiWindows } from "react-icons/di";
import { TbBrowser } from "react-icons/tb";
import { Link } from "react-router-dom";
import { IGamesList } from "../../types/types";

interface GamesListProps {
  filteredGame: IGamesList[];
}

function GamesView({ filteredGame }: GamesListProps) {
  return (
    <>
      {filteredGame.map(
        ({ id, title, thumbnail, genre, short_description, platform }) => {
          const gif =
            platform === "PC (Windows), Web Browser" ||
            platform === "Web Browser" ? (
              <TbBrowser />
            ) : (
              <DiWindows />
            );

          return (
            <li className="game-list__item" key={id}>
              <div className="game-list__img-cont">
                <img
                  src={thumbnail}
                  alt={title}
                  className="game-list__img"
                  loading="lazy"
                />
              </div>

              <Link className="game-list__link" to={`/game/${id}`}>
                <h3 className="game-list__title">{title}</h3>
              </Link>

              <p className="game-list__desc">{short_description}</p>
              <div className="game-list__genre">
                {genre}
                {gif}
              </div>
            </li>
          );
        }
      )}
    </>
  );
}

export default GamesView;
