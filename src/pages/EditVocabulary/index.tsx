import { useLocation, useNavigate } from 'react-router-dom';
import { type JSX, useState } from 'react';
import classNames from 'classnames/bind';

import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import Button from '@/components/Button';
import style from './EditVocabulary.module.scss';
import useAuthProfile from '@/hooks/useAuthProfile';
import { editPost } from '@/services/Service';
import routes from '@/config/routes';

const cx = classNames.bind(style);

interface Word {
    word_en: string;
    pronunciation: string;
    meaning_vi: string;
    example: string;
}

function CreateVocabulary(): JSX.Element {
    const data = useLocation().state;
    const [title, setTitle] = useState(data.title || '');
    const [description, setDescription] = useState(data.description || '');
    const [words, setWords] = useState<Word[]>(
        data.words || [{ word_en: '', pronunciation: '', meaning_vi: '', example: '' }],
    );
    const navigate = useNavigate();

    // console.log(data)

    // check auth profile
    useAuthProfile();

    const handleWordChange = (index: number, field: keyof Word, value: string) => {
        const updated = [...words];
        updated[index][field] = value;
        setWords(updated);
    };

    const addWord = (e: any) => {
        e.preventDefault();

        setWords([...words, { word_en: '', pronunciation: '', meaning_vi: '', example: '' }]);
    };

    const removeWord = (index: number) => {
        setWords(words.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const confirmed = window.confirm('Bạn có xác nhận chỉnh sửa không?');
        if (!confirmed) return;

        try {
            await editPost(data.post_id, title, description, words);
            alert('Chỉnh sửa thành công!');

            // clear input
            setTitle('');
            setDescription('');
            setWords([]);

            navigate(routes.home);
        } catch (err: any) {
            console.log('Not logged in:', err.response?.data || err.message);
            alert(err.response?.data || err.message || 'Error');
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('maxContainer')}>
                <div className={cx('hero-blog-heading-content')}>
                    <h2>Edit Vocabularies:</h2>
                </div>
            </div>

            <form className={cx('form')} onSubmit={handleSubmit}>
                <div className={cx('form-group')}>
                    <label className={cx('label')}>Title</label>
                    <Input
                        className={cx('input')}
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title"
                        required
                    />
                </div>

                <div className={cx('form-group')}>
                    <label className={cx('label')}>Description</label>
                    <TextArea
                        className={cx('textarea')}
                        value={description}
                        rows={5}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                    />
                </div>

                <h2 className={cx('label')}>Words</h2>
                {words.map((word, index) => (
                    <div key={index} className={cx('word-container')}>
                        <div className={cx('word-item')}>
                            <Input
                                className={cx('input')}
                                type="text"
                                placeholder="Word"
                                value={word.word_en}
                                onChange={(e) => handleWordChange(index, 'word_en', e.target.value)}
                                required
                            />
                            <Input
                                className={cx('input')}
                                type="text"
                                placeholder="Pronunciation"
                                value={word.pronunciation}
                                onChange={(e) => handleWordChange(index, 'pronunciation', e.target.value)}
                            />
                            <Input
                                className={cx('input')}
                                type="text"
                                placeholder="Meaning"
                                value={word.meaning_vi}
                                onChange={(e) => handleWordChange(index, 'meaning_vi', e.target.value)}
                                required
                            />
                        </div>
                        <div className={cx('word-item-2')}>
                            <Input
                                className={cx('input')}
                                type="text"
                                placeholder="Example sentence"
                                value={word.example}
                                onChange={(e) => handleWordChange(index, 'example', e.target.value)}
                            />
                            {words.length > 1 && (
                                <Button
                                    className={cx('remove-btn')}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        removeWord(index);
                                    }}
                                    typeButton="error"
                                >
                                    Remove
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
                <Button className={cx('add-btn')} onClick={addWord} typeButton="interact">
                    + Add Word
                </Button>

                <div className={cx('submit-btn-container')}>
                    <Button className={cx('submit-btn')} typeButton="primary">
                        Save Edit
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default CreateVocabulary;
