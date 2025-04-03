import { isHTMLElement } from "../../tools/tools";
import { dropdownItem, TMouseEvent } from "../../types/types";

export function platformItemsView(
  PLATFORM_DATA: dropdownItem[],
  setPlatform: (platform: string) => void
) {
  const handlePlatformSelected = (e: TMouseEvent) => {
    if (!isHTMLElement(e.target)) return;
    setPlatform(e.target.dataset.value as string);
  };

  const platformList = PLATFORM_DATA.map(({ name, dataAtr, id }) => {
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
  });
  return platformList;
}
