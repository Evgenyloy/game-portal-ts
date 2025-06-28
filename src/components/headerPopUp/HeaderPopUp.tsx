import clsx from "clsx";
import { CSSTransition } from "react-transition-group";
import { useEffect, useState, useRef, useCallback } from "react";
import { popUpStore } from "../../store/popUpStore";
import { useHeaderFiltersStore } from "../../store/headerFiltersStore";
import LinksView from "./LinksView";
import { LINKS_DATA } from "./headerPopUp-data";
import "./headerPopUp.scss";

const DESKTOP_WIDTH = 650;

function HeaderPopUp() {
  const { setPlatform } = useHeaderFiltersStore();
  const popUpVisible = popUpStore.use.popUpVisible();
  const setPopUp = popUpStore.use.setPopUp();
  const [windowIsOpen, setWindowIsOpen] = useState(false);
  const popUpRef = useRef(null);

  const changeBodyScroll = useCallback((isVisible: boolean) => {
    document.body.classList.toggle("noscroll", isVisible);
  }, []);

  useEffect(() => {
    changeBodyScroll(popUpVisible);
  }, [popUpVisible, changeBodyScroll]);

  const closePopup = () => {
    window.innerWidth >= DESKTOP_WIDTH
      ? setWindowIsOpen(true)
      : setWindowIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener("resize", closePopup);
    return () => window.removeEventListener("resize", closePopup);
  }, []);

  useEffect(() => {
    if (!popUpVisible) return;
    if (windowIsOpen) {
      setPopUp();
    }
  }, [windowIsOpen, popUpVisible]);

  const popUpClass = clsx(
    "popup",
    window.innerWidth >= DESKTOP_WIDTH && "popup-no-visible"
  );

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
        <nav className="popup__nav">
          <LinksView
            setPlatform={setPlatform}
            setPopUp={setPopUp}
            linksData={LINKS_DATA}
          />
        </nav>
      </div>
    </CSSTransition>
  );
}

export default HeaderPopUp;
