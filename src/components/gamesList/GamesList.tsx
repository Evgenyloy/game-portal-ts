import { Link } from 'react-router-dom';
import { DiWindows } from 'react-icons/di';
import { TbBrowser } from 'react-icons/tb';
import { useAppSelector } from '../../hooks/hooks';
import { useEffect } from 'react';

import Filter from '../filter/Filter';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { useGetFilteredGamesQuery } from '../../api/apiSlice';
import './gamesList.scss';
import { IGamesList } from '../../types/types';

const GamesList = () => {
  const { platform, category, sort, inputSearch } = useAppSelector(
    (state) => state.filters
  );

  let {
    data: filteredGame = [],
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetFilteredGamesQuery({ platform, category, sort });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filterGames = (searchText: string, listOfGames: IGamesList[]) => {
    if (!searchText) {
      return listOfGames;
    }

    return listOfGames.filter(({ title }) =>
      title.toLowerCase().startsWith(searchText.toLowerCase())
    );
  };

  const content = renderItemsView(
    Array.isArray(filteredGame) ? filterGames(inputSearch, filteredGame) : []
  );

  const className =
    isLoading || isError || content.length === 0 || error !== undefined
      ? 'gamelist__spinner'
      : 'gamelist__inner';

  return (
    <section className="gamelist">
      <div className="container">
        <Filter />
        <ul className={className}>
          {isLoading && <Spinner />}
          {isError && <ErrorMessage />}
          {error !== undefined || (content.length === 0 && isSuccess) ? (
            <div className="gamelist__filterError">
              there are no games that match these filters
            </div>
          ) : null}

          {isSuccess && Array.isArray(filteredGame) ? content : null}
        </ul>
      </div>
    </section>
  );
};

const renderItemsView = (filteredGame: IGamesList[]) => {
  const item = filteredGame.map((item) => {
    const { id, title, thumbnail, genre, short_description, platform } = item;
    const gif =
      platform === 'PC (Windows), Web Browser' || platform === 'Web Browser' ? (
        <TbBrowser />
      ) : (
        <DiWindows />
      );
    return (
      <li className="gamelist__item" key={id}>
        <div className="gamelist__img-cont">
          <img src={thumbnail} alt={title} className="gamelist__img" />
        </div>

        <Link className="gamelist__link" to={`/game/${id}`}>
          <h3 className="gamelist__title">{title}</h3>
        </Link>

        <p className="gamelist__desc">{short_description}</p>
        <div className="gamelist__genre">
          {genre}
          {gif}
        </div>
      </li>
    );
  });

  return item;
};

export default GamesList;
