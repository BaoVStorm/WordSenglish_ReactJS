import type { ReactElement } from 'react';
import classNames from 'classnames/bind';

import type { ChildStyleProps } from '@/layouts/types/childrenTypes';
import style from './MainLayout.module.scss';
import avatar from '@/assets/avatar.png'
import logo from '@/assets/logo_doulingo.png'

const cx = classNames.bind(style);

function MainLayout({ children }: ChildStyleProps): ReactElement {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <div className={cx('logo')}>
                    <img src={logo} alt="logo" />
                    <span>WordSenglish</span>
                </div>

                <nav className={cx('nav')}>
                    {/* <Link to="/word-list" className={cx('nav-item')}>
                            Danh sách từ vựng
                        </Link> */}
                    {/* <Link to="/create-word" className={cx('nav-item')}>
                            Tạo từ vựng
                        </Link> */}
                    <a href="">Danh sách từ vựng</a>
                    <a href="">Tạo từ vựng</a>
                </nav>

                <div className={cx('avatar-link')} aria-label="Tài khoản">
                    <span className={cx('avatar-link__hi')}>Hello</span>
                    <span>VStorm</span>
                    <img src={avatar} alt="Avatar" className={cx('avatar')} />
                </div>
            </header>

            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default MainLayout;
