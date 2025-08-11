import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cx from 'classnames/bind';

import styles from './Register.module.scss';
import routes from '@/config/routes';

import { register, getProfile } from '@/services/Service';

import logo from '@/assets/logo_doulingo.png';
import TitleAuth from '@/pages/components/TitleAuth';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { isEmpty } from '@/utils/checkValidForm';

const cs = cx.bind(styles);

export default function Register() {
    const [form, setForm] = useState({
        username: '',
        password: '',
        rePassword: '',
    });

    const navigate = useNavigate();
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    // kiểm tra nếu đã đăng nhập goto home
    useEffect(() => {
        (async () => {
            try {
                // Try fetching user profile — if accessToken is valid, this works
                await getProfile();
                navigate(routes.home);
            } catch (err: any) {
                // If 401, accessToken may be invalid — optionally try refresh flow here
                console.log('Not logged in:', err.response?.data || err.message);
            }
        })();
    }, [navigate]);

    // Validate khi value hoặc touched thay đổi
    useEffect(() => {
        const newErrors: Record<string, string> = {};
        if (touched.username && isEmpty(form.username)) {
            newErrors.username = '*Tên đăng nhập không được để trống';
        }
        if (touched.password && isEmpty(form.password)) {
            newErrors.password = '*Mật khẩu không được để trống';
        }
        if (touched.rePassword && isEmpty(form.rePassword)) {
            newErrors.rePassword = '*Nhập lại mật khẩu không được để trống';
        }

        setErrors(newErrors);
    }, [form, touched]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Mark tất cả là touched để hiện lỗi nếu chưa nhập

        if (form.username && form.password && form.rePassword) {
            if (form.password != form.rePassword) {
                setErrors({
                    ...errors,
                    rePassword: '*Mật khẩu không trùng khớp',
                });
            } else {
                try {
                    await register(form.username, form.password);
                    // login
                    navigate(routes.home);
                } catch (err: any) {
                    alert(err.message);
                }
                console.log('succ');
            }
        } else {
            // console.log('error');
            setTouched({ username: true, password: true, rePassword: true });
        }
    };

    return (
        <>
            <TitleAuth title="Đăng ký" />

            <h3 className={cs('content__title')}>
                Đăng ký tài khoản <strong>WordSenglish</strong>
            </h3>

            <img className={cs('content__logo')} src={logo} alt="logo WordSenglish" />

            <form className={cs('content__form')} onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="username"
                    placeholder="Tên đăng nhập"
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={form.username}
                />
                <p className={cs('form__error')}>{errors.username}</p>

                <Input
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={form.password}
                />
                <p className={cs('form__error')}>{errors.password}</p>

                <Input
                    type="password"
                    name="rePassword"
                    placeholder="Xác nhận mật khẩu"
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={form.rePassword}
                />
                <p className={cs('form__error')}>{errors.rePassword}</p>

                <div className={cs('form__button')}>
                    <Button className={cs('button__content')} typeButton="primary">
                        Đăng ký
                    </Button>
                </div>
            </form>

            <div className={cs('content__navigate')}>
                <p>Đã có tài khoản? </p>
                <Link to={routes.login} className={cs('navigate__content')}>
                    Đăng nhập
                </Link>
            </div>
        </>
    );
}
