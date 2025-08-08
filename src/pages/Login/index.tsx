import type { JSX } from 'react';
import classNames from 'classnames/bind';

import styles from './Login.module.scss';

import logo from '@/assets/logo_doulingo.png'
import TitleAuth from '@/pages/components/TitleAuth';
import Input from '@/components/Input';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

function Login(): JSX.Element {
    return (
        <>
            <TitleAuth title="Đăng nhập" />

            <h3 className={cx('content__title')}>Đăng nhập tài khoản WordSenglish</h3>

            <img className={cx('content__logo')} src={logo} alt="logo WordSenglish" />

            <form className={cx('content__form')}>
                <Input type="text" name="username" placeholder="Tên đăng nhập" autoComplete="username" />
                <p className={cx('form__error')}>*error</p>

                <Input type="password" name="password" placeholder="Mật khẩu" autoComplete="off" />
                <p className={cx('form__error')}>*error</p>

                <Button>đăng nhập</Button>
            </form>
        </>
    );
}

export default Login;
