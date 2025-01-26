import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

const hideFooterRoutes = ["/home"];

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const location = useLocation();

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="app-container">
        <Navbar />

        <div className="content">
          <ScrollToTop />
          <Outlet />
          {!hideFooterRoutes.includes(location.pathname) && <Footer />}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;