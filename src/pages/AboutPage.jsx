import React from 'react';
import { ArrowRight, Users, Briefcase, Trophy, Target, ChartBar, Globe, Shield, Clock, Zap, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Navigate, redirect, useNavigate } from 'react-router-dom';

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
        </div>
    );
};

const AboutPage = () => {
    const navigate = useNavigate();
    const handleGetStarted = () => {
        navigate('/jobs');
    }
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

    let url = "https://images.unsplash.com/photo-1656077217715-bdaeb06bd01f?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            {/* Hero Section with Particle Effect Background */}
            <header className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] xl:min-h-[80vh] 2xl:min-h-[65vh] : flex items-center justify-center overflow-hidden ">
                {/* Animated Grid Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gray-900">
                        <motion.img
                            src={url} // Replace with your illustration/image URL
                            alt="Team collaboration"
                            className="absolute w-full h-full object-cover"
                            initial={{ scale: 1.3 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 3, ease: 'easeOut' }}
                        />

                    </div>
                </div>

                {/* Content Section */}
                <div className="relative z-10 text-center max-w-4xl mx-auto px-4 md:px-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
                        Transforming Careers with
                        <span className="block bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                            Arrow Jobs
                        </span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-emerald-200 font-light max-w-2xl mx-auto leading-relaxed">
                        Pioneering the future of job search with AI-driven solutions and intelligent career guidance
                    </p>
                    <div className="mt-8">
                        <button onClick={handleGetStarted} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto">
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
                            <div key={index} className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 rounded-xl shadow-xl hover:shadow-emerald-500/10 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="bg-emerald-500/10 p-3 rounded-lg">
                                        <Icon className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">{stat.number}</h3>
                                        <p className="text-gray-400">{stat.label}</p>
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
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                                Our Mission & Vision
                            </span>
                        </h2>
                        <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
                            Arrow Jobs is dedicated to revolutionizing the job search experience through innovative technology and personalized solutions. We believe in creating meaningful connections between talented individuals and forward-thinking companies.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-gradient-to-br  via-gray-900/30 to-black/30 p-8 rounded-2xl backdrop-blur-sm">
                            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                            <p className="text-gray-300 leading-relaxed">
                                To empower job seekers with AI-driven tools and insights, making the job search process more efficient, effective, and accessible to everyone. We strive to bridge the gap between talent and opportunity through technology.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br  via-gray-900/30 to-black/30 p-8 rounded-2xl backdrop-blur-sm">
                            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                            <p className="text-gray-300 leading-relaxed">
                                To become the world's leading AI-powered career platform, where every job seeker can find their ideal role and every company can discover perfect matches for their teams. We envision a future where career growth is accessible to all.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gradient-to-br from-emerald-900/10 via-gray-900/10 to-black/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
                        <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                            Cutting-Edge Features
                        </span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900/20 via-gray-900/20 to-black/20 p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/20">
                                    <div className="relative z-10">
                                        <div className="bg-emerald-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                                            <Icon className="w-6 h-6 text-emerald-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                                        <p className="text-gray-300">{feature.description}</p>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-emerald-900/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            {/* Animated Testimonials Section */}
            <section className="py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
                        <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                            What Our Users Say
                        </span>
                    </h2>
                    <InfiniteScrollTestimonials />
                </div>
            </section>

            {/* Technology Section */}
            <section className="py-20 bg-gradient-to-br from-emerald-900/10 via-gray-900/10 to-black/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
                        <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                            Powered by Innovation
                        </span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gradient-to-br from-gray-800/30 via-gray-900/30 to-black/30 p-8 rounded-2xl backdrop-blur-sm">
                            <Zap className="w-12 h-12 text-emerald-400 mb-6" />
                            <h3 className="text-xl font-bold text-white mb-4">Advanced AI Technology</h3>
                            <p className="text-gray-300">
                                Our platform leverages state-of-the-art artificial intelligence and machine learning algorithms to provide personalized job recommendations and optimize your applications.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-gray-800/30 via-gray-900/30 to-black/30 p-8 rounded-2xl backdrop-blur-sm">
                            <Shield className="w-12 h-12 text-emerald-400 mb-6" />
                            <h3 className="text-xl font-bold text-white mb-4">Data Security</h3>
                            <p className="text-gray-300">
                                Your privacy and data security are our top priorities. We employ enterprise-grade encryption and security measures to protect your information.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-gray-800/30 via-gray-900/30 to-black/30 p-8 rounded-2xl backdrop-blur-sm">
                            <Globe className="w-12 h-12 text-emerald-400 mb-6" />
                            <h3 className="text-xl font-bold text-white mb-4">Global Network</h3>
                            <p className="text-gray-300">
                                Connect with opportunities worldwide through our extensive network of employers and recruitment partners across various industries and locations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Call to Action */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Transform Your Career?
                    </h2>
                    <p className="text-gray-300 text-lg mb-8">
                        Join thousands of successful professionals who have already discovered the power of AI-driven job search with Arrow Jobs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                            Get Started Now <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="bg-transparent border-2 border-emerald-600 text-emerald-400 hover:bg-emerald-600/10 px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2">
                            Schedule Demo
                        </button>
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                        <div className="bg-gradient-to-br from-emerald-900/20 via-gray-900/20 to-black/20 p-6 rounded-xl backdrop-blur-sm">
                            <div className="flex items-center justify-center gap-3 text-emerald-400 mb-4">
                                <Phone className="w-5 h-5" />
                                <span className="font-medium">Contact Support</span>
                            </div>
                            <p className="text-gray-300">+1 (888) 123-4567</p>
                            <p className="text-gray-400 text-sm">Available 24/7</p>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-900/20 via-gray-900/20 to-black/20 p-6 rounded-xl backdrop-blur-sm">
                            <div className="flex items-center justify-center gap-3 text-emerald-400 mb-4">
                                <Mail className="w-5 h-5" />
                                <span className="font-medium">Email Us</span>
                            </div>
                            <p className="text-gray-300">support@arrowjobs.com</p>
                            <p className="text-gray-400 text-sm">We'll respond within 24 hours</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}

        </div>
    );
};

export default AboutPage;