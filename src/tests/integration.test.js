// src/tests/integration.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../app/store';
import ProductCard from '../components/ProductCard';
import { addFavorite, removeFavorite } from '../features/favorites/favoritesSlice';
import { useState } from 'react';
import styled from 'styled-components';

// Mock Products
const mockProducts = [
  { id: 1, title: 'Test Product', price: 50, category: 'electronics', image: 'test.jpg' },
  { id: 2, title: 'Another Product', price: 75, category: 'clothing', image: 'test2.jpg' },
];

// Simple mock dashboard component
function MockProductPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredProducts = mockProducts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || p.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <input
        aria-label="Search products"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        aria-label="Filter by category"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>
      <div aria-label="product-grid" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {filteredProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

describe('Product integration', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MockProductPage />
        </BrowserRouter>
      </Provider>
    );
  });

  test('search -> filter -> favorite flow', async () => {
    // SEARCH FLOW
    const searchInput = screen.getByLabelText('Search products');
    fireEvent.change(searchInput, { target: { value: 'Another' } });

    expect(screen.queryByText('Test Product')).not.toBeInTheDocument();
    expect(screen.getByText('Another Product')).toBeInTheDocument();

    // FILTER FLOW
    const categoryFilter = screen.getByLabelText('Filter by category');
    fireEvent.change(categoryFilter, { target: { value: 'clothing' } });

    expect(screen.queryByText('Test Product')).not.toBeInTheDocument();
    expect(screen.getByText('Another Product')).toBeInTheDocument();

    // FAVORITE TOGGLE FLOW
    const favButtons = screen.getAllByRole('button', { name: /add .* to favorites/i });
    expect(favButtons.length).toBeGreaterThan(0);

    const firstFav = favButtons[0];
    fireEvent.click(firstFav);

    // Button should now indicate removal
    expect(firstFav).toHaveAttribute('aria-pressed', 'true');

    // Remove favorite
    fireEvent.click(firstFav);
    expect(firstFav).toHaveAttribute('aria-pressed', 'false');
  });
});
