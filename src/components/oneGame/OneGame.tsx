import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import OneGameRequirements from './OneGameRequirements';
import OneGameInfo from './OneGameInfo';
import OneGameScreenshots from './OneGameScreenshots';
import OneGamePopUp from './OneGamePopUp';

import './oneGame.scss';
import { useGetOneGameQuery } from '../../api/apiSlice';
import { IGame } from '../../types/types';

const OneGame = () => {
  const param = useParams();
  const {
    data: selectedGame,
    isLoading,
    isError,
    isSuccess,
  } = useGetOneGameQuery(param.id as string);

  const [popUp, setPopUp] = useState(false);
  const [popUpImgSrc, setPopUpImgSrc] = useState('');

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  const handleScreenshotClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    if (!(e.target instanceof HTMLImageElement)) return;
    setPopUp(true);
    setPopUpImgSrc(e.target.src);
  };

  const closePopUp = () => {
    setPopUp(false);
  };

  const createMarkup = () => {
    if (selectedGame === undefined) return;
    return { __html: selectedGame.description };
  };

  const nodeRef = useRef(null);

  const renderGameView = (selectedGame: IGame) => {
    if (selectedGame === undefined) return;

    let clazz =
      selectedGame?.screenshots?.length === 0
        ? 'screenshots-title none'
        : 'screenshots-title';
    const { thumbnail, title } = selectedGame;
    const content = (
      <CSSTransition
        classNames="transition"
        nodeRef={nodeRef}
        in
        timeout={{
          appear: 200,
          enter: 200,
          exit: 200,
        }}
        appear
      >
        {
          <div ref={nodeRef}>
            <h3 className="game__title">{title}</h3>

            <div className="game__wrapper">
              <div className="game__col-1">
                <div className="game__img-cont ">
                  <img
                    src={thumbnail}
                    alt={title}
                    className="game__img main-img"
                  />
                </div>
                <div className={clazz}>screenshots</div>
                <div className="screenshots-block">
                  <OneGameScreenshots
                    selectedGame={selectedGame}
                    handleScreenshotClick={handleScreenshotClick}
                  />
                </div>
              </div>
              <div className="game__col-2">
                <div
                  className="game__description"
                  dangerouslySetInnerHTML={createMarkup()}
                />
                <OneGameInfo selectedGame={selectedGame} />
                <OneGameRequirements selectedGame={selectedGame} />
              </div>
            </div>
          </div>
        }
      </CSSTransition>
    );
    return content;
  };

  const content = renderGameView(selectedGame as IGame);
  const className = isLoading || isError ? 'game__spinner' : 'game';

  return (
    <article className={className}>
      {isLoading && <Spinner />}
      {isError && <ErrorMessage />}
      {isSuccess && content}
      <OneGamePopUp
        popUpImgSrc={popUpImgSrc}
        popUp={popUp}
        closePopUp={closePopUp}
      />
    </article>
  );
};

export default OneGame;
