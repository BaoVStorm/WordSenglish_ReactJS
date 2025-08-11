import React, { useEffect, useState, useRef, useCallback } from 'react';
import classNames from 'classnames/bind';

import styles from './CommentContainer.module.scss';
import { getComments, addComment } from '@/services/authService';

import TextArea from '@/components/TextArea';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

interface Comment {
    _id: string;
    user_name: string;
    content: string;
    created_at: string;
}

interface Props {
    postId: string;
    className?: any;
}

const CommentContainer: React.FC<Props> = ({ postId, className }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

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

    const handleInput = useCallback(() => {
        const el = textareaRef.current;
        if (!el) return;

        el.style.height = 'auto'; // reset to shrink if needed
        const computed = getComputedStyle(el);
        const maxHeight = parseInt(computed.maxHeight);

        // Grow until maxHeight
        el.style.height = Math.min(el.scrollHeight, maxHeight) + 'px';
    }, []);

    return (
        <div className={cx(className, 'comments-section')}>
            <h3>Comments</h3>
            <div className={cx('comment-input')}>
                <TextArea
                    rows={1}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your comment..."
                    ref={textareaRef}
                    onInput={handleInput}
                    value={newComment}
                />

                <Button onClick={handleAddComment} typeButton={'interact'}>Post</Button>
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
