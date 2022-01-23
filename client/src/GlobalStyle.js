import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --maxFontSize: 6rem;
    --medFontSize: 1.5rem;
    --minFontSize: 1rem;
    --white: #fefefe;
    --black: #020202;
    --shaddow: #000044;
    --button: #1088bf;
    --buttonHover: #10bfbf;
    --buttonHoverBorder: #10afbf;
    --error: #fb0101;
    --succes: #01bf01;
    --darkBlue: #010424;
  }

  * {
    font-family: "Arial", sans-serif;
    box-sizing: border-box;
    color: var(--white);
  }

  body {
    margin: 0;
    padding: 0;
    display: block;
    background: var(--darkBlue);
  }

  h1 {
    font-size: var(--maxFontSize);
  }
`;
