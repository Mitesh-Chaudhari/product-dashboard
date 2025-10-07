import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setCategory, setSort } from '../features/products/productsSlice';
import { selectCategories } from '../features/products/productsSelectors';
import SearchBar from './SearchBar';

const MainWrap = styled.div`display:flex;align-items:center;padding:6px 0;justify-content:space-between;flex-wrap:wrap;gap:10px 0;`;
const Wrap = styled.div`display:flex;gap:12px;align-items:center;flex-wrap:wrap;`;
const Select = styled.select`padding:8px 10px;border-radius:8px;border:1px solid #ddd;`;

export default function Filters() {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);

    return (
        <>
            <MainWrap>
                <SearchBar />
                <Wrap>
                    <label>
                        Category : &nbsp;
                        <Select onChange={(e) => dispatch(setCategory(e.target.value))} aria-label="Filter by category">
                            <option value="all">All</option>
                            {categories && categories.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </Select>
                    </label>

                    <label>
                        Sort : &nbsp;
                        <Select onChange={(e) => dispatch(setSort(e.target.value))} aria-label="Sort by price">
                            <option value="none">None</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                        </Select>
                    </label>
                </Wrap>
            </MainWrap>
        </>
    );
}
