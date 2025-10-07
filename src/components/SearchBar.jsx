import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import styled from 'styled-components';
import { setSearch } from '../features/products/productsSlice';

const Input = styled.input`padding:8px 12px;border:1px solid #ddd;border-radius:8px;min-width:350px;`;

export default function SearchBar() {
  const dispatch = useDispatch();
  const debouncedRef = useRef();

  useEffect(() => {
    debouncedRef.current = debounce((val) => dispatch(setSearch(val)), 400);
    return () => debouncedRef.current.cancel();
  }, [dispatch]);

  const onChange = useCallback((e) => {
    const val = e.target.value;
    debouncedRef.current(val);
  }, []);

  return (
    <Input
      className='search-bar'
      aria-label="Search products"
      placeholder="Search products..."
      onChange={onChange}
    />
  );
}
