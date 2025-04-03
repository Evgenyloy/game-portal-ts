import NewsBlock from "../newsBlock/NewsBlock";
import ExploreMmo from "../exploreMoo/ExploreMoo";
import NewsList from "../newsList/NewsList";

const MainPage = () => {
  return (
    <main>
      <NewsBlock />
      <ExploreMmo />
      <NewsList />
    </main>
  );
};

export default MainPage;
