import styled from 'styled-components';

const Wrap = styled.div`padding:32px;text-align:center;color:#666;`;

export default function NoResults({ message = 'No products found' }) {
  return <Wrap>{message}</Wrap>;
}
