import { useMemo, type JSX } from 'react';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';

import style from './Vocabulary.module.scss';
import VocabularyCard from '@/pages/components/VocabularyCard';
import Pagination from '@/pages/components/Pagination';

import tempCover from '@/assets/vocab/cover_image.png';

const cx = classNames.bind(style);

function Vocabulary(): JSX.Element {
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const currentPage = searchParams.get('page') || 1;

    console.log(currentPage);

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
                {Array.from({ length: 10 }).map((_, i) => (
                    <VocabularyCard
                        key={i}
                        id={i}
                        imageUrl={tempCover}
                        category="Memrise News & Events"
                        title={`Team Update #${i + 1}`}
                        description="Over the last couple of months, we’ve been pulling back the curtain on what..."
                        date="31/07/2025"
                    />
                ))}
            </div>

            <Pagination currentPage={Number(currentPage)} totalPages={22} path={location.pathname} />
        </>
    );
}

export default Vocabulary;
