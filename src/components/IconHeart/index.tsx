import heart from '@/assets/icon/heart.png';
import fullHeart from '@/assets/icon/full-heart-red.png';
import { memo, type JSX } from 'react';

type IconHeartType = {
    className: any;
    check?: boolean;
    transparent?: boolean;
} & React.HTMLAttributes<HTMLImageElement>;

function IconHeart({ className, check = false, transparent = false, ...props}: IconHeartType): JSX.Element {
    const Type = check ? fullHeart : (transparent ? "" : heart);

    return <img className={className} src={Type} {...props} />;
}

export default memo(IconHeart);
