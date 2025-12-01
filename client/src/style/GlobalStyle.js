import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Полный сброс стилей */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
    background-color: ${props => props.theme.background || '#101117'};
    color: ${props => props.theme.text || '#FFFFFF'};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* Добавляем универсальные стили */
  * {
    box-sizing: border-box;
    font-family: ${props => props.theme.fontFamily || "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"};
  }
  
  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
  }

  input, select, textarea {
    background: ${props => props.theme.surface || '#1a1b23'};
    color: ${props => props.theme.text || '#FFFFFF'};
    border: 1px solid ${props => props.theme.border || '#4A4C50'};
    border-radius: 8px;
    padding: 8px 12px;
  }

  /* Подключение шрифтов */
  @font-face {
    font-family: 'fontHarryPotter';
    src: url('./assets/fonts/Harry_Potter_Font.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'fontKaushanScript';
    src: url('./assets/fonts/KaushanScript.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;

export default GlobalStyle;