import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Bar = styled.header`
  display:flex;align-items:center;justify-content:space-between;padding:12px 20px;background:white;box-shadow:0 1px 4px rgba(0,0,0,0.06);
`;
const Left = styled.div`display:flex;gap:12px;align-items:center;`;
const Title = styled.h1`margin:0;font-size:18px;`;
const Right = styled.nav`display:flex;gap:16px;align-items:center;`;
const StyledLink = styled(NavLink)`color:inherit;text-decoration:none;font-weight:600;`;

export default function Header() {
  return (
    <Bar>
      <Left>
        <Link to="/"><Title>Product Dashboard</Title></Link>
      </Left>
      <Right aria-label="Main navigation">
        <StyledLink to="/" end>Home</StyledLink>
        <StyledLink to="/favorites">Favorites</StyledLink>
      </Right>
    </Bar>
  );
}
