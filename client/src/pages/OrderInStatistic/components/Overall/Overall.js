import classNames from "classnames/bind";
import styles from './Overall.module.scss';

const cx = classNames.bind(styles);

function Overall() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-section', 'grid-col-4')}>
                <div className={cx('card', 'info-card', 'bg-purple')}>
                    <div className={cx('info-wrapper')}>
                        <h3 className={cx('info-header')}>Đơn trong ngày</h3>
                        <h2 className={cx('info-number')}>0</h2>
                    </div>
                </div>
                <div className={cx('card', 'info-card', 'bg-blue')}>
                    <div className={cx('info-wrapper')}>
                        <h3 className={cx('info-header')}>Đơn trong tháng</h3>
                        <h2 className={cx('info-number')}>0</h2>
                    </div>
                </div>
                <div className={cx('card', 'info-card', 'bg-green')}>
                    <div className={cx('info-wrapper')}>
                        <h3 className={cx('info-header')}>Đơn trong năm</h3>
                        <h2 className={cx('info-number')}>3</h2>
                    </div>
                </div>
                <div className={cx('card', 'info-card', 'bg-orange')}>
                    <div className={cx('info-wrapper')}>
                        <h3 className={cx('info-header')}>Tổng số đơn hàng</h3>
                        <h2 className={cx('info-number')}>3</h2>
                    </div>
                </div>
            </div>
            
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