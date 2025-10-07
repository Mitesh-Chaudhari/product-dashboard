import styled from 'styled-components';

const Box = styled.div`
  background: #ffeef0;
  color: #611a15;
  border: 1px solid #ffccd0;
  padding: 12px 16px;
  border-radius: 8px;
`;

export default function ErrorMessage({ children }) {
  return (
    <Box role="alert">
      {children}
    </Box>
  );
}
