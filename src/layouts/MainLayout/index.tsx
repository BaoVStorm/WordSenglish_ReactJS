import classNames from 'classnames/bind'

import style from './MainLayout.module.scss'

const cx = classNames.bind(style);


function MainLayout() {
    return (
        <div className={cx("wrapper")}>
            MainLayout
        </div>

    )
}

export default MainLayout;
