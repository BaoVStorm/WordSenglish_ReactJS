import classNames from 'classnames/bind';

import type { ChildStyleProps } from '@/layouts/types/childrenTypes';
import style from './MainLayout.module.scss';
import type { ReactElement } from 'react';

const cx = classNames.bind(style);

function MainLayout({ children }: ChildStyleProps): ReactElement {
    return (
        <div className={cx('wrapper')}>
            MainLayout
            <div className="content">{children}</div>
        </div>
    );
}

export default MainLayout;
