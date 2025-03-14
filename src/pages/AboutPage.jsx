import React, { useContext } from 'react';
import { ArrowRight, Users, Briefcase, Trophy, Target, ChartBar, Globe, Shield, Clock, Zap, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/themeContext';

const InfiniteScrollTestimonials = () => {
    const { theme } = useContext(ThemeContext);
    const testimonials = [
        {
            name: "Rahul Mehta",
            role: "Software Engineer at Infosys",
            comment: "The AI resume builder is a game-changer! It created a professional, ATS-friendly resume that landed me 5 interviews in just two weeks. Highly recommended!",
            metrics: {
                successRate: "90%",
                interviews: "5+",
                offers: "2"
            },
            image: "https://img.freepik.com/free-psd/3d-illustration-person-with-laptop_23-2149436189.jpg"
        },
        {
            name: "Priya Sharma",
            role: "Marketing Specialist at Flipkart",
            comment: "I was struggling to optimize my resume for ATS. This tool made the entire process seamless and helped me secure my dream job. The custom suggestions were spot-on!",
            metrics: {
                successRate: "85%",
                interviews: "7+",
                offers: "3"
            },
            image: "https://img.freepik.com/free-psd/3d-illustration-person-with-long-hair_23-2149436197.jpg"
        },
        {
            name: "Arjun Patel",
            role: "Business Analyst at Deloitte",
            comment: "The website's AI-generated tips on enhancing my resume were incredibly accurate. It saved me so much time and increased my interview calls significantly.",
            metrics: {
                successRate: "88%",
                interviews: "8+",
                offers: "3"
            },
            image: "https://img.freepik.com/free-psd/3d-illustration-smiling-man_23-2149436187.jpg"
        },
        {
            name: "Simran Kaur",
            role: "Data Scientist at Microsoft",
            comment: "This platform helped me create a resume that passed ATS filters with ease. The personalized formatting and keyword suggestions are unbeatable.",
            metrics: {
                successRate: "92%",
                interviews: "10+",
                offers: "4"
            },
            image: "https://img.freepik.com/free-psd/3d-illustration-person-with-pink-hair_23-2149436186.jpg"
        }
    ];

    const TestimonialCard = ({ testimonial }) => (
        <div className={`min-w-[300px] md:min-w-[400px] p-6 mx-4 ${theme === 'light'
            ? 'bg-gradient-to-br from-[#FAF9F6] via-gray-50 to-gray-100 shadow-lg hover:shadow-xl'
            : 'bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-black/90'
            } rounded-xl backdrop-blur-sm hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300`}>
            <div className="flex items-start space-x-4">
                <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                    <h4 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                        {testimonial.name}
                    </h4>
                    <p className="text-emerald-600">{testimonial.role}</p>
                </div>
            </div>
            <p className={`mt-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                <i>"{testimonial.comment}"</i>
            </p>
            <div className="mt-4 flex justify-between items-center gap-4">
                <div className="text-center">
                    <span className="text-emerald-600 font-bold block">{testimonial.metrics.successRate}</span>
                    <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-sm`}>Success Rate</span>
                </div>
                <div className="text-center">
                    <span className="text-emerald-600 font-bold block">{testimonial.metrics.interviews}</span>
                    <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-sm`}>Interviews</span>
                </div>
                <div className="text-center">
                    <span className="text-emerald-600 font-bold block">{testimonial.metrics.offers}</span>
                    <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-sm`}>Offers</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="relative w-full overflow-hidden py-10">
            <div className="flex animate-scroll">
                {testimonials.map((testimonial, index) => (
                    <TestimonialCard key={`first-${index}`} testimonial={testimonial} />
                ))}
                {testimonials.map((testimonial, index) => (
                    <TestimonialCard key={`second-${index}`} testimonial={testimonial} />
                ))}
            </div>
        </div>
    );
};

const AboutPage = () => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

    const handleGetStarted = () => {
        navigate('/jobs');
    };

    const stats = [
        { number: "15K+", label: "Active Users", icon: Users },
        { number: "8K+", label: "Partner Companies", icon: Briefcase },
        { number: "95%", label: "Success Rate", icon: Trophy },
        { number: "24/7", label: "Support", icon: Clock }
    ];

    const features = [
        {
            title: "AI-Powered Resume Optimization",
            description: "Our advanced AI algorithms analyze your resume against industry standards and job requirements, ensuring maximum visibility to recruiters.",
            icon: Target
        },
        {
            title: "Smart Job Matching",
            description: "Using machine learning, we match your profile with the most relevant opportunities, considering skills, experience, and career goals.",
            icon: ChartBar
        },
        {
            title: "Global Opportunities",
            description: "Access jobs from around the world with our extensive network of international employers and recruitment partners.",
            icon: Globe
        },
        {
            title: "Secure Application Process",
            description: "Your data is protected with enterprise-grade security while we handle your job applications automatically.",
            icon: Shield
        }
    ];

    let url = "https://images.unsplash.com/photo-1656077217715-bdaeb06bd01f?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    return (
        <div className={`min-h-screen ${theme === 'light'
            ? 'bg-gradient-to-br from-[#FAF9F6] via-gray-50 to-[#FAF9F6]'
            : 'bg-gradient-to-br from-gray-900 via-black to-gray-900'
            }`}>
            {/* Hero Section */}
            <header className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] xl:min-h-[80vh] 2xl:min-h-[65vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className={`absolute inset-0 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'}`}>
                        <motion.img
                            src={url}
                            alt="Team collaboration"
                            className={`absolute w-full h-full object-cover ${theme === 'light' ? 'opacity-100' : 'opacity-100'}`}
                            initial={{ scale: 1.3 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 3, ease: 'easeOut' }}
                        />
                    </div>
                </div>

                <div className="relative z-10 text-center max-w-4xl mx-auto px-4 md:px-8">
                    <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${theme === 'light' ? 'text-gray-200' : 'text-white'
                        } mb-6 animate-fade-in`}>
                        Transforming Careers with
                        <span className="block bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                            Arrow Jobs
                        </span>
                    </h1>
                    <p className={`text-base sm:text-lg md:text-xl lg:text-2xl ${theme === 'light' ? 'text-emerald-200' : 'text-emerald-200'
                        } font-light max-w-2xl mx-auto leading-relaxed`}>
                        Pioneering the future of job search with AI-driven solutions and intelligent career guidance
                    </p>
                    <div className="mt-8">
                        <button
                            onClick={handleGetStarted}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto">
                            Get Started <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className={`${theme === 'light'
                                ? 'bg-gradient-to-br from-[#FAF9F6] via-gray-50 to-gray-100 shadow-lg hover:shadow-xl'
                                : 'bg-gradient-to-br from-gray-800 via-gray-900 to-black'
                                } p-6 rounded-xl backdrop-blur-sm transition-all duration-300`}>
                                <div className="flex items-center gap-4">
                                    <div className={`${theme === 'light' ? 'bg-emerald-100' : 'bg-emerald-500/10'
                                        } p-3 rounded-lg`}>
                                        <Icon className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h3 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'
                                            }`}>{stat.number}</h3>
                                        <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                                            }`}>{stat.label}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Mission Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                                Our Mission & Vision
                            </span>
                        </h2>
                        <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} text-lg leading-relaxed max-w-3xl mx-auto`}>
                            Arrow Jobs is dedicated to revolutionizing the job search experience through innovative technology and personalized solutions. We believe in creating meaningful connections between talented individuals and forward-thinking companies.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className={`${theme === 'light'
                            ? 'bg-gradient-to-br from-[#FAF9F6] via-gray-50 to-gray-100 shadow-lg hover:shadow-xl'
                            : 'bg-gradient-to-br from-gray-800 via-gray-900 to-black'
                            } p-8 rounded-2xl backdrop-blur-sm transition-all duration-300`}>
                            <h3 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'} mb-4`}>Our Mission</h3>
                            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} leading-relaxed`}>
                                To empower job seekers with AI-driven tools and insights, making the job search process more efficient, effective, and accessible to everyone. We strive to bridge the gap between talent and opportunity through technology.
                            </p>
                        </div>
                        <div className={`${theme === 'light'
                            ? 'bg-gradient-to-br from-[#FAF9F6] via-gray-50 to-gray-100 shadow-lg hover:shadow-xl'
                            : 'bg-gradient-to-br from-gray-800 via-gray-900 to-black'
                            } p-8 rounded-2xl backdrop-blur-sm transition-all duration-300`}>
                            <h3 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'} mb-4`}>Our Vision</h3>
                            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} leading-relaxed`}>
                                To become the world's leading AI-powered career platform, where every job seeker can find their ideal role and every company can discover perfect matches for their teams. We envision a future where career growth is accessible to all.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={`py-20 ${theme === 'light'
                ? 'bg-gradient-to-br from-[#FAF9F6] via-gray-50 to-gray-100'
                : 'bg-gradient-to-br from-gray-900 via-black to-gray-900'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                        <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                            Cutting-Edge Features
                        </span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className={`group relative overflow-hidden rounded-2xl ${theme === 'light'
                                    ? 'bg-gradient-to-br from-[#FAF9F6] via-gray-50 to-gray-100 shadow-lg hover:shadow-xl'
                                    : 'bg-gradient-to-br from-gray-800 via-gray-900 to-black'
                                    } p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/20`}>
                                    <div className="relative z-10">
                                        <div className={`${theme === 'light' ? 'bg-emerald-100' : 'bg-emerald-500/10'
                                            } w-12 h-12 rounded-lg flex items-center justify-center mb-6`}>
                                            <Icon className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <h3 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'} mb-4`}>{feature.title}</h3>
                                        <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{feature.description}</p>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-emerald-900/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 sm:py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-16">
                        <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                            What Our Users Say
                        </span>
                    </h2>
                    <InfiniteScrollTestimonials />
                </div>
            </section>

            {/* Technology Section */}
            <section className={`py-20 ${theme === 'light'
                ? 'bg-gradient-to-br from-[#FAF9F6] via-gray-50 to-gray-100'
                : 'bg-gradient-to-br from-gray-900 via-black to-gray-900'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                        <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                            Powered by Innovation
                        </span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className={`${theme === 'light'
                            ? 'bg-gradient-to-br from-[#FAF9F6] via-gray-50 to-gray-100 shadow-lg hover:shadow-xl'
                            : 'bg-gradient-to-br from-gray-800 via-gray-900 to-black'
                            } p-8 rounded-2xl backdrop-blur-sm transition-all duration-300`}>
                            <Zap className="w-12 h-12 text-emerald-600 mb-6" />
                            <h3 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'} mb-4`}>Advanced AI Technology</h3>
                            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                                Our platform leverages state-of-the-art artificial intelligence and machine learning algorithms to provide personalized job recommendations and optimize your applications.
                            </p>
                        </div>
                        <div className={`${theme === 'light'
                            ? 'bg-gradient-to-br from-[#FAF9F6] via-gray-50 to-gray-100 shadow-lg hover:shadow-xl'
                            : 'bg-gradient-to-br from-gray-800 via-gray-900 to-black'
                            } p-8 rounded-2xl backdrop-blur-sm transition-all duration-300`}>
                            <Shield className="w-12 h-12 text-emerald-600 mb-6" />
                            <h3 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'} mb-4`}>Data Security</h3>
                            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                                Your privacy and data security are our top priorities. We employ enterprise-grade encryption and security measures to protect your information.
                            </p>
                        </div>
                        <div className={`${theme === 'light'
                            ? 'bg-gradient-to-br from-[#FAF9F6] via-gray-50 to-gray-100 shadow-lg hover:shadow-xl'
                            : 'bg-gradient-to-br from-gray-800 via-gray-900 to-black'
                            } p-8 rounded-2xl backdrop-blur-sm transition-all duration-300`}>
                            <Globe className="w-12 h-12 text-emerald-600 mb-6" />
                            <h3 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'} mb-4`}>Global Network</h3>
                            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                                Connect with opportunities worldwide through our extensive network of employers and recruitment partners across various industries and locations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default AboutPage;