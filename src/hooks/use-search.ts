import { useContext } from 'react';
import searchContext from '../contexts/SearchContext';

const useSearch = () => useContext(searchContext);

export default useSearch;
