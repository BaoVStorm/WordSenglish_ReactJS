import type { ReactElement } from 'react';
import classNames from 'classnames/bind';

import type { ChildStyleProps } from '@/layouts/types/childrenTypes';

import style from './DefaultLayout.module.scss';
const cx = classNames.bind(style);

function DefaultLayout({ children }: ChildStyleProps): ReactElement {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default DefaultLayout;
