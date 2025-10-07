import axios from 'axios';

const BASE = 'https://fakestoreapi.com';

export const fetchProducts = async () => {
    const resp = await axios.get(`${BASE}/products`);
    return resp.data;
};

export const fetchProductById = async (id) => {
    const resp = await axios.get(`${BASE}/products/${id}`);
    return resp.data;
};

export const fetchCategories = async () => {
    const resp = await axios.get(`${BASE}/products/categories`);
    return resp.data;
};