import React from 'react';
import classNames from 'classnames/bind';
import style from './VocabularyWord.module.scss';

import wordLogo from '@/assets/word_logo.jpg';

const cx = classNames.bind(style);

interface VocabularyWordProps {
    word: string;
    pronunciation?: string;
    meaning: string;
    example?: string;
}

const VocabularyWord: React.FC<VocabularyWordProps> = ({ word, pronunciation, meaning, example }) => {
    const borderPronunciation = (pronunciation: string) => {
        if (pronunciation.endsWith('/') && pronunciation.startsWith('/')) return pronunciation;

        return `/${pronunciation}/`;
    };

    return (
        <div className={cx('vocabulary-word')}>
            <div className={cx('img')}>
                <img src={wordLogo} alt="word logo" />
            </div>
            <div>
                <h3 className={cx('word')}>{word}</h3>
                {pronunciation && <span className={cx('pronunciation')}>{borderPronunciation(pronunciation)}</span>}
                <p className={cx('meaning')}>{meaning}</p>
                {example && <p className={cx('example')}>Example: {example}</p>}
            </div>
        </div>
    );
};

export default VocabularyWord;
