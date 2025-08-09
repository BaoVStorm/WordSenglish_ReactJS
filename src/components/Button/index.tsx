import type { JSX, ReactNode, MouseEventHandler, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    onClick,
    typeButton,
    rounded = false,
    disable = false,
    small = false,
    large = false,
    iconLeft,
    iconRight,
    className,
    children,
    ...pastProps
}: ButtonProps): JSX.Element {
    let Comp: any = 'button';

    const props: any = {
        onClick,
        ...pastProps,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    }
    if (href) {
        props.href = href;
        Comp = 'a';
    }

    // Remove event listener if disable
    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    const classes = cx(
        'wrapper',
        {
            [typeButton || '']: typeButton,
            disable,
            small,
            large,
            rounded,
        },
        className,
    );

    return (
        <Comp className={classes} {...props}>
            {iconLeft && <span className={cx('icon')}>{iconLeft}</span>}
            <span className={cx('title')}>{children}</span>
            {iconRight && <span className={cx('icon')}>{iconRight}</span>}
        </Comp>
    );
}

type ButtonProps = {
    to?: string;
    href?: string;
    onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    typeButton?: 'primary' | 'outline' | 'error' | 'interact'; // gồm 2 loại primary và outline
    rounded?: boolean;
    disable?: boolean;
    small?: boolean;
    large?: boolean;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    className?: string;
    children?: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'>;

export default Button;
