import { Link } from "react-router-dom";
import { TClickLinkEvent } from "../../types/types";

interface LinksView {
  setPlatform: (platform: string) => void;
  setPopUp: () => void;
  linksData: {
    name: string;
    dataAtr: string;
    linkTo: string;
  }[];
}

function LinksView({ linksData, setPlatform, setPopUp }: LinksView) {
  const handleLinkClick = (e: TClickLinkEvent) => {
    if (!(e.target instanceof HTMLAnchorElement)) return;
    setPlatform(e.target.dataset.link as string);
    setPopUp();
  };

  return (
    <>
      {linksData.map(({ name, dataAtr, linkTo }) => (
        <Link
          key={name}
          to={linkTo}
          className="popup__link"
          data-link={dataAtr}
          onClick={handleLinkClick}
        >
          {name}
        </Link>
      ))}
    </>
  );
}

export default LinksView;
