import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeConfig>
        <GlobalStyles />
        <Router />
      </ThemeConfig>
    </BrowserRouter>
  );
};
export default App;
