import { tagListData } from '../../data/data';
import {
  platformSelected,
  categorySelected,
  sortBy,
  setInputSearch,
} from '../../slices/headerFiltersSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import './filter.scss';
import { BiSearchAlt2 } from 'react-icons/bi';
import { TTagsListData } from '../../data/dataTypes';

const Filter = () => {
  const dispatch = useAppDispatch();
  const { platform, category, sort, inputSearch } = useAppSelector(
    (state) => state.filters
  );

  const handlePlatformSelected = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    if (!(e.target instanceof HTMLLIElement)) return;
    dispatch(platformSelected(e.target.dataset.value as string));
  };

  const handleTagSelected = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    if (!(e.target instanceof HTMLLIElement)) return;
    dispatch(categorySelected(e.target.dataset.value as string));
  };

  const handleSort = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (!(e.target instanceof HTMLLIElement)) return;
    dispatch(sortBy(e.target.dataset.value as string));
  };

  const tagItemsRender = (tagListData: TTagsListData) => {
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

  const tagList = tagItemsRender(tagListData);

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

  return (
    <div className="gamelist-filter">
      <div className="dropdown">
        <span>Platforms:</span>
        <div className="dropdown__button">{selectedPlatform}</div>
        <ul className="dropdown__list">
          <li
            className="dropdown__list-item"
            data-value="all"
            onClick={handlePlatformSelected}
            id="platformSelected"
          >
            All Platforms
          </li>
          <li
            className="dropdown__list-item"
            data-value="pc"
            onClick={handlePlatformSelected}
            id="platformSelected"
          >
            PC (Windows)
          </li>
          <li
            className="dropdown__list-item"
            data-value="browser"
            onClick={handlePlatformSelected}
            id="platformSelected"
          >
            web browser
          </li>
        </ul>
      </div>
      <div className="dropdown">
        <span>Genre/Tag:</span>
        <div className="dropdown__button">{category}</div>
        <ul className="dropdown__list dropdown__list-tag">{tagList}</ul>
      </div>
      <div className="dropdown">
        <span>sortBy:</span>
        <div className="dropdown__button">{sort}</div>
        <ul className="dropdown__list ">
          <li
            className="dropdown__list-item"
            data-value="relevance"
            onClick={handleSort}
            id="sortBy"
          >
            relevance
          </li>
          <li
            className="dropdown__list-item"
            data-value="popularity"
            onClick={handleSort}
            id="sortBy"
          >
            popularity
          </li>
          <li
            className="dropdown__list-item"
            data-value="release-date"
            onClick={handleSort}
            id="sortBy"
          >
            release date
          </li>
          <li
            className="dropdown__list-item"
            data-value="alphabetical"
            onClick={handleSort}
            id="sortBy"
          >
            alphabetical
          </li>
        </ul>
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

export default Filter;
