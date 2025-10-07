import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../app/store';
import App from '../App';

jest.mock('../api/productsApi', () => ({
  fetchProducts: jest.fn(),
  fetchCategories: jest.fn(),
  fetchProductById: jest.fn(),
}));

import * as api from '../api/productsApi';

const mockProducts = [
  { id: 1, title: 'Alpha Watch', price: 50, category: 'electronics', image: '' },
  { id: 2, title: 'Beta Shoes', price: 80, category: 'footwear', image: '' },
  { id: 3, title: 'Gamma Phone', price: 300, category: 'electronics', image: '' },
];

beforeEach(() => {
  api.fetchProducts.mockResolvedValue(mockProducts);
  api.fetchCategories.mockResolvedValue(['electronics', 'footwear']);
  api.fetchProductById.mockImplementation((id) => Promise.resolve(mockProducts.find(p => String(p.id) === String(id))));
});

afterEach(() => {
  jest.clearAllMocks();
});

test('search -> filter -> favorite flow', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  await waitFor(() => expect(store.getState().products.items.length).toBeGreaterThan(0), { timeout: 3000 });

  const searchInput = screen.getByPlaceholderText(/Search products/i);
  fireEvent.change(searchInput, { target: { value: 'Alp' } });

  await new Promise((r) => setTimeout(r, 500));

  expect(screen.getByText('Alpha Watch')).toBeInTheDocument();

  const categorySelect = screen.getByLabelText('Filter by category');
  fireEvent.change(categorySelect, { target: { value: 'electronics' } });

  const favButtons = screen.getAllByRole('button', { name: /favorite|remove/i });
  expect(favButtons.length).toBeGreaterThan(0);
  fireEvent.click(favButtons[0]);

  await waitFor(() => {
    const favorites = store.getState().favorites.items;
    expect(favorites.length).toBeGreaterThanOrEqual(1);
  });
});
