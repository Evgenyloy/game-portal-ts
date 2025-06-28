import { isHTMLElement } from "../../tools/tools";
import { dropdownItem, TMouseEvent } from "../../types/types";

interface SortItemsViewProps {
  sorting: dropdownItem[];
  onSelect: (sort: string) => void;
}

export function SortItemsView({ sorting, onSelect }: SortItemsViewProps) {
  const handleSort = (e: TMouseEvent) => {
    if (!isHTMLElement(e.target)) return;
    onSelect(e.target.dataset.value as string);
  };

  return (
    <>
      {sorting.map(({ name, dataAtr, id }) => (
        <li
          className="dropdown__list-item"
          data-value={dataAtr}
          onClick={handleSort}
          id={id}
          key={name}
        >
          {name}
        </li>
      ))}
    </>
  );
}
