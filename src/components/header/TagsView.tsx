import { Link } from "react-router-dom";
import { ITagsData, TClickLinkEvent } from "../../types/types";

function TagsView(
  tagsData: ITagsData[],
  setCategory: (category: string) => void
) {
  const handleTagClick = (e: TClickLinkEvent) => {
    if (!(e.target instanceof HTMLAnchorElement)) return;
    setCategory(e.target.dataset.link as string);
  };
  const item = tagsData.map(({ name, data }) => {
    return (
      <li className="sub-menu__item" key={name}>
        <Link
          to="game-list"
          className="sub-menu__link"
          data-link={data}
          onClick={handleTagClick}
        >
          {name}
        </Link>
      </li>
    );
  });
  return item;
}

export default TagsView;
