import { Transition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { platformSelected } from '../../slices/headerFiltersSlice';
import { changePopUp } from '../../slices/headerPopUpSlice';

import './headerPopUp.scss';

const HeaderPopUp = () => {
  const dispatch = useAppDispatch();
  const popUpVisible = useAppSelector(
    (state) => state.headerPopUp.popUpVisible
  );

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!(e.target instanceof HTMLAnchorElement)) return;
    dispatch(platformSelected(e.target.dataset.link as string));
    dispatch(changePopUp(/* false */));
  };

  const changeBodyScroll = () => {
    if (popUpVisible) {
      document.body.classList.add('noscroll');
    }
    if (!popUpVisible) {
      document.body.classList.remove('noscroll');
    }
  };

  useEffect(() => {
    changeBodyScroll();
  }, [popUpVisible]);

  const [windowIsOpen, setWindowIsOpen] = useState(false);
  const closePopup = () => {
    if (window.innerWidth > 650) {
      setWindowIsOpen(true);
    }
    if (window.innerWidth < 650) {
      setWindowIsOpen(false);
    }
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
  }, [windowIsOpen, popUpVisible]);

  const duration = 400;

  const defaultStyle = {
    transition: `all ${duration}ms linear 0s`,
  };

  const transitionStyles: { [key: string]: any } = {
    entering: { right: '-100%' },
    entered: { right: 0 },
    exiting: { right: '-100%' },
    exited: { right: '-100%' },
  };

  const nodeRef = useRef(null);

  return (
    <Transition
      nodeRef={nodeRef}
      in={popUpVisible}
      timeout={{
        appear: 0,
        enter: 0,
        exit: 450,
      }}
      mountOnEnter
      unmountOnExit
    >
      {(state) => (
        <div
          className="popup"
          tabIndex={0}
          style={{ ...defaultStyle, ...transitionStyles[state] }}
          id="10"
        >
          <nav className="popup__nav">
            <Link
              to="game_list"
              className="popup__link"
              data-link="pc"
              onClick={handleClick}
            >
              pc games
            </Link>
            <Link
              to="game_list"
              className="popup__link"
              data-link="browser"
              onClick={handleClick}
            >
              browser games
            </Link>
            <Link
              to="news-list"
              className="popup__link"
              data-link="pc"
              onClick={handleClick}
            >
              news
            </Link>
            <Link
              to="."
              className="popup__link"
              data-link="pc"
              onClick={handleClick}
            >
              home
            </Link>
            <Link
              to="about"
              className="popup__link"
              data-link="pc"
              onClick={handleClick}
            >
              about
            </Link>
          </nav>
        </div>
      )}
    </Transition>
  );
};

export default HeaderPopUp;
