import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import cron from 'node-cron';

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

const cache: { data: NewsItem[]; lastUpdated: Date } = {
    data: [],
    lastUpdated: new Date(0),
};

const parser20Minut = async (): Promise<NewsItem[]> => {
    const baseUrl = 'https://te.20minut.ua/allnews?page=';
    const totalPages = 5;
    const news: NewsItem[] = [];

    try {
        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            const url = `${baseUrl}${pageNum}/`;
            const response = await axios.get(url, );
            const dom = new JSDOM(response.data);

            const articles = dom.window.document.querySelectorAll('div.thumbnail');

            articles.forEach((article) => {
                const titleElement = article.querySelector('div.news-title a');
                const descriptionElement = article.querySelector('div.news-content p');
                const dateElement = article.querySelector('span.js-auto-date');
                const imgElement = article.querySelector('div.media-right img');
                const imgWidth = 200;
                const imgHeight = 200;
                if (titleElement) {
                    news.push({
                        title: titleElement.textContent?.trim() || '',
                        description: descriptionElement?.textContent?.trim() || '',
                        date: dateElement?.getAttribute('data-date') || '',
                        img: imgElement?.getAttribute('src') || '',
                        link: titleElement.getAttribute('href') || '',
                        imgWidth,
                        imgHeight,
                        source: '20minut',
                    });
                }
            });
        }
    } catch (error) {
        console.error(`Error parsing 20minut:`, error);
    }

    return news;
};


const parserGazetaMisto = async (): Promise<NewsItem[]> => {
    const baseUrl = 'https://gazeta-misto.te.ua/category/news/page/';
    const totalPages = 5;
    const news: NewsItem[] = [];

    try {
        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            const url = `${baseUrl}${pageNum}/`;
            const response = await axios.get(url, );
            const dom = new JSDOM(response.data);
            const articles = dom.window.document.querySelectorAll('article.jeg_post');

            articles.forEach((article) => {
                const titleElement = article.querySelector('h3.jeg_post_title a');
                const imgElement = article.querySelector('.jeg_thumb img');
                const dateElement = article.querySelector('.jeg_meta_date a');
                const descriptionElement = article.querySelector('.jeg_post_excerpt p');
                const imgWidth = 200;
                const imgHeight = 200;

                if (titleElement) {
                    news.push({
                        title: titleElement.textContent.trim() || '',
                        img: imgElement?.getAttribute('data-src') || imgElement?.getAttribute('src') || '',
                        description: descriptionElement?.textContent.trim() || '',
                        date: dateElement?.textContent.trim() || '',
                        link: titleElement.getAttribute('href') || '',
                        imgWidth,
                        imgHeight,
                        source: 'Gazeta Misto',
                    });
                }
            });
        }
    } catch (error) {
        console.error(`Error parsing gazeta-misto:`, error);
    }

    return news;
};

const parserGazetaTe = async (): Promise<NewsItem[]> => {
    const baseUrl = 'https://gazeta.te.ua/category/news/page/';
    const totalPages = 5;
    const news: NewsItem[] = [];

    try {
        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            const url = `${baseUrl}${pageNum}/`;
            const response = await axios.get(url, );
            const dom = new JSDOM(response.data);
            const articles = dom.window.document.querySelectorAll('article.entry');

            articles.forEach((article) => {
                const titleElement = article.querySelector('h2.entry-title a');
                const dateElement = article.querySelector('.entry-date');
                const imgElement = article.querySelector('.entry-media img');
                const contentElement = article.querySelector('.entry-content p');
                const imgWidth = 200;
                const imgHeight = 200;

                if (titleElement) {
                    news.push({
                        title: titleElement.textContent?.trim() || '',
                        link: titleElement.getAttribute('href') || '',
                        date: dateElement?.textContent?.trim() || '',
                        img: imgElement?.getAttribute('src') || '',
                        content: contentElement?.textContent?.trim() || '',
                        imgWidth,
                        imgHeight,
                        source: 'Gazeta TE',
                    });
                }
            });
        }
    } catch (error) {
        console.error(`Error parsing gazeta-te:`, error);
    }

    return news;
};

const parserRovesnykNews = async (): Promise<NewsItem[]> => {
    const baseUrl = 'https://rovesnyknews.te.ua/category/news/page';
    const totalPages = 5;
    const news: NewsItem[] = [];

    try {
        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            const url = `${baseUrl}${pageNum}/`;
            const response = await axios.get(url, );
            const dom = new JSDOM(response.data);
            const articles = dom.window.document.querySelectorAll('article.jeg_post');

            articles.forEach((article) => {
                const titleElement = article.querySelector('h3.jeg_post_title a');
                const descriptionElement = article.querySelector('.jeg_post_excerpt p');
                const dateElement = article.querySelector('.jeg_meta_date a');
                const imgElement = article.querySelector('.jeg_thumb img');
                const imgWidth = 200;
                const imgHeight = 200;

                if (titleElement) {
                    news.push({
                        title: titleElement.textContent?.trim() || '',
                        link: titleElement.getAttribute('href') || '',
                        date: dateElement?.textContent?.trim() || '',
                        img: imgElement?.getAttribute('data-src') || imgElement?.getAttribute('src') || '',
                        content: descriptionElement?.textContent?.trim() || '',
                        imgWidth,
                        imgHeight,
                        source: 'Rovesnyk',
                    });
                }
            });
        }
    } catch (error) {
        console.error(`Error parsing Rovesnyk News:`, error);
    }

    return news;
};


const parserTENews = async (): Promise<NewsItem[]> => {
    const baseUrl = 'https://tenews.org.ua/news/page/';
    const totalPages = 5;
    const news: NewsItem[] = [];

    try {
        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            const url = `${baseUrl}${pageNum}/`;
            const response = await axios.get(url);
            const dom = new JSDOM(response.data);
            const articles = dom.window.document.querySelectorAll('div.mb-5');

            articles.forEach((article) => {
                const titleElement = article.querySelector('article h3');
                const linkElement = article.querySelector('a');
                const dateElement = article.querySelector('article time');
                const imgElement = article.querySelector('img');
                const contentElement = article.querySelector('article');
                const imgWidth = 200;
                const imgHeight = 200;

                if (titleElement && linkElement) {
                    news.push({
                        title: titleElement.textContent?.trim() || '',
                        link: linkElement.getAttribute('href') || '',
                        date: dateElement?.textContent?.trim() || '',
                        img: imgElement?.getAttribute('src') || '',
                        content: contentElement?.textContent?.trim() || '',
                        imgWidth,
                        imgHeight,
                        source: 'TENews',
                    });
                }
            });
        }
    } catch (error) {
        console.error(`Error parsing TENews:`, error);
    }

    return news;
};

const fetchAllNews = async (): Promise<NewsItem[]> => {
    const allNews: NewsItem[] = [];
    const addedLinks = new Set<string>();

    const addNewsIfNotExist = (newsItem: NewsItem) => {
        if (!addedLinks.has(newsItem.link)) {
            addedLinks.add(newsItem.link);
            allNews.push(newsItem);
        }
    };

    const newsSources = [
        { parseFn: parser20Minut, sourceName: '20minut' },
        { parseFn: parserGazetaMisto, sourceName: 'Gazeta Misto' },
        { parseFn: parserGazetaTe, sourceName: 'Gazeta TE' },
        { parseFn: parserRovesnykNews, sourceName: 'Rovesnyk' },
        { parseFn: parserTENews, sourceName: 'TENews' },
    ];

    for (const { parseFn } of newsSources) {
        const sourceNews = await parseFn();
        sourceNews.forEach(addNewsIfNotExist);
    }

    return allNews;
};

cron.schedule('0 * * * *', async () => {
    console.log('Отримання новин...');

    const newData = await fetchAllNews();

    if (JSON.stringify(newData) !== JSON.stringify(cache.data)) {
        console.log('Дані кешу оновлено!');
        cache.data = newData;
        cache.lastUpdated = new Date();
        console.log('Дані обновленно )):', cache.lastUpdated);
    } else {
        console.log('Не вдалось обновити дані через відсутність нових ((:');
    }
});
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const keyword = req.query.keyword?.toString().toLowerCase();

    if (Date.now() - cache.lastUpdated.getTime() < 60 * 60 * 1000) {
        const filteredNews = keyword
            ? cache.data.filter((newsItem) =>
                newsItem.title.toLowerCase().includes(keyword)
            )
            : cache.data;
        return res.status(200).json(filteredNews);
    }

    console.log('Отримання нових новин...');
    cache.data = await fetchAllNews();
    cache.lastUpdated = new Date();

    const filteredNews = keyword
        ? cache.data.filter((newsItem) =>
            newsItem.title.toLowerCase().includes(keyword)
        )
        : cache.data;

    return res.status(200).json(filteredNews);
}
