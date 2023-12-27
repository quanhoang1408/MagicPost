import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from './Profile.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

import Image from '~/components/Image';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
import ProfileForm from '~/components/Modal/components/ProfileForm';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

function Profile() {
    const [user, setUser] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [role, setRole] = useState('');
    
    useEffect(() => {
        userService.getUserById()
            .then(data => {
                setUser(data);
            })
    }, [user]);

    useEffect(() => {
        if (user && user.role) {
            if (user.role === 'boss') {
                setRole('Lãnh đạo');
            } else if (user.role === 'station_lead') {
                setRole('Trưởng điểm tập kết');
            } else if (user.role === 'office_lead') {
                setRole('Trưởng điểm giao dịch');
            } else if (user.role === 'station_staff') {
                setRole('Nhân viên điểm tập kết');
            } else if (user.role === 'office_staff') {
                setRole('Nhân viên điểm giao dịch');
            }
        }
    }, [role, user])

    console.log(user);
    const handleOpenModal = () => {
        
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('content-section')}>
                        <div className={cx('user-info-wrapper')}>
                            <Image 
                                className={cx('user-image')}
                                src={''}
                                alt={user.name}
                            />
                            <div className={cx('user-info')}>
                                <div>
                                    <h3 className={cx('user-name')}>
                                        {user.name}
                                    </h3>
                                    <h4 className={cx('user-role')}>
                                        {role}
                                    </h4>
                                </div>
                                <Button
                                    className={cx('edit-btn')}
                                    leftIcon={<FontAwesomeIcon className={cx('edit-icon')} icon={faPenToSquare} />}
                                    onClick={handleOpenModal}
                                >
                                    Sửa hồ sơ
                                </Button>
                            </div>
                        </div>
                        <div className={cx('user-detail')}>
                            <h4 className={cx('info-header')}>Thông tin liên hệ</h4>
                            <div className={cx('info-wrapper')}>
                                <div className={cx('grid-col-2-8')}>
                                    <div className={cx('info-data')}>Số điện thoại:</div>
                                    <div className={cx('info-data')}>
                                        {user.phone_number}
                                    </div>
                                </div>
                                <div className={cx('grid-col-2-8')}>
                                    <div className={cx('info-data')}>Email:</div>
                                    <div className={cx('info-data')}>
                                        {user.email}
                                    </div>
                                </div>
                                <div className={cx('grid-col-2-8')}>
                                    <div className={cx('info-data')}>Cơ quan:</div>
                                    <div className={cx('info-data')}>
                                        {user.work_place_name}
                                    </div>
                                </div>
                            </div>

                            <h4 className={cx('info-header')}>Thông tin cơ bản</h4>
                            <div className={cx('info-wrapper')}>
                                <div className={cx('grid-col-2-8')}>
                                    <div className={cx('info-data')}>Giới tính:</div>
                                    <div className={cx('info-data')}>
                                        {(user.sex === 'M') ? ('Nam') : ('Nữ')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal &&
                <Modal className={cx('modal')} onClose={handleCloseModal}>
                    <ProfileForm data={user} handleCloseModal={handleCloseModal} />
                </Modal>
            }
        </div>
    );
}

export default Profile;