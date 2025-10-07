import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/productsApi';


export const loadProducts = createAsyncThunk('products/load', async () => {
    const data = await api.fetchProducts();
    return data;
});


export const loadCategories = createAsyncThunk('products/loadCategories', async () => {
    const data = await api.fetchCategories();
    return data;
});


const initialState = {
    items: [],
    status: 'idle',
    error: null,
    categories: [],
    filters: {
        search: '',
        category: 'all',
        sort: 'none',
    },
};


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSearch(state, action) {
            state.filters.search = action.payload;
        },
        setCategory(state, action) {
            state.filters.category = action.payload;
        },
        setSort(state, action) {
            state.filters.sort = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(loadProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(loadProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(loadCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            });
    },
});


export const { setSearch, setCategory, setSort } = productsSlice.actions;
export default productsSlice.reducer;