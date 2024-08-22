import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { tagsData } from '../../data/data';
import {
  categorySelected,
  platformSelected,
} from '../../slices/headerFiltersSlice';
import { changePopUp } from '../../slices/headerPopUpSlice';
import { ITagsData } from '../../data/dataTypes';
import HeaderPopUp from '../headerPopUp/HeaderPopUp';

import './header.scss';

const Header = () => {
  const dispatch = useAppDispatch();
  const platform = useAppSelector((state) => state.filters.platform);
  const popupVisible = useAppSelector(
    (state) => state.headerPopUp.popUpVisible
  );

  const handleBurgerClick = () => {
    dispatch(changePopUp(/* true */));
  };

  const handleMainLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (platform === e.currentTarget.dataset.link) return;
    dispatch(platformSelected(e.currentTarget.dataset.link as string));
  };

  const handleTagClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!(e.target instanceof HTMLAnchorElement)) return;
    dispatch(categorySelected(e.target.dataset.link as string));
  };

  const burgerClassName = popupVisible ? 'burger active' : 'burger';
  const tagList = tagsRenderView(tagsData, handleTagClick);

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
            <Link
              to="game_list"
              className="header__link"
              onClick={handleMainLinkClick}
              data-link="pc"
            >
              PC games
            </Link>
            <Link
              to="game_list"
              className="header__link"
              onClick={handleMainLinkClick}
              data-link="browser"
            >
              browser games
            </Link>
            <Link to="news-list" className="header__link" data-link="news">
              news
            </Link>
            <Link to="about" className="header__link">
              about
            </Link>
          </nav>
          <div className={burgerClassName} onClick={(e) => handleBurgerClick()}>
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
            {tagList}
          </ul>
        </div>
      </div>
      <HeaderPopUp />
    </header>
  );
};

const tagsRenderView = (
  tagsData: ITagsData[],
  handleTagClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
) => {
  const item = tagsData.map(({ name, data }) => {
    return (
      <li className="sub-menu__item" key={name}>
        <Link
          to="game_list"
          className="sub-menu__link"
          data-link={data}
          onClick={handleTagClick}
        >
          {name}
        </Link>
      </li>
    );
  });
  return item;
};

export default Header;
