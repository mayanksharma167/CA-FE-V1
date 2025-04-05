import React, { useCallback, useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Banner.css";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ThemeContext } from "../context/themeContext";

const Banner = () => {
  const navigate = useNavigate();
  const [currentSvgIndex, setCurrentSvgIndex] = useState(0);
  const { theme } = useContext(ThemeContext);

  // Refs for scroll animations
  const featuredSectionRef = useRef(null);
  const testimonialSectionRef = useRef(null);
  const categoryRef = useRef(null);
  const ctaSectionRef = useRef(null);

  // Check if sections are in view
  const testimonialInView = useInView(testimonialSectionRef, { once: false, amount: 0.2 });
  const categoryInView = useInView(categoryRef, { once: false, amount: 0.2 });
  const ctaInView = useInView(ctaSectionRef, { once: false, amount: 0.2 });

  // Parallax effect
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const svgFiles = [
    "./b1.svg",
    "./b2.svg",
    "./b3.svg",
    "./b4.svg",
    "./b5.svg",
    "./b6.svg",
  ];
  const handleClick = () => {
    navigate('/jobs');
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSvgIndex((prevIndex) => (prevIndex + 1) % svgFiles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [svgFiles.length]);

  const handleExploreJobs = useCallback(() => {
    navigate("/jobs");
  }, [navigate]);

  const logos = [
    "adobe",
    "coinbase",
    "atlassian",
    "github",
    "microsoft",
    "google",
    "stripe",
    "spotify",
  ];
  const duplicatedLogos = [...logos, ...logos];

  // Job categories with icons
  const categories = [
    { name: "Software Development", icon: "💻", count: 2453 },
    { name: "Data Science", icon: "📊", count: 1872 },
    { name: "UX/UI Design", icon: "🎨", count: 1245 },
    { name: "Product Management", icon: "📱", count: 987 },
    { name: "DevOps", icon: "⚙️", count: 765 },
    { name: "Marketing", icon: "📈", count: 654 },
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "This platform helped me find my dream job at Google within just 2 weeks of signing up!",
      name: "Sarah k",
      role: "Senior Frontend Developer",
      company: "Google"
    },
    {
      quote: "The job matching algorithm is incredibly accurate. I found a perfect culture fit for my skills.",
      name: "Michael Chen",
      role: "Machine Learning Engineer",
      company: "BCG"
    },
    {
      quote: "As a hiring manager, I've found exceptional talent through this platform consistently.",
      name: "Priya Sharma",
      role: "Hiring manager",
      company: "Accenture"
    },
  ];



  return (
    <>
      {/* Original Banner Section */}
      <section className={`relative mt-10 overflow-hidden px-5 ${theme === 'light' ? 'bg-[#FFFFF0]' : ''
        }`}>
        {/* Background with gradient overlay */}
        <div className={`fixed inset-0 ${theme === 'light'
          ? 'bg-gradient-to-br from-[#FAF9F6] via-gray-300 to-[#FAF9F6]'
          : 'bg-gradient-to-br from-black via-teal-950 to-black'
          }`}>
          <div className={`absolute inset-0 bg-[url(https://images.unsplash.com/photo-1698825810716-d3f126a50385?q=80&w=1520&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center animate-bgSpinScale ${theme === 'light' ? 'opacity-20' : 'opacity-10'}
}`}></div>
        </div>

        {/* Decorative circles with adjusted positioning */}
        <div className={`absolute top-10 right-10 w-20 h-20 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full ${theme === 'light' ? 'opacity-20' : 'opacity-10'
          } animate-pulse`}></div>

        <div className="max-w-screen-2xl h-full md:h-[100vh] container mx-auto xl:px-24">
          <div className="relative pt-10 md:pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Text Content */}
              <div className="space-y-6 md:space-y-8">
                <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'
                  }`}>
                  Land your{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent inline-block animate-bounce-slow">
                    dream job
                  </span>{" "}
                  today
                </h1>

                <p className={`text-base sm:text-lg md:text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  } leading-relaxed`}>
                  Discover thousands of opportunities in tech, engineering, and
                  digital sectors. Your next career move is just a click away.
                </p>

                {/* Stats section */}
                <div className="flex flex-wrap justify-start gap-8 md:gap-20 pt-4 pb-6 md:pb-8">
                  {[
                    { count: "270+", label: "Jobs Listed" },
                    { count: "8k+", label: "Companies" },
                    { count: "15k+", label: "Candidates" },
                  ].map((stat, index) => (
                    <div key={index} className="text-center group">
                      <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-110">
                        {stat.count}
                      </p>
                      <p className={`text-sm sm:text-base ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button
                  onClick={handleExploreJobs}
                  className="group relative px-6 sm:px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-base sm:text-lg md:text-xl font-semibold rounded-full overflow-hidden shadow-lg transition-all duration-300 hover:shadow-emerald-500/25 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center">
                    Explore Jobs
                    <svg
                      className="ml-2 w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>

              {/* SVG Illustration */}
              <div className="relative right-0 w-[80%] h-[200px] sm:h-[400px] md:h-0 md:pb-[75%] ml-0 sm:ml-[25%] lg:ml-0">
                {svgFiles.map((file, index) => (
                  <img
                    key={index}
                    src={file}
                    alt={`Illustration ${index + 1}`}
                    className={`absolute top-0 right-0 w-full md:w-2/3 h-full object-contain transition-opacity duration-1000 ${index === currentSvgIndex ? "opacity-100" : "opacity-0"
                      }`}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>

            {/* Company Logos Section */}
            <div className="mt-8 lg:mt-15 py-8 lg:py-14 mb-20 sm:mb-0 logo-container">
              <div className="logo-scroll">
                {duplicatedLogos.map((company, index) => (
                  <div key={index} className="flex-shrink-0 mx-4 sm:mx-8">
                    <img
                      src={`./logos/${company}.png`}
                      alt={`${company} logo`}
                      className={`h-8 sm:h-12 object-contain ${theme === 'light'
                        ? 'opacity-85 hover:opacity-100 filter brightness-75 hover:brightness-100'
                        : 'opacity-75 hover:opacity-100 filter brightness-125 hover:brightness-150'
                        } transition-opacity duration-300`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* NEW SECTION: Job Categories */}
      <section
        ref={categoryRef}
        className={`py-12 md:py-16 px-4 relative ${theme === 'light' ? 'bg-gray-50' : 'bg-gradient-to-br from-zinc-950 to-gray-900'
          }`}
      >
        <div className="max-w-5xl mx-auto">
          <div
            className="text-center mb-8 md:mb-10"
          >
            <h2 className={`text-2xl md:text-3xl font-medium mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-white'
              }`}>
              Explore Job Categories
            </h2>
            <p className={`text-sm md:text-base max-w-xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
              Browse opportunities by specialized fields and discover your perfect role
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={handleClick}
                className={`rounded-md p-4 group cursor-pointer ${theme === 'light'
                  ? 'bg-white border border-gray-100 hover:border-emerald-200'
                  : 'bg-gray-800/50 border border-gray-700/50 hover:border-emerald-800/50'
                  } transition-all duration-200 hover:-translate-y-1`}
              >
                <div>
                  <h3 className={`text-base font-medium mb-1 ${theme === 'light' ? 'text-gray-800' : 'text-white'
                    } group-hover:text-emerald-500 transition-colors duration-200`}>
                    {category.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                      {category.count.toLocaleString()} positions
                    </p>

                    <span className={`text-xs flex items-center ${theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'
                      }`}>
                      View
                      <svg className="w-3 h-3 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION: Testimonials */}
      <section
        ref={testimonialSectionRef}
        className={`py-16 md:py-28 px-5 relative overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-gradient-to-br from-zinc-950 to-gray-900'}`}
      >
        {/* Animated background circles */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className={`absolute -top-64 -right-64 w-96 h-96 rounded-full ${theme === 'light'
              ? 'bg-emerald-400/10'
              : 'bg-emerald-700/10'
              }`}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "mirror"
            }}
          />
          <motion.div
            className={`absolute -bottom-32 -left-32 w-64 h-64 rounded-full ${theme === 'light'
              ? 'bg-blue-300/10'
              : 'bg-blue-700/10'
              }`}
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "mirror",
              delay: 2
            }}
          />
        </div>

        <div className="max-w-screen-xl mx-auto relative">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
              Success Stories
            </h2>
            <p className={`text-base md:text-lg max-w-2xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              Hear from professionals who found their ideal positions through our platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className={`p-6 rounded-xl relative ${theme === 'light'
                  ? 'bg-white shadow-lg shadow-gray-100/80'
                  : 'bg-gray-800 shadow-lg shadow-black/20'
                  } transition-all duration-300`}
              >
                {/* Quote mark */}
                <div className={`absolute top-6 right-6 text-5xl opacity-20 ${theme === 'light' ? 'text-emerald-500' : 'text-emerald-400'}`}>
                  "
                </div>

                <div className="mb-6 relative z-10">
                  <p className={`italic ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} z-10 relative leading-relaxed`}>
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="flex items-center">

                  <div>
                    <h4 className={`font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                      {testimonial.name}
                    </h4>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION: Call to Action */}
      <section
        ref={ctaSectionRef}
        className={`py-16 px-5 relative overflow-hidden ${theme === 'light' ? 'bg-zinc-500' : 'bg-gradient-to-br from-zinc-950 to-gray-900'}`}
      >
        {/* Animated lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute h-px w-full ${theme === 'light' ? 'bg-emerald-200' : 'bg-emerald-800/50'}`}
              style={{ top: `${20 + i * 15}%` }}
              animate={{
                x: ['-100%', '100%'],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 2
              }}
            />
          ))}
        </div>

        <div className="max-w-screen-lg mx-auto relative">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
              Ready to accelerate your career?
            </h2>
            <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              Join thousands of professionals who have found their dream positions through our platform. New opportunities are added daily.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                onClick={handleExploreJobs}
              >
                Find Jobs Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`px-8 py-4 rounded-full font-semibold ${theme === 'light'
                  ? 'bg-white text-emerald-600 border border-emerald-300'
                  : 'bg-gray-800 text-white border border-gray-700'
                  } transition-all duration-300`}
              >
                For Employers
              </motion.button>
            </div>

            <div className={`mt-12 pt-8 border-t ${theme === 'light' ? 'border-emerald-200' : 'border-gray-800'}`}>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                Trusted by over 10,000+ companies worldwide
              </p>
            </div>
          </motion.div>
        </div>
      </section>




    </>
  );
};


export default Banner;








