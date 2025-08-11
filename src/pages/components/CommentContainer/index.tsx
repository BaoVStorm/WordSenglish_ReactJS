import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './CommentContainer.module.scss';
import { getComments, addComment } from '@/services/authService';

const cx = classNames.bind(styles);

interface Comment {
    _id: string;
    user_name: string;
    content: string;
    created_at: string;
}

interface Props {
    postId: string;
}

const CommentContainer: React.FC<Props> = ({ postId }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        (async () => {
            const data = await getComments(postId);
            setComments(data);
        })();
    }, [postId]);

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        const comment = await addComment(postId, newComment);
        setComments((prev) => [comment, ...prev]);
        setNewComment('');
    };

    return (
        <div className={cx('comments-section')}>
            <h3>Comments</h3>
            <div className={cx('comment-input')}>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your comment..."
                />
                <button onClick={handleAddComment}>Post</button>
            </div>
            <ul className={cx('comment-list')}>
                {comments.map((c) => (
                    <li key={c._id}>
                        <strong>{c.user_name}</strong>
                        <span>{new Date(c.created_at).toLocaleString()}</span>
                        <p>{c.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentContainer;
