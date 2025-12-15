const config = {
  // Users service залишаємо як є
  USERS_SERVICE: process.env.REACT_APP_USERS_SERVICE || 'http://localhost:3000',

  // Artworks service використовуємо API_BASE
  ARTWORKS_SERVICE: process.env.REACT_APP_VISUALART_API_BASE,
  DEFAULT_PAGE_SIZE: 10,
  UI_URL_PREFIX: process.env.REACT_APP_UI_URL_PREFIX || '',
 
};

export default config;
