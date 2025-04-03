import { INews } from "../../types/types";

export const onNewsLoaded = (news: INews[]) => {
  const filteredNews = news.filter(
    (news) => !news.article_content.includes("&lt")
  );
  const newsArr = filteredNews.slice(0, 4);
  return newsArr;
};
