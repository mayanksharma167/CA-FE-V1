import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    // Function to check if it's a new session
    const isNewSession = () => {
      const lastVisit = localStorage.getItem("lastVisitTimestamp");
      const currentTime = new Date().getTime();

      // If there's no last visit or it's been more than 30 minutes
      if (!lastVisit || currentTime - parseInt(lastVisit) > 30 * 60 * 1000) {
        return true;
      }
      return false;
    };

    // Update last visit timestamp
    const updateLastVisit = () => {
      localStorage.setItem(
        "lastVisitTimestamp",
        new Date().getTime().toString()
      );
    };

    // Check if it's a new session and popup hasn't been shown
    if (isNewSession()) {
      updateLastVisit();
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Update timestamp when component mounts
    localStorage.setItem("lastVisitTimestamp", new Date().getTime().toString());

    // Add event listener for when the page is hidden/visible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden (user switched tabs or minimized window)
        localStorage.setItem("lastHidden", new Date().getTime().toString());
      } else {
        // Page is visible again
        const lastHidden = localStorage.getItem("lastHidden");
        if (lastHidden) {
          const timeDiff = new Date().getTime() - parseInt(lastHidden);
          // If the page was hidden for more than 30 minutes, consider it a new session
          if (timeDiff > 30 * 60 * 1000) {
            setIsVisible(true);
            localStorage.setItem(
              "lastVisitTimestamp",
              new Date().getTime().toString()
            );
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Update the timestamp when popup is closed
    localStorage.setItem("lastVisitTimestamp", new Date().getTime().toString());
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
          backgroundImage:
            "url('https://img.freepik.com/free-vector/blue-green-patterned-background-vector_53876-77848.jpg?t=st=1738524454~exp=1738528054~hmac=aa119ba1eac6ed667f40b7bdd8e8b1d59a6dd490869c08f71a62252b4e852216&w=826')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Rest of the JSX remains the same */}
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
