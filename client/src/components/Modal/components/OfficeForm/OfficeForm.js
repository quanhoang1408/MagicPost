import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './OfficeForm.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Popper from '~/components/Popper';

const cx = classNames.bind(styles);

const STATIONS = [
    {
        id: '1',
        name: 'Hà Nội',
    }, 
    {
        id: '2',
        name: 'Hồ Chí Minh',
    },
    {
        id: '3',
        name: 'Đà Nẵng',
    },
    {
        id: '4',
        name: 'Hà Nội',
    }, 
    {
        id: '5',
        name: 'Hồ Chí Minh',
    },
    {
        id: '6',
        name: 'Đà Nẵng',
    },
    {
        id: '7',
        name: 'Hà Nội',
    }, 
    {
        id: '8',
        name: 'Hồ Chí Minh',
    },
    {
        id: '9',
        name: 'Đà Nẵng',
    },
]

function OfficeForm({ office }) {
    const [name, setName] = useState(office !== undefined ? office.name : '');
    const [address, setAddress] = useState(office !== undefined ? office.address : '');
    const [mobile, setMobile] = useState(office !== undefined ? office.phone_number : '');
    const [station, setStation] = useState(office !== undefined ? office.station : 'Chọn điểm tập kết');
    const [stations, setStations] = useState(STATIONS);
    const [isActive, setIsActive] = useState(false);

    const handleSelectItem = (e) => {
        const item = e.currentTarget;
        setStation(item.textContent);
    }

    const handleSave = () => {
        
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <h2 className={cx('header')}>Thông tin điểm giao dịch</h2>

                <h4 className={cx('info-header')}>Thông tin cơ bản</h4>
                <div className={cx('grid-col-2-8')}>
                    <div className={cx('info-label')}>
                        <div className={cx('label')}>
                            Tên:
                        </div>
                        <div className={cx('label')}>
                            Địa chỉ:
                        </div>
                        <div className={cx('label')}>
                            Điểm tập kết:
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
                        <div 
                            className={cx('input-wrapper', 'select-wrapper')}
                            onClick={() => setIsActive(!isActive)}
                        >
                            {station}
                            <FontAwesomeIcon 
                                className={cx('select-icon')} 
                                icon={isActive ? faChevronUp : faChevronDown} 
                            />
                            <Popper 
                                className={cx('select-popper', 
                                    { active: isActive ? 'active' : '', })
                                }
                            >
                                <ul>
                                    {stations.map((item, index) => (
                                        <li 
                                            className={cx('select-item')}
                                            key={index}
                                            onClick={(e) => handleSelectItem(e)} 
                                        >
                                            {item.name}
                                        </li>
                                    ))}
                                </ul>
                            </Popper>
                        </div>
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