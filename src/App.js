import { BrowserRouter, Routes, Route } from 'react-router';
import MovieListPage from './components/MovieListPage/MovieListPage';
import MovieDetailsWrapper from './components/MovieDetailsWrapper/MovieDetailsWrapper';
import SearchFormWrapper from './components/SearchFormWrapper/SearchFormWrapper'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieListPage />}>
          <Route index element={<SearchFormWrapper />} />
          <Route path=":movieId" element={<MovieDetailsWrapper />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;