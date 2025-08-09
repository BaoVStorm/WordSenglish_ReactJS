// DetailVocabulary.tsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './DetailVocabulary.module.scss';
import VocabularyWord from '@/pages/components/VocabularyWord';

import routes from '@/config/routes';

const cx = classNames.bind(styles);

interface VocabularyWordData {
    id: string | number;
    word: string;
    pronunciation?: string;
    meaning: string;
    example?: string;
}

interface VocabularyDetailData {
    author: string;
    title: string;
    description: string;
    date: string;
    words: VocabularyWordData[];
}

const DetailVocabulary: React.FC = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [data, setData] = useState<VocabularyDetailData | null>(null);
    const [loading, setLoading] = useState(true);

    if (!id) return <Navigate to={routes.notFound} />;

    useEffect(() => {
        // Ví dụ fetch từ API
        // fetch(`/api/vocabularies/${id}`)
        //     .then((res) => res.json())
        //     .then((result: VocabularyDetailData) => {
        //         setData(result);
        //     })
        //     .catch((err) => {
        //         console.error('Error fetching vocabulary:', err);
        //     })
        //     .finally(() => {
        //         setLoading(false);
        //     });

        setData(DATA);
        setLoading(false);
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!data) return <p>Không tìm thấy dữ liệu</p>;

    return (
        <div className={cx('vocabulary-detail')}>
            <div className={cx('vocabulary-header')}>
                <h1 className={cx('vocabulary-title')}>{data.title}</h1>
                <p className={cx('vocabulary-meta')}>
                    <span>By {data.author}</span> • <span>{new Date(data.date).toLocaleDateString()}</span>
                </p>
                <p className={cx('vocabulary-description')}>{data.description}</p>
            </div>

            <div className={cx('banner-line')}></div>

            <div className={cx('vocabulary-words')}>
                {data.words.map((word) => (
                    <VocabularyWord
                        key={word.id}
                        word={word.word}
                        pronunciation={word.pronunciation}
                        meaning={word.meaning}
                        example={word.example}
                    />
                ))}
            </div>
        </div>
    );
};

const DATA: VocabularyDetailData = {
    title: 'Common English Phrases',
    author: 'John Doe',
    date: '2025-08-09T10:30:00Z',
    description: 'A collection of useful English phrases for daily conversation.',
    words: [
        {
            id: 1,
            word: 'Hello',
            pronunciation: 'həˈloʊ',
            meaning: 'A greeting or expression of goodwill',
            example: 'Hello, how are you?',
        },
        {
            id: 2,
            word: 'Thank you',
            pronunciation: 'ˈθæŋk juː',
            meaning: 'A polite expression of gratitude',
            example: 'Thank you for helping me.',
        },
        {
            id: 3,
            word: 'Excuse me',
            pronunciation: 'ɪkˈskjuːz mi',
            meaning: "A polite way to get someone's attention",
            example: 'Excuse me, could you tell me the time?',
        },
    ],
};

export default DetailVocabulary;
