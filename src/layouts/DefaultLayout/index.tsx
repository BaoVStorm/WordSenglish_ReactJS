import classNames from 'classnames/bind'

import style from './DefaultLayout.module.scss'

const cx = classNames.bind(style);


function DefaultLayout() {
    return (
        <div className={cx("wrapper")}>
            DefaultLayout
        </div>

    )
}

export default DefaultLayout;
