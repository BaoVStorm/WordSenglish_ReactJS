// DetailVocabulary.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './DetailVocabulary.module.scss';
import VocabularyWord from '@/pages/components/VocabularyWord';

import IconHeart from '@/components/IconHeart';
import { useNavigate } from 'react-router-dom';
import { getProfile, getVocabItems, toggleLove } from '@/services/authService';
import { useDispatch } from 'react-redux';
import { setUsername } from '@/redux/slices/userSlices';

import CommentContainer from '@/pages/components/CommentContainer';

import routes from '@/config/routes';

const cx = classNames.bind(styles);

interface VocabularyWordData {
    _id: string | number;
    word_en: string;
    pronunciation?: string;
    meaning_vi: string;
    example?: string;
}

interface VocabularyDetailData {
    author: string;
    title: string;
    description: string;
    date: string;
    love: boolean;
    loveCount: number;
    words: VocabularyWordData[];
}

const DetailVocabulary: React.FC = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('post_id');
    const [data, setData] = useState<VocabularyDetailData | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    if (!id) return <Navigate to={routes.notFound} />;

    // set Username to redux
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const profile = await getProfile();
                dispatch(setUsername(profile.username));
            } catch (err: any) {
                navigate(routes.login);
            }
        })();
    }, [navigate]);
    //

    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            try {
                const postsData: any = await getVocabItems(id);
                console.log('Posts:', postsData);

                const post = postsData.post;

                setData({
                    title: post.title,
                    author: post.username,
                    date: post.created_at.split('T')[0],
                    description: post.description,
                    love: post.love,
                    loveCount: post.loveCount,
                    words: postsData.vocabItems,
                });

                setLoading(false);
            } catch (err) {
                console.error('Failed to load posts:', err);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleLove = useCallback(async () => {
        try {
            setData((prev) =>
                prev
                    ? {
                          ...prev,
                          love: !prev.love,
                          loveCount: prev.love ? prev.loveCount - 1 : prev.loveCount + 1,
                      }
                    : prev,
            );
            await toggleLove(id);
        } catch (err) {
            console.error('Failed to load posts:', err);
        }
    }, []);

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
                <div className={cx('vocabulary-heart')}>
                    <p className={cx('vocabulary-heart-count')}>Love count: {data.loveCount}</p>
                    <IconHeart className={cx('vocabulary-heart-icon')} check={data.love} onClick={handleLove} />
                </div>
            </div>

            <div className={cx('banner-line')}></div>

            <div className={cx('vocabulary-words')}>
                {data.words.map((word) => (
                    <VocabularyWord
                        key={word._id}
                        word={word.word_en}
                        pronunciation={word.pronunciation}
                        meaning={word.meaning_vi}
                        example={word.example}
                    />
                ))}
            </div>

            <div className={cx('banner-line')}></div>

            <CommentContainer postId={id} className={cx('comment-container')}/>
        </div>
    );
};

export default DetailVocabulary;
