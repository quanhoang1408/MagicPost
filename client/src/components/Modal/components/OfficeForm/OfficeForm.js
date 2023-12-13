import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './OfficeForm.module.scss';

import Button from '~/components/Button';
import Input from '~/components/Input';

const cx = classNames.bind(styles);

function OfficeForm({ office }) {
    const [name, setName] = useState(office !== undefined ? office.name : '');
    const [leaderName, setLeaderName] = useState(office !== undefined ? office.leader.name : '');
    const [createDate, setCreateDate] = useState(office !== undefined ? office.create_date.split('/').reverse().join('-') : '');
    const [city, setCity] = useState(office !== undefined ? office.address.city : '');
    const [district, setDistrict] = useState(office !== undefined ? office.address.district : '');
    const [street, setStreet] = useState(office !== undefined ? office.address.street : '');

    const [email, setEmail] = useState(office !== undefined ? office.email : '');
    const [mobile, setMobile] = useState(office !== undefined ? office.mobile : '');

    const handleSave = () => {
        
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <h2 className={cx('header')}>Thông tin điểm giao dịch</h2>

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

export default OfficeForm;