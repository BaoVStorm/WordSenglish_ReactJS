import type { JSX } from 'react';
import classNames from 'classnames/bind';

import type { ChildStyleProps } from '@/layouts/types/childrenTypes';
import style from './MainLayout.module.scss';
import Header from '@/layouts/components/Header/Header';

const cx = classNames.bind(style);

function MainLayout({ children }: ChildStyleProps): JSX.Element {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default MainLayout;
