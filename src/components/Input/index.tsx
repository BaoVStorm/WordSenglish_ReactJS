import classNames from 'classnames/bind';
import type { JSX, InputHTMLAttributes } from 'react';

import style from './Input.module.scss';

const cx = classNames.bind(style);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

function Input({ className, ...rest }: InputProps): JSX.Element {
    return <input className={cx('input', className)} {...rest} />;
}

export default Input;
