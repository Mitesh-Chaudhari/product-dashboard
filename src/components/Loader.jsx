import styled from 'styled-components';

const Wrap = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  padding:24px;
`;

export default function Loader({ label = 'Loading...' }) {
  return (
    <Wrap role="status" aria-live="polite">
      <div>{label}</div>
    </Wrap>
  );
}
