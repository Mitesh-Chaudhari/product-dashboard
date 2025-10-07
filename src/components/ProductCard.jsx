import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../features/favorites/favoritesSlice';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const Card = styled.article`background:white;border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:8px;box-shadow:0 1px 6px rgba(0,0,0,0.06);text-align:center;`;
const Img = styled.img`height:140px;object-fit:contain;align-self:center;max-width:100%;`;
const Title = styled.h3`font-size:14px;margin:0;min-height:38px;`;
const Price = styled.div`font-weight:600`;
const Footer = styled.div`margin-top:auto;display:flex;justify-content:space-between;align-items:center;gap:8px;`;
const CommonButton = styled(Link)`padding:8px 14px;border-radius:8px;border:1px solid #ddd;background:transparent;cursor:pointer;background:#222;color:#fff;font-size: 14px;`;
const NoStyleButton = styled.button`padding:8px;border:none;background:transparent;cursor:pointer;`;

export default function ProductCard({ product }) {
    const dispatch = useDispatch();
    const favs = useSelector((s) => s.favorites.items);
    const isFav = favs.includes(product.id);

    return (
        <Card>
            <Link to={`/product/${product.id}`} aria-label={`View ${product.title}`}>
                <Img src={product.image} alt={product.title} />
                <Title>{product.title}</Title>
            </Link>
            <div>
                <Price>${Number(product.price).toFixed(2)}</Price>
            </div>
            <Footer>
                <CommonButton to={`/product/${product.id}`}>View</CommonButton>
                <NoStyleButton
                    aria-pressed={isFav}
                    aria-label={!isFav ? `Add ${product.title} to favorites` : `Remove ${product.title} from favorites`}
                    onClick={() => dispatch(isFav ? removeFavorite(product.id) : addFavorite(product.id))}
                >
                    {!isFav ? <FaRegHeart color='#ff0000' /> : <FaHeart color='#ff0000'/>}
                </NoStyleButton>
            </Footer>
        </Card>
    );
}
