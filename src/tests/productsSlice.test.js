import productsReducer, { setSearch, setCategory, setSort } from '../features/products/productsSlice';

describe('products slice reducers', () => {
  it('should handle filters', () => {
    let state = productsReducer(undefined, { type: 'unknown' });
    state = productsReducer(state, setSearch('apple'));
    expect(state.filters.search).toBe('apple');
    state = productsReducer(state, setCategory('electronics'));
    expect(state.filters.category).toBe('electronics');
    state = productsReducer(state, setSort('price_asc'));
    expect(state.filters.sort).toBe('price_asc');
  });
});
