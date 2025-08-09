import { NavLink, useLocation } from 'react-router-dom';
import type { JSX } from 'react';
import classNames from 'classnames/bind';

import style from './Header.module.scss';
import avatar from '@/assets/avatar.png';
import logo from '@/assets/logo_doulingo.png';

const cx = classNames.bind(style);

function Header(): JSX.Element {
    return (
        <>
            <header className={cx('header')}>
                <div className={cx('logo')}>
                    <img src={logo} alt="logo" />
                    <span>WordSenglish</span>
                </div>

                <nav className={cx('nav')}>
                    <NavLink
                        to="/vocabulary"
                        className={({ isActive }) =>
                            // Khi là /vocabulary hoặc /vocabulary/:id thì active
                            location.pathname.startsWith('/vocabulary') &&
                            !location.pathname.startsWith('/vocabulary/create')
                                ? cx('active', 'nav-item')
                                : cx('nav-item')
                        }
                    >
                        Danh sách từ vựng
                    </NavLink>

                    <NavLink
                        to="/vocabulary/create"
                        className={({ isActive }) =>
                            location.pathname.startsWith('/vocabulary/create')
                                ? cx('active', 'nav-item')
                                : cx('nav-item')
                        }
                    >
                        Tạo từ vựng
                    </NavLink>
                </nav>

                <div className={cx('avatar-link')} aria-label="Tài khoản">
                    <span className={cx('avatar-link__hi')}>Hello</span>
                    <span>VStorm</span>
                    <img src={avatar} alt="Avatar" className={cx('avatar')} />
                </div>
            </header>
        </>
    );
}

export default Header;
