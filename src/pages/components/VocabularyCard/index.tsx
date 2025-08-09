import type { JSX } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import routes from '@/config/routes';
import styles from './VocabularyCard.module.scss';

const cx = classNames.bind(styles);

interface VocabularyCardProps {
    imageUrl: string;
    category: string;
    title: string;
    description: string;
    date: string;
    user: string;
    id: any;
}

export default function VocabularyCard({
    imageUrl,
    category,
    title,
    description,
    date,
    user,
    id,
}: VocabularyCardProps): JSX.Element {
    return (
        <Link to={routes.detailVocabulary + `?id=${id}`} className={cx('card')}>
            <div className={cx('imageWrapper')}>
                <img src={imageUrl} alt={title} className={cx('image')} />
                <span className={cx('category')}>{category}</span>
            </div>
            <div className={cx('content')}>
                <h3 className={cx('title')}>{title}</h3>
                <p className={cx('description')}>{description}</p>
                <div className={cx('more-des')}>
                    <span className={cx('date')}>{date}</span>
                    <span className={cx('user')}>By {user}</span>
                </div>
            </div>
        </Link>
    );
}
