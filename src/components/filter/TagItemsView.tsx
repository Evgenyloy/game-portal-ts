import { isHTMLElement } from "../../tools/tools";
import { TMouseEvent, TTagsListData } from "../../types/types";

interface TagItemsViewPRoms {
  tags: TTagsListData;
  onSelect: (category: string) => void;
}

export function TagItemsView({ tags, onSelect }: TagItemsViewPRoms) {
  const handleTagSelected = (e: TMouseEvent) => {
    if (!isHTMLElement(e.target)) return;
    onSelect(e.target.dataset.value as string);
  };

  return (
    <>
      {tags.map((item: string) => (
        <li
          className="dropdown__list-item"
          data-value={item}
          onClick={handleTagSelected}
          id="categorySelected"
          key={item}
        >
          {item}
        </li>
      ))}
    </>
  );
}
