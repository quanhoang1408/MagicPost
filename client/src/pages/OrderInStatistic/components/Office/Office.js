import classNames from "classnames/bind";
import styles from './Office.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faLocationDot, faPhone, faTag } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Office() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-section')}>
                <div className={cx('card')}>
                    <div className={cx('card-wrapper')}>
                        <h3 className={cx('header')}>Thống kê hàng nhận</h3>
                        
                        <div className={cx('search')}>
                            <select className={cx('input-wrapper')}>
                                <option>Chọn thành phố</option>
                                <option>Hà Nội</option>
                                <option>Hồ Chí Minh</option>
                            </select>
                            {/* <select className={cx('input-wrapper')}>
                                <option>Chọn quận</option>
                                <option>Cầu Giấy</option>
                                <option>Bắc Từ Liêm</option>
                            </select>
                            <select className={cx('input-wrapper')}>
                                <option>Chọn đường</option>
                                <option>Phạm Văn Đồng</option>
                                <option>Hoàng Quốc Việt</option>
                            </select> */}
                        </div>

                        <div className={cx('location')}>
                            <ul className={cx('location-list')}>
                                <li className={cx('location-item')}>
                                    <div className={cx('location-info')}>
                                        <h3 className={cx('location-header')}>
                                            Bưu cục Cổ Nhuế 1 - HNI
                                        </h3>
                                        <p className={cx('info-detail')}>
                                            <FontAwesomeIcon className={cx('info-icon')} icon={faLocationDot} />
                                            46 Tăng Thiết Giáp, Cổ Nhuế 2, Bắc Từ Liêm, Hà Nội
                                        </p>
                                        <p className={cx('info-detail')}>
                                            <FontAwesomeIcon className={cx('info-icon')} icon={faPhone} />
                                            Phone: 84389339022
                                        </p>
                                        <p className={cx('info-detail')}>
                                            <FontAwesomeIcon className={cx('info-icon')} icon={faTag} />
                                            Q.BẮC TỪ LIÊM,TP.HÀ NỘI
                                        </p>
                                    </div>
                                </li>
                                <li className={cx('location-item')}>
                                    <div className={cx('location-info')}>
                                        <h3 className={cx('location-header')}>
                                            Bưu cục Cổ Nhuế 1 - HNI
                                        </h3>
                                        <p className={cx('info-detail')}>
                                            <FontAwesomeIcon className={cx('info-icon')} icon={faLocationDot} />
                                            46 Tăng Thiết Giáp, Cổ Nhuế 2, Bắc Từ Liêm, Hà Nội
                                        </p>
                                        <p className={cx('info-detail')}>
                                            <FontAwesomeIcon className={cx('info-icon')} icon={faPhone} />
                                            Phone: 84389339022
                                        </p>
                                        <p className={cx('info-detail')}>
                                            <FontAwesomeIcon className={cx('info-icon')} icon={faTag} />
                                            Q.BẮC TỪ LIÊM,TP.HÀ NỘI
                                        </p>
                                    </div>
                                </li>
                                <li className={cx('location-item')}>
                                    <div className={cx('location-info')}>
                                        <h3 className={cx('location-header')}>
                                            Bưu cục Cổ Nhuế 1 - HNI
                                        </h3>
                                        <p className={cx('info-detail')}>
                                            <FontAwesomeIcon className={cx('info-icon')} icon={faLocationDot} />
                                            46 Tăng Thiết Giáp, Cổ Nhuế 2, Bắc Từ Liêm, Hà Nội
                                        </p>
                                        <p className={cx('info-detail')}>
                                            <FontAwesomeIcon className={cx('info-icon')} icon={faPhone} />
                                            Phone: 84389339022
                                        </p>
                                        <p className={cx('info-detail')}>
                                            <FontAwesomeIcon className={cx('info-icon')} icon={faTag} />
                                            Q.BẮC TỪ LIÊM,TP.HÀ NỘI
                                        </p>
                                    </div>
                                </li>
                                <li className={cx('location-item')}>
                                    <div className={cx('location-info')}>
                                        <h3 className={cx('location-header')}>
                                            Bưu cục Cổ Nhuế 1 - HNI
                                        </h3>
                                        <p className={cx('info-detail')}>
                                            <FontAwesomeIcon className={cx('info-icon')} icon={faLocationDot} />
                                            46 Tăng Thiết Giáp, Cổ Nhuế 2, Bắc Từ Liêm, Hà Nội
                                        </p>
                                        <p className={cx('info-detail')}>
                                            <FontAwesomeIcon className={cx('info-icon')} icon={faPhone} />
                                            Phone: 84389339022
                                        </p>
                                        <p className={cx('info-detail')}>
                                            <FontAwesomeIcon className={cx('info-icon')} icon={faTag} />
                                            Q.BẮC TỪ LIÊM,TP.HÀ NỘI
                                        </p>
                                    </div>
                                </li>
                                <li className={cx('location-item')}>
                                    <div className={cx('location-info')}>
                                        <h3 className={cx('location-header')}>
                                            Bưu cục Cổ Nhuế 1 - HNI
                                        </h3>
                                        <p className={cx('info-detail')}>
                                            <FontAwesomeIcon className={cx('info-icon')} icon={faLocationDot} />
                                            46 Tăng Thiết Giáp, Cổ Nhuế 2, Bắc Từ Liêm, Hà Nội
                                        </p>
                                        <p className={cx('info-detail')}>
                                            <FontAwesomeIcon className={cx('info-icon')} icon={faPhone} />
                                            Phone: 84389339022
                                        </p>
                                        <p className={cx('info-detail')}>
                                            <FontAwesomeIcon className={cx('info-icon')} icon={faTag} />
                                            Q.BẮC TỪ LIÊM,TP.HÀ NỘI
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Office;