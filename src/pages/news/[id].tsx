import { useRouter } from 'next/router';
import React from 'react';
import "@/app/globals.css";

const newsData = [
    {
        id: "cyber",
        title: "Кібер",
        description: "Кібер",
        source: "Кібер",
        date: "2025-01-10",
        image: "",
    },
    {
        id: "cyberpolice",
        title: "Кіберполіція",
        description: "Кіберполіція",
        source: "Кіберполіція",
        date: "2025-01-09",
        image: "",
    },

];

const NewsDetails = () => {
    const router = useRouter();
    const { id } = router.query;

    const news = newsData.find((item) => item.id === id);

    if (!news) {
        return <p className="container mx-auto text-center text-[36px]">Новина не знайдена</p>;
    }

    return (
        <section className="container mx-auto text-black p-4 ">
            <span className="flex flex-row justify-between max-lg:flex-col">
            <img
                src={news.image}
                alt="Фото новини"
                className="rounded-lg w-[75%] h-[75%] object-cover mb-4 max-lg:w-full max-lg:h-full"
            />
            <span className="flex flex-col justify-evenly max-lg:flex-row max-lg:justify-between">
            <p className="text-sm text-gray-600">{news.date}</p>
            <p className="font-medium">{news.source}</p>
                </span>
                </span>
            <h1 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">{news.title}</h1>
            <p className="text-black line-clamp-3">{news.description}</p>
        </section>
    );
};

export default NewsDetails;
