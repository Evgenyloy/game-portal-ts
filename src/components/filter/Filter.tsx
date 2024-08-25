import { tagListData, TTagsListData } from '../../data/data';
import {
  platformSelected,
  categorySelected,
  sortBy,
  setInputSearch,
} from '../../slices/headerFiltersSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import './filter.scss';
import { BiSearchAlt2 } from 'react-icons/bi';
import { TMouseEvent } from '../../types/types';
import { isHTMLElement } from '../../tools/tools';

const Filter = () => {
  const dispatch = useAppDispatch();
  const { platform, category, sort, inputSearch } = useAppSelector(
    (state) => state.filters
  );

  const handlePlatformSelected = (e: TMouseEvent) => {
    if (!isHTMLElement(e.target)) return;
    dispatch(platformSelected(e.target.dataset.value as string));
  };

  const handleTagSelected = (e: TMouseEvent) => {
    if (!isHTMLElement(e.target)) return;
    dispatch(categorySelected(e.target.dataset.value as string));
  };

  const handleSort = (e: TMouseEvent) => {
    if (!isHTMLElement(e.target)) return;
    dispatch(sortBy(e.target.dataset.value as string));
  };

  let selectedPlatform;
  switch (platform) {
    case 'pc':
      selectedPlatform = 'PC (Windows)';
      break;
    case 'browser':
      selectedPlatform = 'web browser';
      break;
    case 'all':
      selectedPlatform = 'All Platforms';
      break;
    default:
      selectedPlatform = 'All Platforms';
      break;
  }

  const platformList = platformItemsRender(handlePlatformSelected);
  const tagList = tagItemsRender(tagListData, handleTagSelected);
  const sortList = sortItemsRender(handleSort);

  return (
    <div className="gamelist-filter">
      <div className="dropdown">
        <span>Platforms:</span>
        <div className="dropdown__button">{selectedPlatform}</div>
        <ul className="dropdown__list">{platformList}</ul>
      </div>
      <div className="dropdown">
        <span>Genre/Tag:</span>
        <div className="dropdown__button">{category}</div>
        <ul className="dropdown__list dropdown__list-tag">{tagList}</ul>
      </div>
      <div className="dropdown">
        <span>sortBy:</span>
        <div className="dropdown__button">{sort}</div>
        <ul className="dropdown__list ">{sortList}</ul>
      </div>
      <div className="filter">
        <input
          className="filter-input"
          type="text"
          onChange={(e) => dispatch(setInputSearch(e.target.value))}
          value={inputSearch}
        />
        <BiSearchAlt2 className="filter-input__svg" />
      </div>
    </div>
  );
};

const tagItemsRender = (
  tagListData: TTagsListData,
  handleTagSelected: (e: TMouseEvent) => void
) => {
  const tagList = tagListData.map((item: string) => {
    return (
      <li
        className="dropdown__list-item"
        data-value={item}
        onClick={handleTagSelected}
        id="categorySelected"
        key={item}
      >
        {item}
      </li>
    );
  });
  return tagList;
};

const platformItemsRender = (
  handlePlatformSelected: (e: TMouseEvent) => void
) => {
  const platformData = [
    { name: 'All platform', dataAtr: 'all', id: 'platformSelected' },
    { name: 'PC (Windows)', dataAtr: 'pc', id: 'platformSelected' },
    { name: 'web browser', dataAtr: 'browser', id: 'platformSelected' },
  ];

  const platformList = platformData.map(({ name, dataAtr, id }) => {
    return (
      <li
        className="dropdown__list-item"
        data-value={dataAtr}
        onClick={handlePlatformSelected}
        id={id}
        key={name}
      >
        {name}
      </li>
    );
  });
  return platformList;
};

const sortItemsRender = (handleSort: (e: TMouseEvent) => void) => {
  const sortData = [
    { name: 'relevance', dataAtr: 'relevance', id: 'sortBy' },
    { name: 'popularity', dataAtr: 'popularity', id: 'sortBy' },
    { name: 'release date', dataAtr: 'release-date', id: 'sortBy' },
    { name: 'alphabetical', dataAtr: 'alphabetical', id: 'sortBy' },
  ];

  const sortList = sortData.map(({ name, dataAtr, id }) => {
    return (
      <li
        className="dropdown__list-item"
        data-value={dataAtr}
        onClick={handleSort}
        id={id}
        key={name}
      >
        {name}
      </li>
    );
  });
  return sortList;
};

export default Filter;
