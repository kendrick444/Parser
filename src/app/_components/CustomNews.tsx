import React from 'react';

interface CustomNewsProps {
    id: string;
    title_news: string;
    source_news: string;
    description_news: string;
    date_news: string;
    img_news: string;
}
const CustomNews: React.FC<CustomNewsProps> = ({
    title_news,
    source_news,
    description_news,
    date_news,
    img_news,
    id
}: CustomNewsProps) => {
    return(
        <a
            href={`/news/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 text-black p-4 rounded-lg shadow-md hover:shadow-lg transition"
        >
            <div className="mb-4">
                <img
                    src={img_news}
                    alt="Фотографії не найдено"
                    className="rounded-lg w-full h-48 object-cover"
                />
            </div>
            <div>
                <h2 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">
                    {title_news}
                </h2>
                <p className="text-black line-clamp-3">
                    {description_news}
                </p>
                <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                    <span>{date_news}</span>
                    <span className="font-medium">{source_news}</span>
                </div>
            </div>
        </a>
    );
};
export default CustomNews;