import { useEffect, useState, type JSX } from 'react';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';

import style from './Vocabulary.module.scss';
import VocabularyCard from '@/pages/components/VocabularyCard';
import Pagination from '@/pages/components/Pagination';

//
import { useNavigate } from 'react-router-dom';
import { getProfile } from '@/services/authService';
import { useDispatch } from 'react-redux';
import { setUsername } from '@/redux/slices/userSlices';
import routes from '@/config/routes';
//

import tempCover from '@/assets/vocab/cover_image.png';

const cx = classNames.bind(style);

function Vocabulary(): JSX.Element {
    const location = useLocation();
    const [totalPages, setTotalPages] = useState(22);

    const [currentPage, setCurrentPage] = useState(() => {
        const searchParams = new URLSearchParams(location.search);
        return Number(searchParams.get('page')) || 1;
    });

    const navigate = useNavigate();

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
        const searchParams = new URLSearchParams(location.search);
        const curPage = Number(searchParams.get('page')) || 1;

        if (currentPage !== curPage) setCurrentPage(curPage);
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
                {Array.from({ length: 10 }).map((_, i) => (
                    <VocabularyCard
                        key={i}
                        id={i}
                        imageUrl={tempCover}
                        category="Memrise News & Events"
                        title={`Team Update #${i + 1}`}
                        description="Over the last couple of months, we’ve been pulling back the curtain on what..."
                        user="VStorm"
                        date="31/07/2025"
                    />
                ))}
            </div>

            <Pagination currentPage={Number(currentPage)} totalPages={totalPages} path={location.pathname} />
        </>
    );
}

export default Vocabulary;
