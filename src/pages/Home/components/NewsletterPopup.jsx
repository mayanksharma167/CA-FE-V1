import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    // Check if user is already subscribed or logged in
    const isSubscribed = localStorage.getItem("newsletterSubscribed") === "true";
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Replace with your actual auth check

    // Only show popup if user is on jobs page, not subscribed, and not logged in
    const shouldShowPopup = () => {
      const isJobsPage = window.location.pathname.includes('/jobs'); // Adjust based on your routing
      return isJobsPage && !isSubscribed && !isLoggedIn;
    };

    let popupTimer;

    // Show popup after 5 seconds if conditions are met
    if (shouldShowPopup()) {
      popupTimer = setTimeout(() => {
        setIsVisible(true);
      }, 5000); // 5 seconds delay
    }

    // Add route change listener if you're using client-side routing
    const handleRouteChange = () => {
      if (shouldShowPopup()) {
        // Clear any existing timer
        if (popupTimer) {
          clearTimeout(popupTimer);
        }
        // Set new timer for 5 seconds
        popupTimer = setTimeout(() => {
          setIsVisible(true);
        }, 5000);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    
    // Cleanup function
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      if (popupTimer) {
        clearTimeout(popupTimer);
      }
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setStatus({
        type: "error",
        message: "Please enter your email address",
      });
      return;
    }

    try {
      // Simulated API call - replace with your actual API endpoint
      // await subscribeToNewsletter(email);
      
      // Set subscription status in localStorage
      localStorage.setItem("newsletterSubscribed", "true");
      
      setStatus({
        type: "success",
        message: "Successfully subscribed! Thank you.",
      });
      
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-title"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-[80%] sm:md:lg:xl:w-full h-96 max-w-2xl bg-cover bg-center rounded-xl shadow-2xl text-white py-14 px-8 relative flex flex-col items-center"
        style={{
          backgroundImage: "url('./bgpop.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <button
          className="absolute top-4 right-4 text-gray-300 hover:text-white text-2xl font-bold"
          onClick={handleClose}
          aria-label="Close newsletter popup"
        >
          ×
        </button>

        <h2
          id="newsletter-title"
          className="text-2xl font-bold text-center mb-4"
        >
          Stay Ahead with the Latest Job Updates
        </h2>

        <p className="text-gray-300 text-center mb-6">
          Subscribe to receive real-time job notifications from our portal and
          never miss an opportunity.
        </p>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex w-[85%] flex-col sm:flex-row items-center gap-3 mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full sm:flex-1 p-3 text-gray-800 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 transition duration-300 text-white font-semibold px-5 py-3 rounded-md"
            >
              Subscribe
            </button>
          </div>

          {status.message && (
            <div
              className={`mt-4 text-center p-2 rounded ${
                status.type === "error" ? "text-red-500" : "text-green-500"
              }`}
            >
              {status.message}
            </div>
          )}
        </form>

        <p className="text-gray-400 text-sm text-center mt-4">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </motion.div>
    </div>
  );
};

export default NewsletterPopup;