import { useShallow } from "zustand/react/shallow";
import { BiSearchAlt2 } from "react-icons/bi";
import { useHeaderFiltersStore } from "../../store/headerFiltersStore";
import { sortItemsView } from "./SortItemsView";
import { tagItemsView } from "./TagItemsView";
import { platformItemsView } from "./PlatformItemsView";
import { PLATFORM_DATA, SORT_DATA, TAGS_LIST_DATA } from "./filter-data";
import { selectPlatform } from "./utils";
import "./filter.scss";

function Filter() {
  const {
    category,
    inputSearch,
    platform,
    sort,
    setCategory,
    setInput,
    setPlatform,
    setSort,
  } = useHeaderFiltersStore(
    useShallow((state) => ({
      category: state.category,
      inputSearch: state.inputSearch,
      platform: state.platform,
      sort: state.sort,
      setCategory: state.setCategory,
      setInput: state.setInput,
      setPlatform: state.setPlatform,
      setSort: state.setSort,
    }))
  );

  const platformList = () => platformItemsView(PLATFORM_DATA, setPlatform);
  const sortList = () => sortItemsView(SORT_DATA, setSort);
  const tagList = () => tagItemsView(TAGS_LIST_DATA, setCategory);

  const selectedPlatform = selectPlatform(platform);

  return (
    <div className="gamelist-filter">
      <div className="dropdown">
        <span>Platforms:</span>
        <div className="dropdown__button">{selectedPlatform}</div>
        <ul className="dropdown__list">{platformList()}</ul>
      </div>
      <div className="dropdown">
        <span>Genre/Tag:</span>
        <div className="dropdown__button">{category}</div>
        <ul className="dropdown__list dropdown__list-tag">{tagList()}</ul>
      </div>
      <div className="dropdown">
        <span>sortBy:</span>
        <div className="dropdown__button">{sort}</div>
        <ul className="dropdown__list ">{sortList()}</ul>
      </div>
      <div className="filter">
        <input
          className="filter-input"
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={inputSearch}
        />
        <BiSearchAlt2 className="filter-input__svg" />
      </div>
    </div>
  );
}

export default Filter;
