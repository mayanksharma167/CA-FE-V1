import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Banner.css';
import { motion } from 'framer-motion';
const InfiniteScrollTestimonials = () => {
  const testimonials = [
    {
      name: "Gabriel Frasconi",
      role: "Vice President at Zendesk",
      comment: "We had massive success using lemlist. When you work with a good company, and they help you become more successful, I can just highly recommend them.",
      metrics: {
        replyRate: "40%",
        meetings: "200+",
        revenue: "$750K"
      },
      image: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1737356591~exp=1737360191~hmac=5f073b54f2b5ce68a144ca0372127c1c4eaac8897a8fa2c6d4c5bfbf4760ab1d&w=826"
    },
    {
      name: "Alla Zeitoun",
      role: "Global Strategic at Meero",
      comment: "lemlist is so simple to use, easy to connect with your CRM, and the automation features will save you a lot of time.",
      metrics: {
        replyRate: "35%",
        meetings: "100+",
        revenue: "$1.1M+"
      },
      image: "https://img.freepik.com/free-psd/3d-illustration-person_23-2149436192.jpg?t=st=1737356627~exp=1737360227~hmac=3bb4cc00ce8d7414454a86ee5147235d5236d20320ac6f49e64e2c1d3071d52e&w=826"
    },
    {
      name: "Nick Dunse",
      role: "CRO at Shuttle",
      comment: "lemlist is our cold email battleship. Personalization, automation, deliverability... everything you need to get more replies is there.",
      metrics: {
        replyRate: "30%",
        meetings: "70+",
        revenue: "$100K+"
      },
      image: "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436190.jpg?t=st=1737356667~exp=1737360267~hmac=62349c39fa084614130403cd49b235278bebfb2e222b8bde8f7b34da3396d98c&w=826"
    },
    {
      name: "Xavière Lehning",
      role: "Business Developer at Tikeden",
      comment: "Our stats are great, the tool is super easy to use and makes prospecting 100x times more responsive.",
      metrics: {
        replyRate: "37%",
        meetings: "100+",
        revenue: "$200K+"
      },
      image: "https://img.freepik.com/free-psd/3d-illustration-person-with-long-hair_23-2149436197.jpg?t=st=1737356629~exp=1737360229~hmac=05c83ca5a8f232b8a9067fc973491d839819c48c1321ae1eb9c27e0772465e09&w=826"
    }
  ];

  const TestimonialCard = ({ testimonial }) => (
    <div className="min-w-[300px] md:min-w-[400px] p-6 mx-4 bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-black/90 rounded-xl backdrop-blur-sm hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/20">
      <div className="flex items-start space-x-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
          <p className="text-emerald-400 text-sm">{testimonial.role}</p>
        </div>
      </div>
      <p className="mt-4 text-gray-300">{testimonial.comment}</p>
      <div className="mt-4 flex justify-between items-center gap-4">
        <div className="text-center">
          <span className="text-emerald-400 font-bold block">{testimonial.metrics.replyRate}</span>
          <span className="text-gray-400 text-sm">Reply Rate</span>
        </div>
        <div className="text-center">
          <span className="text-emerald-400 font-bold block">{testimonial.metrics.meetings}</span>
          <span className="text-gray-400 text-sm">Meetings</span>
        </div>
        <div className="text-center">
          <span className="text-emerald-400 font-bold block">{testimonial.metrics.revenue}</span>
          <span className="text-gray-400 text-sm">Revenue</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full overflow-hidden py-10">
      {/* Left Gradient Mask */}
      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-gray-950 to-transparent z-10"></div>

      <div className="flex animate-scroll">

        {/* First set of testimonials */}
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={`first-${index}`} testimonial={testimonial} />
        ))}
        {/* Duplicate set for seamless loop */}
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={`second-${index}`} testimonial={testimonial} />
        ))}

      </div>
      {/* Right Gradient Mask */}
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-gray-950 to-transparent z-10"></div>

    </div>
  );
};
const Banner = () => {
  const navigate = useNavigate();
  const [currentSvgIndex, setCurrentSvgIndex] = useState(0);

  const svgFiles = [

    './b1.svg',
    './b2.svg',
    './b3.svg',
    './b4.svg',
    './b5.svg',
    './b6.svg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSvgIndex((prevIndex) => (prevIndex + 1) % svgFiles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [svgFiles.length]);

  const handleExploreJobs = useCallback(() => {
    navigate('/jobs');
  }, [navigate]);

  const logos = [
    "adobe", "coinbase", "atlassian", "github",
    "microsoft", "google", "stripe", "spotify"
  ];
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="relative mt-10 overflow-hidden px-5">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMCAxOGMtMy4zMTQgMC02LTIuNjg2LTYtNnMyLjY4Ni02IDYtNiA2IDIuNjg2IDYgNi0yLjY4NiA2LTYgNnoiIGZpbGw9IiMxMGIzODEiIG9wYWNpdHk9IjAuMDUiLz48L2c+PC9zdmc+')] opacity-10"></div>

      </div>

      {/* Decorative circles with adjusted positioning */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full opacity-10 animate-pulse"></div>

      <div className="max-w-screen-2xl h-full md:h-[100vh] container mx-auto xl:px-24">
        <div className="relative pt-10 md:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="space-y-6 md:space-y-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Find your{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent inline-block animate-bounce-slow">
                  dream job
                </span>{" "}
                today
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed">
                Discover thousands of opportunities in tech, engineering, and
                digital sectors. Your next career move is just a click away.
              </p>

              {/* Stats section with improved responsive spacing */}
              <div className="flex flex-wrap justify-start gap-8 md:gap-20 pt-4 pb-6 md:pb-8">
                {[
                  { count: "10k+", label: "Jobs Listed" },
                  { count: "8k+", label: "Companies" },
                  { count: "15k+", label: "Candidates" },
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-110">
                      {stat.count}
                    </p>
                    <p className="text-sm sm:text-base text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Button with responsive padding */}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* SVG Illustration with improved mobile positioning */}
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

          {/* Company Logos Section with improved mobile visibility */}
          <div className="mt-8 lg:mt-15 py-8 lg:py-14 mb-20 sm:mb-40 logo-container">


            <div className="logo-scroll">
              {duplicatedLogos.map((company, index) => (
                <div key={index} className="flex-shrink-0 mx-4 sm:mx-8">
                  <img
                    src={`./logos/${company}.png`}
                    alt={`${company} logo`}
                    className="h-8 sm:h-12 object-contain opacity-75 hover:opacity-100 transition-opacity duration-300 filter brightness-125 hover:brightness-150"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Animated Testimonials Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-[90%] mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              What Our Users Say
            </span>
          </h2>
          <InfiniteScrollTestimonials />
        </div>
      </section>
    </section>

  );

};

export default React.memo(Banner);