import heart from '@/assets/icon/heart.png';
import fullHeart from '@/assets/icon/full-heart-red.png';
import { type JSX } from 'react';

type IconHeartType = {
    className: any;
    check?: boolean;
    transparent?: boolean;
};

function IconHeart({ className, check = false, transparent = false }: IconHeartType): JSX.Element {
    const Type = check ? fullHeart : (transparent ? "" : heart);

    return <img className={className} src={Type} />;
}

export default IconHeart;
