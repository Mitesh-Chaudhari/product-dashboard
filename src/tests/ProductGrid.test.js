import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProductGrid from '../components/ProductGrid';

const mockStore = configureStore([]);

test('renders product grid with items', () => {
  const store = mockStore({
    products: { items: [{id:1,title:'Test Product',price:10,image:''}], filters:{search:'',category:'all',sort:'none'}, categories:[] },
    favorites: { items: [] }
  });

  render(
    <Provider store={store}>
      <ProductGrid />
    </Provider>
  );

  expect(screen.getByLabelText('product-grid')).toBeInTheDocument();
  expect(screen.getByText('Test Product')).toBeInTheDocument();
});
