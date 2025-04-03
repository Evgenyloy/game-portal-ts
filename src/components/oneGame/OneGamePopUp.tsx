import { CSSTransition } from "react-transition-group";
import { ImCross } from "react-icons/im";
import { useRef } from "react";
import { IOneGamePopUpProps } from "../../types/types";
import "./oneGame.scss";

const OneGamePopUp = ({
  popUpImgSrc,
  popUp,
  closePopUp,
}: IOneGamePopUpProps) => {
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
