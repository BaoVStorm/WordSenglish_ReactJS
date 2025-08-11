import classNames from 'classnames/bind';
import type { JSX, TextareaHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import style from './TextArea.module.scss';

const cx = classNames.bind(style);

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

function TextArea({ className, ...rest}: TextAreaProps, ref : any): JSX.Element {
    return <textarea ref={ref} className={cx('input', className)} {...rest} />;
}

export default forwardRef(TextArea);
