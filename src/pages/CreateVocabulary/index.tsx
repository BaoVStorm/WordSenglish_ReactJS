import { type JSX, useState } from 'react';
import classNames from 'classnames/bind';

import style from './CreateVocabulary.module.scss';

const cx = classNames.bind(style);

interface Word {
    name: string;
    pronunciation: string;
    meaning: string;
    example: string;
}

function CreateVocabulary(): JSX.Element {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [words, setWords] = useState<Word[]>([{ name: '', pronunciation: '', meaning: '', example: '' }]);

    const handleWordChange = (index: number, field: keyof Word, value: string) => {
        const updated = [...words];
        updated[index][field] = value;
        setWords(updated);
    };

    const addWord = () => {
        setWords([...words, { name: '', pronunciation: '', meaning: '', example: '' }]);
    };

    const removeWord = (index: number) => {
        setWords(words.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { title, description, words };
        console.log('Data to submit:', payload);
        // TODO: Gửi payload tới API
    };

    return (
        <div className={cx('container')}>
            <h1 className={cx('heading')}>Create New Vocabulary</h1>
            <form className={cx('form')} onSubmit={handleSubmit}>
                <div className={cx('form-group')}>
                    <label className={cx('label')}>Title</label>
                    <input
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
                    <textarea
                        className={cx('textarea')}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                    />
                </div>

                <h2 className={cx('subheading')}>Words</h2>
                {words.map((word, index) => (
                    <div key={index} className={cx('word-item')}>
                        <input
                            className={cx('input')}
                            type="text"
                            placeholder="Word"
                            value={word.name}
                            onChange={(e) => handleWordChange(index, 'name', e.target.value)}
                            required
                        />
                        <input
                            className={cx('input')}
                            type="text"
                            placeholder="Pronunciation"
                            value={word.pronunciation}
                            onChange={(e) => handleWordChange(index, 'pronunciation', e.target.value)}
                        />
                        <input
                            className={cx('input')}
                            type="text"
                            placeholder="Meaning"
                            value={word.meaning}
                            onChange={(e) => handleWordChange(index, 'meaning', e.target.value)}
                            required
                        />
                        <input
                            className={cx('input')}
                            type="text"
                            placeholder="Example sentence"
                            value={word.example}
                            onChange={(e) => handleWordChange(index, 'example', e.target.value)}
                        />
                        {words.length > 1 && (
                            <button
                                type="button"
                                className={cx('remove-btn')}
                                onClick={() => removeWord(index)}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button type="button" className={cx('add-btn')} onClick={addWord}>
                    + Add Word
                </button>

                <button type="submit" className={cx('submit-btn')}>
                    Save Vocabulary
                </button>
            </form>
        </div>
    );
}

export default CreateVocabulary;
