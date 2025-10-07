import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchProductById } from '../api/productsApi';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../features/favorites/favoritesSlice';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

const Wrap = styled.div`padding:24px;display:flex;gap:24px;flex-wrap:wrap;`;
const Img = styled.img`width:320px;height:320px;object-fit:contain;background:white;border-radius:12px;padding:12px;`;

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const favs = useSelector((s) => s.favorites.items);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    fetchProductById(id)
      .then((p) => {
        if (!mounted) return;
        setProduct(p);
      })
      .catch((err) => {
        if (mounted) setError(err.message || 'Failed to load');
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div style={{padding:24}}><ErrorMessage>{error}</ErrorMessage></div>;
  if (!product) return <div style={{padding:24}}>Product not found</div>;

  const isFav = favs.includes(product.id);

  return (
    <Wrap>
      <Img src={product.image} alt={product.title} />
      <div style={{maxWidth:640}}>
        <h2>{product.title}</h2>
        <p><strong>Category:</strong> {product.category}</p>
        <p>{product.description}</p>
        <p style={{fontSize:20,fontWeight:700}}>${Number(product.price).toFixed(2)}</p>
        <button className='cmn-btn-style' onClick={() => dispatch(isFav ? removeFavorite(product.id) : addFavorite(product.id))} aria-pressed={isFav}>
          {isFav ? 'Remove from favorites' : 'Add to favorites'}
        </button>
      </div>
    </Wrap>
  );
}
