import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectVisibleProducts } from '../features/products/productsSelectors';
import ProductCard from './ProductCard';
import Filters from './Filters.jsx';
import NoResults from './NoResults';

const Grid = styled.div`
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap:16px;
  padding:24px;
`;

export default function ProductGrid() {
  const products = useSelector(selectVisibleProducts);

  return (
    <div>
      <div style={{padding:'16px 24px'}}>
        <Filters />
      </div>

      {products.length === 0 ? (
        <div style={{padding:'24px'}}>
          <NoResults message="No products found — try different filters" />
        </div>
      ) : (
        <Grid aria-label="product-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Grid>
      )}
    </div>
  );
}
