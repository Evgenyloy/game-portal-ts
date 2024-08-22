import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { platformSelected } from '../../slices/headerFiltersSlice';
import { changePopUp } from '../../slices/headerPopUpSlice';

import './headerPopUp.scss';

const HeaderPopUp = () => {
  const dispatch = useAppDispatch();
  const popUpVisible = useAppSelector(
    (state) => state.headerPopUp.popUpVisible
  );

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!(e.target instanceof HTMLAnchorElement)) return;
    dispatch(platformSelected(e.target.dataset.link as string));
    dispatch(changePopUp(/* false */));
  };

  const changeBodyScroll = useCallback(() => {
    popUpVisible
      ? document.body.classList.add('noscroll')
      : document.body.classList.remove('noscroll');
  }, [popUpVisible]);

  useEffect(() => {
    changeBodyScroll();
  }, [popUpVisible, changeBodyScroll]);

  const [windowIsOpen, setWindowIsOpen] = useState(false);
  const closePopup = () => {
    window.innerWidth >= 650 ? setWindowIsOpen(true) : setWindowIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener('resize', closePopup);
    return () => window.removeEventListener('resize', closePopup);
  }, []);

  useEffect(() => {
    if (!popUpVisible) return;
    if (windowIsOpen) {
      dispatch(changePopUp(/* false */));
    }
  }, [windowIsOpen, popUpVisible, dispatch]);

  const popUpRef = useRef(null);
  const popUpLinks = linksRenderView(handleLinkClick);
  const popUpClass =
    window.innerWidth >= 650 ? 'popup popup-no-visible' : 'popup';

  return (
    <CSSTransition
      nodeRef={popUpRef}
      in={popUpVisible}
      classNames="my-node"
      timeout={{
        enter: 400,
        exit: 400,
      }}
      mountOnEnter
      unmountOnExit
    >
      <div className={popUpClass} ref={popUpRef} tabIndex={0}>
        <nav className="popup__nav">{popUpLinks}</nav>
      </div>
    </CSSTransition>
  );
};

const linksRenderView = (
  handleLinkClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
) => {
  const linksData = [
    { name: 'pc games', dataAtr: 'pc', linkTo: 'game_list' },
    { name: ' browser games', dataAtr: 'browser', linkTo: 'game_list' },
    { name: ' news', dataAtr: 'pc', linkTo: 'news-list' },
    { name: ' home', dataAtr: 'pc', linkTo: '.' },
    { name: 'about', dataAtr: 'pc', linkTo: 'about' },
  ];

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
};

export default HeaderPopUp;
