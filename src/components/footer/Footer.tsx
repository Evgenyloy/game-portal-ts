import { Link } from "react-router-dom";
import { TClickLinkEvent } from "../../types/types";
import { useHeaderFiltersStore } from "../../store/headerFiltersStore";
import { useShallow } from "zustand/react/shallow";
import "./footer.scss";

const Footer = () => {
  const { platform, setPlatform } = useHeaderFiltersStore(
    useShallow((state) => ({
      platform: state.platform,
      setPlatform: state.setPlatform,
    }))
  );

  const onBtnUpClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  };

  const onMainLinkClick = (e: TClickLinkEvent) => {
    onBtnUpClick();
    if (platform === e.currentTarget.dataset.link) return;
    setPlatform(e.currentTarget.dataset.link as string);
  };

  return (
    <footer className="footer">
      <div className="footer__inner">
        <Link to="." data-link="all" onClick={onMainLinkClick}>
          <span>MMOGAMES</span> PORTAL
        </Link>
        <Link to="game-list" onClick={onMainLinkClick} data-link="pc">
          PC GAMES
        </Link>
        <Link to="game-list" onClick={onMainLinkClick} data-link="browser">
          BROWSER GAMES
        </Link>
        <Link to="news-list" data-link="news" onClick={onBtnUpClick}>
          NEWS
        </Link>
        <Link to="about" onClick={onBtnUpClick}>
          ABOUT
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
