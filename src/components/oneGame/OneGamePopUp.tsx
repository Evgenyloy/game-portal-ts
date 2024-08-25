import { CSSTransition } from 'react-transition-group';
import { ImCross } from 'react-icons/im';
import { FC, useRef } from 'react';
import './oneGame.scss';

interface IOneGamePopUpProps {
  popUpImgSrc: string;
  popUp: boolean;
  closePopUp: () => void;
}

const OneGamePopUp: FC<IOneGamePopUpProps> = ({
  popUpImgSrc,
  popUp,
  closePopUp,
}) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      classNames="img-transition"
      nodeRef={nodeRef}
      in={popUp}
      timeout={{
        appear: 200,
        enter: 200,
        exit: 200,
      }}
      mountOnEnter
      unmountOnExit
    >
      {
        <div className="pop-up" onClick={closePopUp} ref={nodeRef}>
          <span>
            <ImCross onClick={closePopUp} />
          </span>
          <div className="pop-up__img-cont">
            <img
              className="pop-up__img"
              src={popUpImgSrc}
              alt=""
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      }
    </CSSTransition>
  );
};

export default OneGamePopUp;
