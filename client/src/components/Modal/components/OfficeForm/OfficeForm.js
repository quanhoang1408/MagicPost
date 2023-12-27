import classNames from 'classnames/bind';
import { useContext, useEffect ,useState } from 'react';
import styles from './OfficeForm.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Popper from '~/components/Popper';
import { ToastContext } from '~/components/Toast/Toast';

import * as officeService from '~/services/officeService';
import * as stationService from '~/services/stationService';

const cx = classNames.bind(styles);

function OfficeForm({ office, handleCloseModal }) {
    const [name, setName] = useState(office !== undefined ? office.name : '');
    const [address, setAddress] = useState(office !== undefined ? office.address : '');
    const [mobile, setMobile] = useState(office !== undefined ? office.phone_number : '');
    const [station, setStation] = useState(office !== undefined ? office.station_name : 'Chọn điểm tập kết');
    const [station_id, setStation_id] = useState(office !== undefined ? office.station_id : '');
    const [stations, setStations] = useState([]);
    const [isActive, setIsActive] = useState(false);

    const toast = useContext(ToastContext);

    useEffect(() => {
        stationService.getAllStation()
            .then(data => {
                setStations(data);
            })
    }, []);

    const handleSelectItem = (id) => {
        setStation_id(id);
        setStation(stations.find((station) => station._id === id).name);
    }

    const handleSave = () => {
        if(office === undefined) {
            officeService.addOffice(name, address, mobile, station_id)
                .then(data => {
                    console.log(data);
                    if (data.success === true) {
                        toast.showSuccessToast("Thêm điểm giao dịch thành công");
                        // window.location.reload();
                        handleCloseModal();
                    }
                    else {
                        toast.showErrorToast(data.message);
                    }
            })
        }else{
            officeService.updateOffice(office._id, name, address, mobile, station_id)
                .then(data => {
                    console.log(data);
                    if (data.success === true) {
                        toast.showSuccessToast("Cập nhật điểm giao dịch thành công");
                        // window.location.reload();
                        handleCloseModal();
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
                            placeholder='Tên điểm giao dịch' 
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
                            <div className={cx('select-input')}>{station}</div>
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
                                            onClick={() => handleSelectItem(item._id)} 
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

export default OfficeForm;