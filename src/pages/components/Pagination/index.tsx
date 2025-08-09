import React from 'react';
import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';
import { useNavigate } from 'react-router-dom';

import nextArrow from '@/assets/pagination/next-arrow.svg';
import backArrow from '@/assets/pagination/back-arrow.svg';

const cx = classNames.bind(styles);

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange?: (page: number) => void;
    path: string;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, path }) => {
    const navigate = useNavigate();

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        if (onPageChange) onPageChange(page);
        navigate(`${path}?page=${page}`);
    };

    const getPages = () => {
        const pages: (number | string)[] = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 2) {
                pages.push(1, 2, 3, '...', totalPages);
            } else if (currentPage >= totalPages - 1) {
                pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1);

                if (currentPage != 3) pages.push('...');

                pages.push(currentPage - 1, currentPage, currentPage + 1);

                if (currentPage + 1 != totalPages) pages.push('...');

                pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <div className={cx('pagination')}>
            <button className={cx('arrow', { disabled: currentPage === 1 })} onClick={() => goToPage(currentPage - 1)}>
                <img src={backArrow} alt="back-arrow" />
            </button>
            {getPages().map((p, index) =>
                typeof p === 'number' ? (
                    <button
                        key={index}
                        className={cx('page', { active: p === currentPage })}
                        onClick={() => goToPage(p)}
                    >
                        {p}
                    </button>
                ) : (
                    <span key={index} className={cx('dots')}>
                        {p}
                    </span>
                ),
            )}
            <button
                className={cx('arrow', { disabled: currentPage === totalPages })}
                onClick={() => goToPage(currentPage + 1)}
            >
                <img src={nextArrow} alt="next-arrow" />
            </button>
        </div>
    );
};

export default Pagination;
