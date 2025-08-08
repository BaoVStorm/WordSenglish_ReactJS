import classNames from 'classnames/bind';
import type { JSX, InputHTMLAttributes  } from 'react';

import style from './Input.module.scss';

const cx = classNames.bind(style);

type InputProps = InputHTMLAttributes<HTMLInputElement>;

function Input(props: InputProps): JSX.Element {
    return (
        <>
            <input className={cx('input', props.className)} {...props} />
        </>
    );
}

export default Input;
