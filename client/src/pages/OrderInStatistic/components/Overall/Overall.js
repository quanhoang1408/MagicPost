import classNames from "classnames/bind";
import styles from './Overall.module.scss';

const cx = classNames.bind(styles);

function Overall() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-section')}>
                <div className={cx('card', 'table-card')}>
                    <div className={cx('table-wrapper')}>
                        <h3 className={cx('table-header')}>Thống kê hàng nhận</h3>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overall;