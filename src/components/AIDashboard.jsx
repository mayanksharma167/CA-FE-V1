import React, { useState, useContext } from 'react';
import { 
    Book, 
    Video, 
    Users, 
    Star, 
    Award,
    Globe,
    Monitor,
    Laptop,
    School,
    GraduationCap,
    PenTool,
    Music,
    Camera,
    Palette
} from 'lucide-react';
import { ThemeContext } from '../context/themeContext';

const EducationDirectory = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    // Sample categories and resources
    const premiumResources = [
        { title: "Premium Math Courses", icon: <Book className="w-4 h-4" /> },
        { title: "Advanced Science Labs", icon: <School className="w-4 h-4" /> },
        { title: "Language Learning Pro", icon: <Globe className="w-4 h-4" /> },
        { title: "Coding Bootcamps", icon: <Laptop className="w-4 h-4" /> },
        { title: "Art & Design Master", icon: <PenTool className="w-4 h-4" /> }
    ];

    const categories = [
        "Mathematics",
        "Science",
        "Languages",
        "Computer Science",
        "Arts & Music",
        "History",
        "Literature",
        "Physical Education",
        "Social Studies",
        "Engineering"
    ];

    const featuredContent = [
        { title: "STEM Projects", icon: <Star className="w-4 h-4" /> },
        { title: "Virtual Labs", icon: <Monitor className="w-4 h-4" /> },
        { title: "Live Tutorials", icon: <Video className="w-4 h-4" /> },
        { title: "Group Studies", icon: <Users className="w-4 h-4" /> }
    ];

    const popularResources = [
        { title: "Math Games", icon: <GraduationCap className="w-4 h-4" /> },
        { title: "Science Videos", icon: <Video className="w-4 h-4" /> },
        { title: "Music Lessons", icon: <Music className="w-4 h-4" /> },
        { title: "Photography", icon: <Camera className="w-4 h-4" /> },
        { title: "Digital Art", icon: <Palette className="w-4 h-4" /> }
    ];

    const ListContainer = ({ title, items, maxHeight = "h-96" }) => (
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <h2 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {title}
            </h2>
            <div className={`overflow-y-auto ${maxHeight}`}>
                {items.map((item, index) => (
                    <div 
                        key={index}
                        className={`flex items-center p-2 mb-2 rounded ${
                            isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        } cursor-pointer`}
                    >
                        {item.icon}
                        <span className={`ml-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                            {item.title || item}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'} p-6`}>
            <div className="max-w-7xl mx-auto">
                <h1 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    Educational Resources Directory
                </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <ListContainer 
                        title="Premium Resources" 
                        items={premiumResources}
                    />
                    
                    <ListContainer 
                        title="Categories" 
                        items={categories.map(cat => ({ title: cat }))}
                    />
                    
                    <ListContainer 
                        title="Featured Content" 
                        items={featuredContent}
                    />
                    
                    <ListContainer 
                        title="Popular Resources" 
                        items={popularResources}
                    />
                </div>
            </div>
        </div>
    );
};

export default EducationDirectory;