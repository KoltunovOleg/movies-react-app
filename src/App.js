import { BrowserRouter, Routes, Route } from 'react-router';
import MovieListPage from './components/MovieListPage/MovieListPage';
import MovieDetailsWrapper from './components/MovieDetailsWrapper/MovieDetailsWrapper';
import SearchFormWrapper from './components/SearchFormWrapper/SearchFormWrapper';
import AddMovieForm from './components/AddMovieForm/AddMovieForm';
import EditMovieForm from './components/EditMovieForm/EditMovieForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieListPage />}>
          <Route path="/" element={<SearchFormWrapper />}>
            <Route path="new" element={<AddMovieForm />} />
            <Route path=":movieId/edit" element={<EditMovieForm />} />
          </Route>
          <Route path=":movieId" element={<MovieDetailsWrapper />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
