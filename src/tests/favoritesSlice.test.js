import favoritesReducer, { addFavorite, removeFavorite } from '../features/favorites/favoritesSlice';

describe('favorites slice', () => {
  it('adds and removes favorites', () => {
    let state = favoritesReducer(undefined, { type: 'unknown' });
    state = favoritesReducer(state, addFavorite(3));
    expect(state.items).toContain(3);
    state = favoritesReducer(state, addFavorite(3));
    // length still 1 (no duplicates)
    expect(state.items.filter(Boolean).length).toBe(1);
    state = favoritesReducer(state, removeFavorite(3));
    expect(state.items).not.toContain(3);
  });
});
