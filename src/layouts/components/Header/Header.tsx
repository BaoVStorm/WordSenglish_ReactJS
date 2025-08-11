import { NavLink, useNavigate } from 'react-router-dom';
import type { JSX } from 'react';
import classNames from 'classnames/bind';

import Dropdown from 'react-bootstrap/Dropdown';

import { useSelector } from 'react-redux';
import { logout } from '@/services/Service';

import style from './Header.module.scss';
import avatar from '@/assets/avatar.png';
import logo from '@/assets/logo_doulingo.png';

import routes from '@/config/routes';

const cx = classNames.bind(style);

function Header(): JSX.Element {
    const navigate = useNavigate();

    const username = useSelector((state: any) => state.user.username);

    const handleLogout = async () => {
        // console.log('logout');

        try {
            await logout();
            // login
            navigate(routes.login);
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <>
            <header className={cx('header')}>
                <div className={cx('logo')}>
                    <img src={logo} alt="logo" />
                    <span>WordSenglish</span>
                </div>

                <nav className={cx('nav')}>
                    <NavLink
                        to={routes.vocabulary}
                        className={({ isActive }) =>
                            // Khi là /vocabulary hoặc /vocabulary/:id thì active
                            location.pathname.endsWith(routes.vocabulary) ||
                            (location.pathname.startsWith(routes.home) &&
                                !location.pathname.startsWith(routes.createVocabulary))
                                ? cx('active', 'nav-item')
                                : cx('nav-item')
                        }
                    >
                        Danh sách từ vựng
                    </NavLink>

                    <NavLink
                        to={routes.createVocabulary}
                        className={({ isActive }) =>
                            location.pathname.startsWith(routes.createVocabulary)
                                ? cx('active', 'nav-item')
                                : cx('nav-item')
                        }
                    >
                        Tạo từ vựng
                    </NavLink>
                </nav>

                <Dropdown className={cx('avatar-link')}>
                    <span className={cx('avatar-link__hi')}>Hello</span>
                    <span>{username}</span>

                    <Dropdown.Toggle className={cx('dropdown-avar')}>
                        <img src={avatar} alt="Avatar" className={cx('avatar')} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item className={cx('dropdown-logout')} onClick={handleLogout}>
                            Đăng xuất
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </header>
        </>
    );
}

export default Header;
