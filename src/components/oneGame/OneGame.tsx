import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ErrorMessage } from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import OneGamePopUp from "./OneGamePopUp";
import RenderGameView from "./RenderGameView";
import { useGetGameById } from "../../hooks/gamesQueries";
import "./oneGame.scss";

const OneGame = () => {
  const param = useParams();
  const [popUp, setPopUp] = useState(false);
  const [popUpImgSrc, setPopUpImgSrc] = useState("");

  const {
    data: selectedGame,
    isPending,
    isError,
    isSuccess,
  } = useGetGameById(param.id as string);

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

  const contentClass = clsx({
    "game__loading-state": isPending || isError,
    game: isSuccess,
  });

  return (
    <article className={contentClass}>
      {isPending && <Spinner />}
      {isError && <ErrorMessage />}
      {isSuccess && (
        <RenderGameView
          selectedGame={selectedGame}
          handleScreenshotClick={handleScreenshotClick}
        />
      )}
      <OneGamePopUp
        popUpImgSrc={popUpImgSrc}
        popUp={popUp}
        closePopUp={closePopUp}
      />
    </article>
  );
};

export default OneGame;
