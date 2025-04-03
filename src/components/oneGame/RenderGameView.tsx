import OneGameRequirements from "./OneGameRequirements";
import OneGameInfo from "./OneGameInfo";
import OneGameScreenshots from "./OneGameScreenshots";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import { IRenderGameViewProps } from "../../types/types";

const RenderGameView = ({
  selectedGame,
  handleScreenshotClick,
}: IRenderGameViewProps) => {
  const nodeRef = useRef(null);

  if (selectedGame === undefined) return null;

  const createMarkup = () => {
    if (selectedGame === undefined) return;
    return { __html: selectedGame.description };
  };

  let clazz =
    selectedGame?.screenshots?.length === 0
      ? "screenshots-title none"
      : "screenshots-title";
  const { thumbnail, title } = selectedGame;
  return (
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
};

export default RenderGameView;
