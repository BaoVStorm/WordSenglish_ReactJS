import React from 'react';
import classNames from 'classnames/bind';

import defaultAvatar from '@/assets/avatar.png';
import styles from './Comment.module.scss';

const cx = classNames.bind(styles);

interface CommentProps {
    avatar?: string;
    username: string;
    date: string;
    content: string;
}

const Comment: React.FC<CommentProps> = ({ avatar, username, date, content }) => {
    return (
        <div className={cx('comment')}>
            <img className={cx('comment-avatar')} src={avatar ? avatar : defaultAvatar} alt={username} />
            <div className={cx('comment-body')}>
                <div className={cx('comment-header')}>
                    <strong className={cx('comment-username')}>{username}</strong>
                    <span className={cx('comment-date')}>{new Date(date).toLocaleString()}</span>
                </div>
                <p className={cx('comment-content')}>{content}</p>
            </div>
        </div>
    );
};

export default Comment;
