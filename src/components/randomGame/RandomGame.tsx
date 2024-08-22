import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import { useGetCategoryQuery } from '../../api/apiSlice';
import './randomGame.scss';
import { useRef } from 'react';
import { IGamesList } from '../../types/types';

const RandomGame = () => {
  const genre = () => {
    let randomGenre = 'mmo';
    const randomCategory = Math.floor(Math.random() * 4) + 1;

    switch (randomCategory) {
      case 1:
        randomGenre = 'shooter';
        break;
      case 2:
        randomGenre = 'mmorpg';
        break;
      case 3:
        randomGenre = 'battle-royale';
        break;
      case 4:
        randomGenre = 'racing';
        break;

      default:
        randomGenre = 'mmo';
    }
    return randomGenre;
  };

  const {
    data: games = [],
    isError,
    isLoading,
    isSuccess,
  } = useGetCategoryQuery(genre());

  const nodeRef = useRef(null);
  const content = renderItemsView(games.slice(0, 8), nodeRef);

  return (
    <div className="random-game">
      <p className="random-game__headline">games for you</p>
      <ul className="random-game__list" ref={nodeRef}>
        {isLoading && <Spinner />}
        {isError && <ErrorMessage />}
        {isSuccess && content}
      </ul>
    </div>
  );
};

const renderItemsView = (
  games: IGamesList[],
  nodeRef: React.MutableRefObject<null>
) => {
  const item = (
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
      <>
        {games.map((item) => {
          const { title, id, thumbnail, short_description } = item;
          const desc = short_description.slice(0, 70) + '...';
          return (
            <li className="random-game__item" key={id}>
              <div className="random-game__img-cont">
                <img src={thumbnail} alt={title} className="random-game__img" />
              </div>
              <div className="random-game__content">
                <Link to={`game/${id}`} className="random-game__link">
                  <p className="random-game__text line-clamp">{desc}</p>
                </Link>
              </div>
            </li>
          );
        })}
      </>
    </CSSTransition>
  );

  return item;
};

export default RandomGame;
