import { isHTMLElement } from "../../tools/tools";
import { dropdownItem, TMouseEvent } from "../../types/types";

interface PlatformItemsProps {
  platforms: dropdownItem[];
  onSelect: (platform: string) => void;
}

export function PlatformItemsView({ platforms, onSelect }: PlatformItemsProps) {
  const handlePlatformSelected = (e: TMouseEvent) => {
    if (!isHTMLElement(e.target)) return;
    onSelect(e.target.dataset.value as string);
  };

  return (
    <>
      {platforms.map(({ name, dataAtr, id }) => {
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
      })}
    </>
  );
}
