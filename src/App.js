import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes/routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { Provider } from 'react-redux';
import store from './store';
import { AuthProvider } from "./context";
// ----------------------------------------------------------------------

export default function App() {
  return (
    <AuthProvider>
    <Provider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
    </Provider>
    </AuthProvider>
  );
}
