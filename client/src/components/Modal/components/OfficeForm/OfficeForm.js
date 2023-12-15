import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './OfficeForm.module.scss';

import Button from '~/components/Button';
import Input from '~/components/Input';

const cx = classNames.bind(styles);

function OfficeForm({ office }) {
    const [name, setName] = useState(office !== undefined ? office.name : '');
    const [address, setAddress] = useState(office !== undefined ? office.address : '');
    const [mobile, setMobile] = useState(office !== undefined ? office.phone_number : '');

    const handleSave = () => {
        
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <h2 className={cx('header')}>Thông tin điểm tập kết</h2>

                <h4 className={cx('info-header')}>Thông tin cơ bản</h4>
                <div className={cx('grid-col-2-8')}>
                    <div className={cx('info-label')}>
                        <div className={cx('label')}>
                            Tên:
                        </div>
                        <div className={cx('label')}>
                            Địa chỉ:
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
                            value={address}
                            placeholder='Địa chỉ'
                            onChange={(e) => {setAddress(e.target.value)}}
                        />
                    </div>
                </div>

                <h4 className={cx('info-header')}>Thông tin liên hệ</h4>
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