import { useEffect, useState, type JSX } from 'react';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';

import style from './Vocabulary.module.scss';
import VocabularyCard from '@/pages/components/VocabularyCard';
import Pagination from '@/pages/components/Pagination';

import { getPosts } from '@/services/Service';
import useAuthProfile from '@/hooks/useAuthProfile';

import tempCover from '@/assets/vocab/cover_image.png';

const cx = classNames.bind(style);

function Vocabulary(): JSX.Element {
    const location = useLocation();
    const [totalPages, setTotalPages] = useState(22);
    const [posts, setPosts] = useState([]);

    const [currentPage, setCurrentPage] = useState(() => {
        const searchParams = new URLSearchParams(location.search);
        return Number(searchParams.get('page')) || 1;
    });

    // check auth profile
    useAuthProfile();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const curPage = Number(searchParams.get('page')) || 1;

        if (currentPage !== curPage) {
            setCurrentPage(curPage);
        }

        const fetchData = async () => {
            try {
                const postsData = await getPosts(curPage);
                console.log('Posts:', postsData);
                setTotalPages(postsData.totalPages);
                setPosts(postsData.posts);
            } catch (err) {
                console.error('Failed to load posts:', err);
            }
        };

        fetchData();
    }, [location.search]);

    useEffect(() => {
        // console.log('Change: ', currentPage);
        // fetch api
    }, [currentPage]);

    return (
        <>
            <div className={cx('maxContainer')}>
                <div className={cx('hero-blog-heading-content')}>
                    <h2>Vocabularies:</h2>
                </div>

                <div className={cx('hero-blog-heading-content-sub')}>
                    <p>
                        Browse all vocabulary posts, explore new words with their meanings and examples, and easily
                        review what you've learned. Expand your vocabulary step by step.
                    </p>
                </div>
            </div>

            <div className={cx('word-container')}>
                {posts.map((post: any, index) => (
                    <VocabularyCard
                        key={`post-${index}`}
                        id={post._id}
                        imageUrl={tempCover}
                        category="Memrise News & Events"
                        title={post.title}
                        description={post.description}
                        user={post.username}
                        date={post.created_at.split('T')[0]}
                        love={post.love}
                    />
                ))}
            </div>

            <Pagination currentPage={Number(currentPage)} totalPages={totalPages} path={location.pathname} />
        </>
    );
}

export default Vocabulary;
