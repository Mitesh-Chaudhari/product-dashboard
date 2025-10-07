import { createSelector } from '@reduxjs/toolkit';

const selectProductsState = (state) => state.products;

export const selectAllProducts = (state) => selectProductsState(state).items;
export const selectFilters = (state) => selectProductsState(state).filters;
export const selectCategories = (state) => selectProductsState(state).categories;

export const selectVisibleProducts = createSelector(
    [selectAllProducts, selectFilters],
    (items, filters) => {
        const { search, category, sort } = filters;
        let result = items.slice();
        if (search) {
            const q = search.toLowerCase();
            result = result.filter((p) => p.title.toLowerCase().includes(q));
        }
        if (category && category !== 'all') {
            result = result.filter((p) => p.category === category);
        }
        if (sort === 'price_asc') {
            result.sort((a, b) => a.price - b.price);
        } else if (sort === 'price_desc') {
            result.sort((a, b) => b.price - a.price);
        }
        return result;
    }
);