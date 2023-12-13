import classNames from "classnames/bind";
import styles from './ResearchLocation.module.scss';

import Button from '~/components/Button';
import Input from '~/components/Input';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDisplay, faLocationDot, faPhone, faSearch, faTag } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function ResearchLocation() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('search')}>
                    <Input 
                        className={cx('search-input')}
                        type='text'
                        placeholder='Nhập địa chỉ cần tìm'
                    />
                    {/* <Button className={cx('search-btn')} primary>
                        <FontAwesomeIcon icon={faSearch} />
                    </Button> */}
                </div>

                <div className={cx('content')}>
                    <div className={cx('content-section')}>
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
                                <div className={cx('location-path')}>
                                    <Button className={cx('location-btn')}>
                                        <FontAwesomeIcon className={cx('path-icon')} icon={faDisplay} />
                                        Chỉ đường
                                    </Button>
                                    <p className={cx('location-distance')}>
                                        Khoảng cách 545 m
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
                                <div className={cx('location-path')}>
                                    <Button className={cx('location-btn')}>
                                        <FontAwesomeIcon className={cx('path-icon')} icon={faDisplay} />
                                        Chỉ đường
                                    </Button>
                                    <p className={cx('location-distance')}>
                                        Khoảng cách 545 m
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
                                <div className={cx('location-path')}>
                                    <Button className={cx('location-btn')}>
                                        <FontAwesomeIcon className={cx('path-icon')} icon={faDisplay} />
                                        Chỉ đường
                                    </Button>
                                    <p className={cx('location-distance')}>
                                        Khoảng cách 545 m
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
                                <div className={cx('location-path')}>
                                    <Button className={cx('location-btn')}>
                                        <FontAwesomeIcon className={cx('path-icon')} icon={faDisplay} />
                                        Chỉ đường
                                    </Button>
                                    <p className={cx('location-distance')}>
                                        Khoảng cách 545 m
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
                                <div className={cx('location-path')}>
                                    <Button className={cx('location-btn')}>
                                        <FontAwesomeIcon className={cx('path-icon')} icon={faDisplay} />
                                        Chỉ đường
                                    </Button>
                                    <p className={cx('location-distance')}>
                                        Khoảng cách 545 m
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className={cx('content-section')}>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResearchLocation;