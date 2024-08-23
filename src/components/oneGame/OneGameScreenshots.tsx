import { FC } from 'react';
import { IGame } from '../../types/types';
import SpinnerImg from '../spinner/SpinnerImg';
import './oneGame.scss';

interface IOneGameScreenshotsProps {
  selectedGame: IGame;
  handleScreenshotClick: (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => void;
}

const OneGameScreenshots: FC<IOneGameScreenshotsProps> = ({
  selectedGame,
  handleScreenshotClick,
}) => {
  const onload = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!(e.target instanceof HTMLImageElement)) return;
    if (e?.target?.complete) {
      e.target.className = 'game__screenshots';
    }
  };

  const screenshotItems = (selectedGame: IGame) => {
    const { screenshots } = selectedGame;

    const item = selectedGame?.screenshots?.map((item, index) => {
      return (
        <div className="game__img-cont" key={item.id}>
          <img
            className="game__screenshots hidden"
            src={screenshots[index++].image}
            alt="screenshot"
            onClick={handleScreenshotClick}
            onLoad={(e) => onload(e)}
            id={item.id.toString()}
          />

          <SpinnerImg
            image={
              (
                document.getElementsByClassName(`game__screenshots`)[
                  index
                ] as HTMLImageElement
              )?.complete
            }
          />
        </div>
      );
    });
    return item;
  };

  const screenshots = screenshotItems(selectedGame);

  return <>{selectedGame?.screenshots?.length > 0 ? screenshots : null}</>;
};

export default OneGameScreenshots;
