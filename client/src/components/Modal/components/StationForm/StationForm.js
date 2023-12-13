import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './StationForm.module.scss';

import Button from '~/components/Button';
import Input from '~/components/Input';

const cx = classNames.bind(styles);

function StationForm({ station }) {
    const [name, setName] = useState(station !== undefined ? station.name : '');
    const [leaderName, setLeaderName] = useState(station !== undefined ? station.leader.name : '');
    const [createDate, setCreateDate] = useState(station !== undefined ? station.create_date.split('/').reverse().join('-') : '');
    const [city, setCity] = useState(station !== undefined ? station.address.city : '');
    const [district, setDistrict] = useState(station !== undefined ? station.address.district : '');
    const [street, setStreet] = useState(station !== undefined ? station.address.street : '');

    const [email, setEmail] = useState(station !== undefined ? station.email : '');
    const [mobile, setMobile] = useState(station !== undefined ? station.mobile : '');

    const handleSave = () => {
        
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <h2 className={cx('header')}>Thông tin điểm tập kết</h2>

                <h4 className={cx('info-header')}>Thông tin cơ bản</h4>
                <div className={cx('grid-col-2')}>
                    <div className={cx('grid-col-2-8')}>
                        <div className={cx('info-label')}>
                            <div className={cx('label')}>
                                Tên:
                            </div>
                            <div className={cx('label')}>
                                Quản lý:
                            </div>
                            <div className={cx('label')}>
                                Ngày tạo:
                            </div>
                        </div>
                        <div className={cx('info-detail')}>
                            <Input 
                                className={cx('input-wrapper')}
                                type='text' 
                                value={name}
                                placeholder='Tên nhân viên' 
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Input 
                                className={cx('input-wrapper')}
                                type='text' 
                                value={leaderName}
                                placeholder='Quản lý' 
                                onChange={(e) => setLeaderName(e.target.value)}
                            />
                            <Input 
                                className={cx('input-wrapper')}
                                type='date' 
                                value={createDate}
                                onChange={(e) => {setCreateDate(e.target.value)}}
                            />
                        </div>
                    </div>
                    <div className={cx('grid-col-2-8')}>
                        <div className={cx('info-label')}>
                            <div className={cx('label')}>
                                Thành phố:
                            </div>
                            <div className={cx('label')}>
                                Quận:
                            </div>
                            <div className={cx('label')}>
                                Đường:
                            </div>
                        </div>
                        <div className={cx('info-detail')}>
                            <Input 
                                className={cx('input-wrapper')}
                                type='text' 
                                value={city}
                                onChange={(e) => {setCity(e.target.value)}}
                            />
                            <Input 
                                className={cx('input-wrapper')}
                                type='text' 
                                value={district}
                                onChange={(e) => {setDistrict(e.target.value)}}
                            />
                            <Input 
                                className={cx('input-wrapper')}
                                type='text' 
                                value={street}
                                onChange={(e) => {setStreet(e.target.value)}}
                            />
                        </div>
                    </div>
                </div>

                <h4 className={cx('info-header')}>Thông tin liên hệ</h4>
                <div className={cx('grid-col-2')}>
                    <div className={cx('grid-col-2-8')}>
                        <div className={cx('info-label')}>
                            <div className={cx('label')}>
                                Số điện thoại:
                            </div>
                        </div>
                        <div className={cx('info-detail')}>
                            <Input 
                                className={cx('input-wrapper')}
                                type='number' 
                                value={mobile}
                                placeholder='Số điện thoại' 
                                onChange={(e) => setMobile(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={cx('grid-col-2-8')}>
                        <div className={cx('info-label')}>
                            <div className={cx('label')}>
                                Email:
                            </div>
                        </div>
                        <div className={cx('info-detail')}>
                            <Input 
                                className={cx('input-wrapper')}
                                type='email' 
                                value={email}
                                placeholder='Email' 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <Button 
                    className={cx('submit-btn')} 
                    primary
                    onClick={handleSave}
                >
                    Save
                </Button>
                
            </div>
        </div>
    );
}

export default StationForm;