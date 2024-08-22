import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import MainPage from '../pages/MainPage';
import MainLayout from '../mainLayout/MainLayout';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<MainPage />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
