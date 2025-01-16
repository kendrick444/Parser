'use client';

import { useState, useEffect } from 'react';
import CustomNews from "@/app/_components/CustomNews";


type NewsItem = {
    title: string;
    link: string;
    source: string;
    description: string;
    date: string;
    img: string;
    imgWidth: number;
    imgHeight: number;
};

export default function HomePage() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);

    const fetchNews = async (keyword: string = '') => {
        setLoading(true);
        try {
            const res = await fetch(`/api/news?keyword=${encodeURIComponent(keyword)}`);
            const data: NewsItem[] = await res.json();
            setNews(data);
        } catch (error) {
            console.error('Failed to fetch news:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const getLimitedNews = (newsList: NewsItem[]) => {
        const sourceMap: { [key: string]: number } = {};
        return newsList.filter((item) => {
            if (!sourceMap[item.source]) {
                sourceMap[item.source] = 0;
            }
            if (sourceMap[item.source] < 2) {
                sourceMap[item.source]++;
                return true;
            }
            return false;
        });
    };

    const displayedNews = isSearchActive ? news : getLimitedNews(news);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Parser News by Kendrick</h1>

            <div className="mb-4 flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Пошук новин..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow border p-2 rounded-lg"
                />
                <button
                    onClick={() => {
                        fetchNews(searchTerm);
                        setIsSearchActive(!!searchTerm);
                    }}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                    Пошук
                </button>
            </div>

            {loading && <p className="text-black text-center">Loading...</p>}

            {!loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedNews.map((item, index) => (
                        <a
                            key={index}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-200 text-black p-4 rounded-lg shadow-md hover:shadow-lg transition"
                        >
                            <div className="mb-4">
                                <img
                                    src={item.img || '/placeholder.png'}
                                    alt="Фотографії не найдено"
                                    width={item.imgWidth}
                                    height={item.imgHeight}
                                    className="rounded-lg w-full h-48 object-cover"
                                />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">
                                    {item.title}
                                </h2>
                                <p className="text-black line-clamp-3">
                                    {item.description}
                                </p>
                                <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                                    <span>{item.date}</span>
                                    <span className="font-medium">{item.source}</span>
                                </div>
                            </div>
                        </a>
                    ))}
                    <CustomNews
                        id="cyber"
                        title_news="Кібер"
                        source_news="Кібер"
                        description_news="Кібер"
                        date_news="Кібер"
                        img_news="Кібер"
                    />
                    <CustomNews
                        id="cyberpolice"
                        title_news="Кіберполіція"
                        source_news="Кіберполіція"
                        description_news="Кіберполіція"
                        date_news="Кіберполіція"
                        img_news="Кіберполіція"
                    />
                </div>
            )}

            {!loading && displayedNews.length === 0 && (
                <p className="text-black text-center">Новин не знайдено</p>
            )}
        </div>
    );
}
