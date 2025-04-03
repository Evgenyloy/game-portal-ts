import { useEffect, useState } from "react";
import { INews } from "../../types/types";

export const useInfinityScroll = (newsListCopy: INews[]) => {
  const [itemPerPage, setItemPerPage] = useState<number>(10);

  useEffect(() => {
    const scrollHandler = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const innerHeight = window.innerHeight;

      if (
        scrollHeight - (scrollTop + innerHeight) < 150 &&
        newsListCopy.length < 45
      ) {
        setItemPerPage((prev) => prev + 10);
      }
    };

    document.addEventListener("scroll", scrollHandler);
    return () => document.removeEventListener("scroll", scrollHandler);
  }, [itemPerPage]);

  return { itemPerPage };
};
