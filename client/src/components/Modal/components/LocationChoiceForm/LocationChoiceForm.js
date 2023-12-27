import classNames from 'classnames/bind';
import { useContext, useEffect ,useState } from 'react';
import styles from './LocationChoiceForm.module.scss';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Image from '~/components/Image';
import Popper from '~/components/Popper';
import * as stationService from '~/services/stationService';
import * as officeService from '~/services/officeService';
import * as orderService from '~/services/orderService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContext } from '~/components/Toast/Toast';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function LocationChoiceForm({ order, handleCloseModal }) {
    const [type, setType] = useState('office');
    const [location, setLocation] = useState('Chọn điểm giao dịch')
    const [offices, setOffices] = useState([]);
    const [stations, setStations] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [isToStation, setIsToStation] = useState();
    const [locationId, setLocationId] = useState();
    const toast = useContext(ToastContext);


    function notSameStation(station) {
        return station._id !== order.stations[0].station_id;
    }

    function notSameOffice(office) {
        return office._id !== order.start_office.office_id;
    }
    
    function officeOfLastStation(office) {
        return office.station === order.stations[order.stations.length - 1].station_id;
    }

    useEffect(() => {
        stationService.getAllStation()
            .then((res) => {
                let newStations = []
                newStations = res.filter(notSameStation);
                setStations(newStations);
            }
        )
    }, [stations]);

    useEffect(() => {
        officeService.getAllOffice()
            .then((res) => {
                let newOffices = []
                newOffices = res.filter(officeOfLastStation).filter(notSameOffice);
                setOffices(newOffices);
            }
        )
    }, [offices]);

    const handleSelectItem = (id) => {
        if (type === 'office') {
            const item = offices.find((office) => (office._id === id));
            setLocation(item.name);
            setLocationId(item._id);
            setIsToStation(false);
        } else if (type === 'station') {
            const item = stations.find((station) => (station._id === id));
            setLocation(item.name);
            setLocationId(item._id);
            setIsToStation(true);
        }
    }
    
    const handleSave = () => {
        orderService.forward(order._id, locationId, isToStation).then((res) => {
            console.log(res);
            toast.showSuccessToast('Chuyển tiếp thành công');
        })
        handleCloseModal();
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <h2 className={cx('header')}>Chọn điểm gửi</h2>
                
                {/* <h4 className={cx('info-header')}>Thông tin cơ bản</h4> */}
                <div className={cx('grid-col-2-8')}>
                    <div className={cx('info-label')}>
                        <div className={cx('label')}>
                            Gửi đến:
                        </div>
                        <div className={cx('label')}>
                            Điểm đến:
                        </div>
                    </div>
                    <div className={cx('info-detail')}>
                        <div className={cx('radio-wrapper')}>
                            <input 
                                className={cx('input-radio')}
                                id='location-choice-form-location-office'
                                type='radio' 
                                checked={type.toLowerCase() === 'office'}
                                onChange={() => {
                                    setType('office');
                                    setLocation('Chọn điểm giao dịch');
                                }}
                            />
                            <label className={cx('label')} htmlFor='location-choice-form-location-office'>
                                Điểm giao dịch
                            </label>
                            <input 
                                className={cx('input-radio')}
                                id='location-choice-form-location-station'
                                type='radio' 
                                checked={type.toLocaleLowerCase() === 'station'}
                                onChange={() => {
                                    setType('station');
                                    setLocation('Chọn điểm tập kết');
                                }}
                            />
                            <label className={cx('label')} htmlFor='location-choice-form-location-station'>
                                Điểm tập kết
                            </label>
                        </div>
                        {(type.toLocaleLowerCase() === 'office') ? (
                            <div 
                                className={cx('input-wrapper', 'select-wrapper')}
                                onClick={() => setIsActive(!isActive)}
                            >
                                <div className={cx('select-input')}>{location}</div>
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
                                        {offices.map((item, index) => (
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
                        ) : (
                            <div 
                                className={cx('input-wrapper', 'select-wrapper')}
                                onClick={() => setIsActive(!isActive)}
                            >
                                <div className={cx('select-input')}>{location}</div>
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
                        )}
                        
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

export default LocationChoiceForm;