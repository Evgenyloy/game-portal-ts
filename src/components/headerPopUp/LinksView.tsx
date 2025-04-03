import { Link } from "react-router-dom";
import { TClickLinkEvent } from "../../types/types";

const linksData = [
  { name: "pc games", dataAtr: "pc", linkTo: "game-list" },
  { name: " browser games", dataAtr: "browser", linkTo: "game-list" },
  { name: " news", dataAtr: "pc", linkTo: "news-list" },
  { name: " home", dataAtr: "pc", linkTo: "." },
  { name: "about", dataAtr: "pc", linkTo: "about" },
];

function LinksView(
  setPlatform: (platform: string) => void,
  setPopUp: () => void
) {
  const handleLinkClick = (e: TClickLinkEvent) => {
    if (!(e.target instanceof HTMLAnchorElement)) return;
    setPlatform(e.target.dataset.link as string);
    setPopUp();
  };

  const links = linksData.map(({ name, dataAtr, linkTo }) => {
    return (
      <Link
        key={name}
        to={linkTo}
        className="popup__link"
        data-link={dataAtr}
        onClick={handleLinkClick}
      >
        {name}
      </Link>
    );
  });
  return links;
}

export default LinksView;
