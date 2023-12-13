import classNames from "classnames/bind";
import styles from './Slider.module.scss';

import images from '~/assets/images';

const cx = classNames.bind(styles);

function Slider() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <img className={cx('image')} src={images.banner} alt='banner' />
            </div>
        </div>
    );
}

export default Slider;