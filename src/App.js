import { BrowserRouter, Routes, Route } from 'react-router';
import MovieListPage from './components/MovieListPage/MovieListPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
