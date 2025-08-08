import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames/bind';
import styles from './Login.module.scss';
import routes from '@/config/routes';
import logo from '@/assets/logo_doulingo.png';
import TitleAuth from '@/pages/components/TitleAuth';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { isEmpty } from '@/utils/checkValidForm';

const cs = cx.bind(styles);

export default function Login() {
    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Validate khi value hoặc touched thay đổi
    useEffect(() => {
        const newErrors: Record<string, string> = {};
        if (touched.username && isEmpty(form.username)) {
            newErrors.username = '*Tên đăng nhập không được để trống';
        }
        if (touched.password && isEmpty(form.password)) {
            newErrors.password = '*Mật khẩu không được để trống';
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mark tất cả là touched để hiện lỗi nếu chưa nhập
        setTouched({ username: true, password: true });

        if (Object.keys(errors).length === 0 && form.username && form.password) {
            console.log('succ');
        } else {
            console.log('error');
        }
    };

    return (
        <>
            <TitleAuth title="Đăng nhập" />

            <h3 className={cs('content__title')}>
                Đăng nhập tài khoản <strong>WordSenglish</strong>
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

                <div className={cs('form__button')}>
                    <Button className={cs('button__content')} typeButton="primary">
                        Đăng nhập
                    </Button>
                </div>
            </form>

            <div className={cs('content__navigate')}>
                <p>Chưa có tài khoản? </p>
                <Link to={routes.register} className={cs('navigate__content')}>
                    Đăng ký tài khoản
                </Link>
            </div>
        </>
    );
}
