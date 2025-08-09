import type { JSX } from 'react';
import classNames from 'classnames/bind';

import style from './Vocabulary.module.scss';

const cx = classNames.bind(style);

function Vocabulary(): JSX.Element {
    return (
        <>
            <div className={cx("maxContainer")}>
                <div className={cx("hero-blog-heading-content")}>
                    <h2>Vocabularies:</h2>
                </div>

                <div className={cx("hero-blog-heading-content-sub")}>
                    <p>
                        Browse all vocabulary posts, explore new words with their meanings and examples, and easily review what you've learned. Expand your vocabulary step by step.
                    </p>
                </div>
            </div>

            <div className={cx("word-container")}>

            </div>
        </>
    );
}

export default Vocabulary;
