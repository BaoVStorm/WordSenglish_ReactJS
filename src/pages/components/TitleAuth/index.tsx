import type { JSX } from 'react';
import classNames from 'classnames/bind';

import styles from './TitleAuth.module.scss';

const cx = classNames.bind(styles);

type TitleAuthType = {
    title: string;
};

function TitleAuth({ title }: TitleAuthType): JSX.Element {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('wrapper__title')}>
                {title}
            </p>
        </div>
    );
}

export default TitleAuth;
