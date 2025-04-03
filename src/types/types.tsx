export interface IInitialFiltersState {
  platform: string;
  category: string;
  sort: string;
  inputSearch: string;
}

export interface IInitialPopUpState {
  popUpVisible: boolean;
}

export interface INews {
  article_content: string;
  article_url: string;
  id: number;
  main_image: string;
  short_description: string;
  thumbnail: string;
  title: string;
}

export interface IGamesList {
  developer: string;
  game_url: string;
  genre: string;
  id: number;
  platform: string;
  profile_url: string;
  publisher: string;
  release_data: string;
  short_description: string;
  thumbnail: string;
  title: string;
}

export interface IGame {
  description: string;
  developer: string;
  game_url: string;
  genre: string;
  id: number;
  minimum_system_requirements: ISystemRequirements;
  platform: string;
  profile_url: string;
  publisher: string;
  release_date: string;
  screenshots: IScreenshots[];
  short_description: string;
  status: string;
  thumbnail: string;
  title: string;
}

export interface ISystemRequirements {
  [key: string]: string;
}

export interface IScreenshots {
  id: number;
  image: string;
}

export interface IFilteredGamesArgs {
  platform: string;
  category: string;
  sort: string;
}

export type TNodeRef = React.MutableRefObject<null>;
export type TMouseEvent = React.MouseEvent<HTMLElement, MouseEvent>;
export type TClickLinkEvent = React.MouseEvent<HTMLAnchorElement, MouseEvent>;

export type dropdownItem = {
  name: string;
  dataAtr: string;
  id: string;
};

export type TTagsListData = string[];

export interface ITagsData {
  name: string;
  data: string;
}

export interface IOneGameScreenshotsProps {
  selectedGame: IGame;
  handleScreenshotClick: (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => void;
}

export interface IOneGamePopUpProps {
  popUpImgSrc: string;
  popUp: boolean;
  closePopUp: () => void;
}

export interface IOneGameInfoProps {
  selectedGame: IGame;
}

export interface IRenderGameViewProps {
  selectedGame: IGame;
  handleScreenshotClick: (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => void;
}

export interface IOneGameRequirementsProps {
  selectedGame: IGame;
}
