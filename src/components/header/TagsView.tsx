import { Link } from "react-router-dom";
import { ITagsData, TClickLinkEvent } from "../../types/types";

interface TagsViewProps {
  tags: ITagsData[];
  setCategory: (category: string) => void;
}

function TagsView({ tags, setCategory }: TagsViewProps) {
  const handleTagClick = (e: TClickLinkEvent) => {
    if (!(e.target instanceof HTMLAnchorElement)) return;
    setCategory(e.target.dataset.link as string);
  };

  return (
    <>
      {tags.map(({ name, data }) => (
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
      ))}
    </>
  );
}

export default TagsView;
