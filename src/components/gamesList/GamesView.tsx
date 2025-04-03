import { DiWindows } from "react-icons/di";
import { TbBrowser } from "react-icons/tb";
import { Link } from "react-router-dom";
import { IGamesList } from "../../types/types";

function GamesView(filteredGame: IGamesList[]) {
  const item = filteredGame.map((item) => {
    const { id, title, thumbnail, genre, short_description, platform } = item;
    const gif =
      platform === "PC (Windows), Web Browser" || platform === "Web Browser" ? (
        <TbBrowser />
      ) : (
        <DiWindows />
      );
    return (
      <li className="gamelist__item" key={id}>
        <div className="gamelist__img-cont">
          <img
            src={thumbnail}
            alt={title}
            className="gamelist__img"
            loading="lazy"
          />
        </div>

        <Link className="gamelist__link" to={`/game/${id}`}>
          <h3 className="gamelist__title">{title}</h3>
        </Link>

        <p className="gamelist__desc">{short_description}</p>
        <div className="gamelist__genre">
          {genre}
          {gif}
        </div>
      </li>
    );
  });

  return item;
}

export default GamesView;
