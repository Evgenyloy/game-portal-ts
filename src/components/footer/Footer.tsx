import { Link } from 'react-router-dom';
import { platformSelected } from '../../slices/headerFiltersSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import './footer.scss';
import { TClickLinkEvent } from '../../types/types';

const Footer = () => {
  const platform = useAppSelector((state) => state.filters.platform);
  const dispatch = useAppDispatch();

  const onBtnUpClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  };

  const onMainLinkClick = (e: TClickLinkEvent) => {
    onBtnUpClick();
    if (platform === e.currentTarget.dataset.link) return;
    dispatch(platformSelected(e.currentTarget.dataset.link as string));
  };
  return (
    <footer className="footer">
      <div className="footer__inner">
        <Link to="." data-link="all" onClick={onMainLinkClick}>
          <span>MMOGAMES</span> PORTAL
        </Link>
        <Link to="game_list" onClick={onMainLinkClick} data-link="pc">
          PC GAMES
        </Link>
        <Link to="game_list" onClick={onMainLinkClick} data-link="browser">
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
