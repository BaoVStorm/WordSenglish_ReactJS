// DetailVocabulary.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams, Navigate, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector } from 'react-redux';

import menuIcon from '@/assets/menu.svg';
import VocabularyWord from '@/pages/components/VocabularyWord';
import styles from './DetailVocabulary.module.scss';
import IconHeart from '@/components/IconHeart';
import { getVocabItems, toggleLove, deletePost } from '@/services/Service';
import useAuthProfile from '@/hooks/useAuthProfile';
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
    author_id: string | number;
    title: string;
    description: string;
    date: string;
    love: boolean;
    loveCount: number;
    words: VocabularyWordData[];
}

const DetailVocabulary: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState<VocabularyDetailData | null>(null);
    const [loading, setLoading] = useState(true);
    const author_id = useSelector((state: any) => state.user.user_id);
    const navigate = useNavigate();

    const post_id = searchParams.get('post_id');
    if (!post_id) return <Navigate to={routes.notFound} />;

    // check auth profile
    useAuthProfile();

    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            try {
                const postsData: any = await getVocabItems(post_id);
                // console.log('Posts:', postsData);

                const post = postsData.post;

                setData({
                    title: post.title,
                    author: post.username,
                    author_id: post.author_id._id,
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
    }, [post_id]);

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
            await toggleLove(post_id);
        } catch (err) {
            console.error('Failed to load posts:', err);
        }
    }, []);

    const handleDelete = useCallback(async () => {
        const confirmed = window.confirm('Bạn có muốn xoá bài này không');

        if (!confirmed) return; // Cancelled

        try {
            await deletePost(post_id);
            navigate(routes.home);
        } catch (err) {
            console.error('Failed to delete post:', err);
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

                {/* edit */}

                {data.author_id == author_id && (
                    <Dropdown className={cx('edit-menu')} drop="down">
                        <Dropdown.Toggle className={cx('dropdown-menu')}>
                            <img src={menuIcon} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu align="end">
                            <Dropdown.Item className={cx('dropdown-edit')}>Chỉnh sửa</Dropdown.Item>
                            <Dropdown.Item className={cx('dropdown-delete')} onClick={handleDelete}>
                                Xoá
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                )}
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

            <CommentContainer postId={post_id} className={cx('comment-container')} />
        </div>
    );
};

export default DetailVocabulary;
