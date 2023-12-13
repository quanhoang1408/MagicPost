import classNames from "classnames/bind";
import styles from './Profile.module.scss';

import Image from '~/components/Image';
import Button from '~/components/Button';
import Input from '~/components/Input';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(styles);

function Profile() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('content-section')}>
                        <div className={cx('user-info-wrapper')}>
                            <Image 
                                className={cx('user-image')}
                                src=''
                                alt='username'
                            />
                            <div className={cx('user-info')}>
                                <div>
                                    <h3 className={cx('user-name')}>
                                        Nguyễn Hà Hoàng Anh
                                    </h3>
                                    <h4 className={cx('user-role')}>
                                        Chủ tịch
                                    </h4>
                                </div>
                                <Button
                                    className={cx('edit-btn')}
                                    leftIcon={<FontAwesomeIcon className={cx('edit-icon')} icon={faPenToSquare} />}
                                >
                                    Sửa hồ sơ
                                </Button>
                            </div>
                        </div>
                        <div className={cx('user-detail')}>
                            <h4 className={cx('info-header')}>Thông tin liên hệ</h4>
                            <div className={cx('info-wrapper')}>
                                <div className={cx('info-label')}>
                                    <div className={cx('info-data')}>
                                        Số điện thoại:
                                    </div>
                                    <div className={cx('info-data')}>
                                        Email:
                                    </div>
                                    <div className={cx('info-data')}>
                                        Địa chỉ:
                                    </div>
                                    <div className={cx('info-data')}>
                                        Cơ quan:
                                    </div>
                                </div>
                                <div className={cx('info-detail')}>
                                    <div className={cx('info-data')}>
                                        0987654321
                                    </div>
                                    <div className={cx('info-data')}>
                                        hoanganh@gmail.com
                                    </div>
                                    <div className={cx('info-data')}>
                                        234 Phạm Văn Đồng, Bắc Từ Liêm, Hà Nội
                                    </div>
                                    <div className={cx('info-data')}>
                                        Toà nhà Magic Post, 144 Xuân Thủy, Cầu Giấy, Hà Nội
                                    </div>
                                </div>
                            </div>

                            <h4 className={cx('info-header')}>Thông tin cơ bản</h4>
                            <div className={cx('info-wrapper')}>
                                <div className={cx('info-label')}>
                                    <div className={cx('info-data')}>
                                        Ngày sinh:
                                    </div>
                                    <div className={cx('info-data')}>
                                        Giới tính:
                                    </div>
                                    <div className={cx('info-data')}>
                                        Ngày tham gia:
                                    </div>
                                </div>
                                <div className={cx('info-detail')}>
                                    <div className={cx('info-data')}>
                                        06/04/2003
                                    </div>
                                    <div className={cx('info-data')}>
                                        Nam
                                    </div>
                                    <div className={cx('info-data')}>
                                        08/08/20016
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;