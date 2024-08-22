import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';

import Spinner from '../spinner/Spinner';
import { useGetMmoGamesQuery } from '../../api/apiSlice';
import { errorMessage } from '../../data/data';
import { IGamesList } from '../../types/types';
import '../exploreMoo/exploreMoo.scss';

const ExploreMmo = () => {
  const {
    data: mmoList = [],
    isLoading,
    isError,
    isSuccess,
  } = useGetMmoGamesQuery();

  const onMMoLoaded = (mmo: IGamesList[]) => {
    let randomNum = Math.floor(Math.random() * 150);
    const item = mmo.slice(randomNum, 4 + randomNum);
    return item;
  };

  const nodeRef = useRef(null);
  const items = renderItemsView(onMMoLoaded(mmoList), nodeRef);
  const className = isLoading || isError ? 'mmo__spinner' : 'mmo__inner';

  return (
    <section className="mmo">
      <div className="container">
        <div className="mmo__top-side">
          <div className="mmo__title">Explore mmo games</div>
          <div className="mmo__button button">
            <Link to="/game_list">browse all </Link>
          </div>
        </div>

        <div className={className} ref={nodeRef}>
          {isLoading && <Spinner />}
          {isError && errorMessage}
          {isSuccess && items}
        </div>
      </div>
    </section>
  );
};

const renderItemsView = (
  mmo: IGamesList[],
  nodeRef: React.MutableRefObject<null>
) => {
  const items = (
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
        {mmo.map((item) => {
          const { thumbnail, title, id } = item;
          return (
            <div className="mmo__item" key={id}>
              <Link className="mmo__link" to={`game/${id}`}>
                <div className="mmo__img-cont">
                  <img className="mmo__img" src={thumbnail} alt={title} />
                </div>
                <div className="mmo__desc-inner">
                  <div className="mmo__desc">{title.toLowerCase()}</div>
                  <span className="mmo__free">free</span>
                </div>
              </Link>
            </div>
          );
        })}
      </>
    </CSSTransition>
  );

  return items;
};

export default ExploreMmo;
