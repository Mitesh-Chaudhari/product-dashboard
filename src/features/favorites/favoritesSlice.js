import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite(state, action) {
            const id = action.payload;
            if (!state.items.includes(id)) state.items.push(id);
        },
        removeFavorite(state, action) {
            state.items = state.items.filter((i) => i !== action.payload);
        },
    },
});


export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;