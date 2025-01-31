import React from 'react';
import { ExternalLink, Search } from 'lucide-react';
import { aiApps } from './aiApps';
const AIDashboard = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [data, setData] = React.useState(aiApps);

    const filteredApps = React.useMemo(() => {
        return data.reduce((acc, section) => {
            const filteredItems = section.items.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (filteredItems.length > 0) {
                acc.push({ ...section, items: filteredItems });
            }
            return acc;
        }, []);
    }, [data, searchTerm]);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">AI Apps Dashboard</h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search AI apps..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                        />
                    </div>
                </div>

                {filteredApps.map((section) => (
                    <div key={section.category} className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{section.category}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {section.items.map((app) => (
                                <div
                                    key={app.name}
                                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-semibold">{app.name}</h3>
                                            {app.pricing && (
                                                <span className="inline-block px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full mt-1">
                                                    {app.pricing}
                                                </span>
                                            )}
                                        </div>
                                        <a
                                            href={app.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                        >
                                            <ExternalLink className="h-5 w-5 text-gray-600" />
                                        </a>
                                    </div>
                                    <p className="text-gray-600 mb-4">{app.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {app.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 text-sm bg-gray-100 text-gray-600 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AIDashboard;