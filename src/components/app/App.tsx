import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import MainPage from '../pages/MainPage';
import MainLayout from '../mainLayout/MainLayout';
import OneNews from '../oneNews/OneNews';
import OneGame from '../oneGame/OneGame';
import NewsList from '../newsList/NewsList';
import GamesList from '../gamesList/GamesList';
import About from '../about/About';
import Page404 from '../page404/Page404';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<MainPage />} />
            <Route path="news" element={<OneNews />} />
            <Route path="game/:id" element={<OneGame />} />
            <Route path="news-list" element={<NewsList />} />
            <Route path="game_list" element={<GamesList />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
