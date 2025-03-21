import React from "react";

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/components/Home";
import MyJobs from "../pages/MyJobs";
import SalaryPage from "../pages/SalaryPage";
import CreateJob from "../pages/CreateJob";
import UpdateJob from "../pages/UpdateJob";
import Login from "../pages/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Banner from "../components/Banner";
import Signup from "../pages/Signup";
import AboutPage from "../pages/AboutPage";
import NotFound from "../pages/NotFound";
import Resume from "../pages/Resume";
import CareersPage from "../pages/CareersPage";
import AdminDashboard from "../pages/AdminDashboard";
import AIDashboard from "../components/AIDashboard";
import PrivacyPolicy from "../components/PrivacyPolicy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Banner />,
      },
      {
        path: "/jobs",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutPage />
      },
      {
        path: "/privacy-Policy",
        element: <PrivacyPolicy />
      },
      {
        path: "/ai",
        element: <AIDashboard />
      },
      {
        path: "/resume",
        element: <Resume />
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/careers",
        element: <CareersPage />
      },
      {
        path: "/admin",
        element: <AdminDashboard />
      },
      {
        path: "*",
        element: <NotFound />,
      }


    ],
  },

]);

export default router;
