import { useShallow } from "zustand/react/shallow";
import { BiSearchAlt2 } from "react-icons/bi";
import { useHeaderFiltersStore } from "../../store/headerFiltersStore";
import { SortItemsView } from "./SortItemsView";
import { TagItemsView } from "./TagItemsView";
import { PlatformItemsView } from "./PlatformItemsView";
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

  const selectedPlatform = selectPlatform(platform);

  return (
    <div className="gamelist-filter">
      <div className="dropdown">
        <span>Platforms:</span>
        <div className="dropdown__button">{selectedPlatform}</div>
        <ul className="dropdown__list">
          {
            <PlatformItemsView
              platforms={PLATFORM_DATA}
              onSelect={setPlatform}
            />
          }
        </ul>
      </div>
      <div className="dropdown">
        <span>Genre/Tag:</span>
        <div className="dropdown__button">{category}</div>
        <ul className="dropdown__list dropdown__list-tag">
          {<TagItemsView tags={TAGS_LIST_DATA} onSelect={setCategory} />}
        </ul>
      </div>
      <div className="dropdown">
        <span>sortBy:</span>
        <div className="dropdown__button">{sort}</div>
        <ul className="dropdown__list ">
          {<SortItemsView sorting={SORT_DATA} onSelect={setSort} />}
        </ul>
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
