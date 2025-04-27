import { useSearchParams } from 'react-router';
import SearchForm from '../SearchForm/SearchForm';

function SearchFormWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (query) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('query', query);
      return newParams;
    });
  };

  const initialQuery = searchParams.get('query') || '';

  return (
    <div className="header__content">
      <h1 className="header__title">My Movie App</h1>
      <SearchForm initialQuery={initialQuery} onSearch={handleSearch} />
    </div>
  );
}

export default SearchFormWrapper;