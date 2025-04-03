import { isHTMLElement } from "../../tools/tools";
import { dropdownItem, TMouseEvent } from "../../types/types";

export function sortItemsView(
  SORT_DATA: dropdownItem[],
  setSort: (sort: string) => void
) {
  const handleSort = (e: TMouseEvent) => {
    if (!isHTMLElement(e.target)) return;
    setSort(e.target.dataset.value as string);
  };

  const sortList = SORT_DATA.map(({ name, dataAtr, id }) => {
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
}
