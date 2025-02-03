import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import { useEffect, useContext } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider, ThemeContext } from "./context/themeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const hideFooterRoutes = ["/home"];

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const { theme } = useContext(ThemeContext); // Access theme context

  return (
    <div className="app-container" data-theme={theme}>
      <Navbar />
      <div className="content">
        <ScrollToTop />
        <Outlet />
        {!hideFooterRoutes.includes(location.pathname) && <Footer />}
      </div>
    </div>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
