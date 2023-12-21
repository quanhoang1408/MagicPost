import classNames from 'classnames/bind';
import { useContext, useState } from 'react';
import styles from './StationForm.module.scss';

import Button from '~/components/Button';
import Input from '~/components/Input';
import { ToastContext } from '~/components/Toast/Toast';

import * as stationService from '~/services/stationService';

const cx = classNames.bind(styles);

function StationForm({ station }) {
    const [name, setName] = useState(station !== undefined ? station.name : '');
    const [address, setAddress] = useState(station !== undefined ? station.address : '');
    const [mobile, setMobile] = useState(station !== undefined ? station.phone_number : '');

    const toast = useContext(ToastContext);

    const handleSave = () => {
        if(station === undefined) {
            stationService.addStation(name, address, mobile)
                .then(data => {
                    console.log(data);
                    if (data.success === true) {
                        toast.showSuccessToast("Thêm điểm tập kết thành công");
                        window.location.reload();
                    }
                    else {
                        toast.showErrorToast(data.message);
                    }
            })
        }
        else {
            stationService.updateStation(station._id, name, address, mobile)
                .then(data => {
                    console.log(data);
                    if (data.success === true) {
                        toast.showSuccessToast("Cập nhật điểm tập kết thành công");
                        window.location.reload();
                    }
                    else {
                        toast.showErrorToast(data.message);
                    }
            })
        }
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
                            placeholder='Tên điểm tập kết' 
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
                            type='text' 
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

export default StationForm;