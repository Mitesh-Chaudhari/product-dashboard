import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* { box-sizing: border-box; }
body { margin: 0; font-family: Inter, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;   background: #f0ece8; color:#111; }
a { color: inherit; text-decoration:none }
`;

export default GlobalStyle;