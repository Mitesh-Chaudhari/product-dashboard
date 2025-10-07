import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { removeFavorite } from '../features/favorites/favoritesSlice';

const Grid = styled.div`display:grid;grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));gap:16px;padding:24px;`;
const CommonButton = styled(Link)`padding:8px 14px;border-radius:8px;border:1px solid #ddd;background:transparent;cursor:pointer;background:#222;color:#fff;font-size: 14px;`;


export default function FavoritesPage() {
  const favIds = useSelector((s) => s.favorites.items);
  const products = useSelector((s) => s.products.items);
  const dispatch = useDispatch();

  const favProducts = products.filter((p) => favIds.includes(p.id));

  if (!products.length) return <div style={{padding:24}}>Loading products...</div>;
  if (favProducts.length === 0) return <div style={{padding:24}}>No favorites yet</div>;

  return (
    <Grid>
      {favProducts.map((p) => (
        <article key={p.id} style={{background:'white',padding:12,borderRadius:12}}>
          <Link to={`/product/${p.id}`}><img src={p.image} alt={p.title} style={{height:120,objectFit:'contain'}}/></Link>
          <h4 style={{fontSize:14}}>{p.title}</h4>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <CommonButton to={`/product/${p.id}`}>View</CommonButton>
            <button className='cmn-btn-style' onClick={() => dispatch(removeFavorite(p.id))} aria-label={`Remove ${p.title} from favorites`}>Remove</button>
          </div>
        </article>
      ))}
    </Grid>
  );
}
