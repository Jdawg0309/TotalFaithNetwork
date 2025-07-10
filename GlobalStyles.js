// src/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';
import { colors } from './theme';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Segoe UI', sans-serif;
    line-height: 1.6;
    background: ${colors.black};
    color: ${colors.yellow};
  }

  a {
    color: ${colors.blue};
    text-decoration: none;
  }
`;

export default GlobalStyles;
