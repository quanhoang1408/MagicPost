import classNames from 'classnames/bind';
import styles from './Contact.module.scss';

import Button from '~/components/Button';
import Input from '~/components/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Contact() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h3 className={cx('header')}>Liên hệ</h3>

                <div className={cx('content')}>
                    <div className={cx('content-section')}>
                        <div className={cx('content-sub-section')}>
                            <h3 className={cx('content-header')}>Tổng Công ty Cổ phần Bưu chính Magic Post</h3>
                            <p className={cx('content-info')}>
                                <FontAwesomeIcon className={cx('content-icon')} icon={faLocationDot} />
                                <span><strong>Trụ sở chính: </strong></span>
                                <span>Km2. Đại lộ Thăng Long, phường Mễ Trì, quận Nam Từ Liêm, TP. Hà Nội</span>
                            </p>
                            <p className={cx('content-info')}>
                                <FontAwesomeIcon className={cx('content-icon')} icon={faPhone} />
                                <span><strong>Số điện thoại liên hệ: </strong></span>
                                <span>19008095</span>
                            </p>
                            <p className={cx('content-info')}>
                                <FontAwesomeIcon className={cx('content-icon')} icon={faEnvelope} />
                                <span><strong>Email: </strong></span>
                                <span>cskh@magicpost.com.vn</span>
                            </p>
                            <p className={cx('content-info')}>
                                <FontAwesomeIcon className={cx('content-icon')} icon={faEarthAsia} />
                                <span><strong>Website: </strong></span>
                                <span>magicpost.com.vn</span>
                            </p>
                        </div>

                        <div className={cx('content-sub-section')}>
                            <h3 className={cx('content-header')}>Hợp tác kinh doanh</h3>
                            <p className={cx('content-info')}>
                                <FontAwesomeIcon className={cx('content-icon')} icon={faPhone} />
                                <span><strong>Hotline: </strong></span>
                                <span>19008095</span>
                            </p>
                            <p className={cx('content-info')}>
                                <FontAwesomeIcon className={cx('content-icon')} icon={faEnvelope} />
                                <span><strong>Email: </strong></span>
                                <span>kinhdoanh@magicpost.com.vn</span>
                            </p>
                        </div>
                    </div>
                    <div className={cx('content-section')}>
                        <h3 className={cx('content-header')}>Liên hệ ngay với Magic Post</h3>
                        <div className={cx('form')}>
                            <div className={cx('input-group')}>
                                <Input type='text' placeholder='Tên của bạn' />
                                <Input type='text' placeholder='Email của bạn' />
                            </div>
                            <div className={cx('input-wrapper')}>
                                <textarea className={cx('input', 'textarea')} placeholder='Tin nhắn' rows='5' />
                            </div>
                            <Button className={cx('submit-btn')} primary large>Gửi yêu cầu</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;