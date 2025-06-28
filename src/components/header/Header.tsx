import { Link } from "react-router-dom";
import HeaderPopUp from "../headerPopUp/HeaderPopUp";
import { TClickLinkEvent } from "../../types/types";
import { useHeaderFiltersStore } from "../../store/headerFiltersStore";
import { popUpStore } from "../../store/popUpStore";
import { TAGS_DATA, LINK_DATA } from "./header-data";
import TagsView from "./TagsView";
import "./header.scss";

function Header() {
  const { platform, setCategory, setPlatform, setInput } =
    useHeaderFiltersStore();
  const popupVisible = popUpStore.use.popUpVisible();
  const setPopUp = popUpStore.use.setPopUp();

  const handleBurgerClick = () => {
    setPopUp();
  };

  const handleMainLinkClick = (e: TClickLinkEvent) => {
    if (platform === e.currentTarget.dataset.link) return;
    setPlatform(e.currentTarget.dataset.link as string);
    setInput("");
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <Link
            to="."
            className="header__link main-link"
            data-link="all"
            onClick={handleMainLinkClick}
          >
            <h1 className="header__title">
              MmoGames <span className="header__title-span">Portal</span>
            </h1>
          </Link>
          <nav className="header__nav">
            {LINK_DATA.map((item, index) => (
              <Link
                to={item.link}
                className="header__link"
                onClick={
                  item.link === "game-list"
                    ? handleMainLinkClick
                    : () => setInput("")
                }
                data-link={item.data}
                key={index}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div
            className={popupVisible ? "burger active" : "burger"}
            onClick={handleBurgerClick}
          >
            <span className="burger__line"></span>
            <span className="burger__line"></span>
            <span className="burger__line"></span>
          </div>
        </div>
      </div>
      <div className="sub-menu">
        <div className="container">
          <ul className="sub-menu__list">
            <span className="sub-menu__span">popular tags:</span>
            <TagsView tags={TAGS_DATA} setCategory={setCategory} />
          </ul>
        </div>
      </div>
      <HeaderPopUp />
    </header>
  );
}

export default Header;
