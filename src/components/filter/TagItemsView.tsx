import { isHTMLElement } from "../../tools/tools";
import { TMouseEvent, TTagsListData } from "../../types/types";

export function tagItemsView(
  tagListData: TTagsListData,
  setCategory: (category: string) => void
) {
  const handleTagSelected = (e: TMouseEvent) => {
    if (!isHTMLElement(e.target)) return;
    setCategory(e.target.dataset.value as string);
  };

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
}
