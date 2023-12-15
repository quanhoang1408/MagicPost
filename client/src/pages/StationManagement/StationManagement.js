import classNames from 'classnames/bind';
import styles from './StationManagement.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPenToSquare, faPlus, faPrint, faTrash } from '@fortawesome/free-solid-svg-icons';
import config from '~/config';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
import StationForm from '~/components/Modal/components/StationForm';
import * as stationService from '~/services/stationService';
import formatDate from '../../utils/formatDate';

const cx = classNames.bind(styles);

// const STATIONS = [
//     {
//         id: 1,
//         name: 'Điểm tập kết A',
//         leader: {
//             leaderId: 1,
//             name: 'Nguyễn Văn B',
//         },
//         mobile: '0987654321',
//         email: 'A@gmail.com',
//         create_date: '06/04/2003',
//         address: {
//             city: 'Hà Nội',
//             district: 'Bắc Từ Liêm',
//             street: '234 Phạm Văn Đồng',
//         },
//     },
// ]

function StationManagement() {
    const [stations, setStations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [station, setStation] = useState();

    useEffect(() => {
        stationService.getAllStation()
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    data[i].create_date = new Date(data[i].create_date);
                    data[i].create_date = formatDate(data[i].create_date.toString());
                }
                setStations(data);
            })
    }, []);

    const handleEdit = (id) => {
        setShowModal(true);
        setStation(stations.find((station) => station.id === parseInt(id)));
    }

    const handleDelete = (id) => {
        stationService.deleteStation(id)
            .then(data => {
                console.log(data);
                if (data.success === true) {
                    alert(data.message);
                    window.location.reload();
                } else {
                    alert(data.message);
                }
            })
    }

    const handleAdd = () => {
        setShowModal(true);
        setStation();
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header-wrapper')}>
                    <ul className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}>
                            <h3 className={cx('header')}>Quản lý điểm tập kết</h3>
                        </li>
                        <li className={cx('breadcrumb-item')}>
                            <Link to={config.routes.manage}>
                                <FontAwesomeIcon className={cx('breadcrumb-icon')} icon={faHouse} />
                                Trang chủ
                            </Link>
                        </li>
                        <li className={cx('breadcrumb-item')}>
                            Quản lý điểm
                        </li>
                        <li className={cx('breadcrumb-item')}>
                            Điểm tập kết
                        </li>
                    </ul>
                </div>
                
                <div className={cx('content')}>
                    <div className={cx('content-section', 'grid-col-4')}>
                        <div className={cx('card', 'info-card', 'bg-purple')}>
                            <div className={cx('info-wrapper')}>
                                <h3 className={cx('info-header')}>Miền Bắc</h3>
                                <h2 className={cx('info-number')}>0</h2>
                            </div>
                        </div>
                        <div className={cx('card', 'info-card', 'bg-blue')}>
                            <div className={cx('info-wrapper')}>
                                <h3 className={cx('info-header')}>Miền Trung</h3>
                                <h2 className={cx('info-number')}>0</h2>
                            </div>
                        </div>
                        <div className={cx('card', 'info-card', 'bg-green')}>
                            <div className={cx('info-wrapper')}>
                                <h3 className={cx('info-header')}>Miền Nam</h3>
                                <h2 className={cx('info-number')}>3</h2>
                            </div>
                        </div>
                        <div className={cx('card', 'info-card', 'bg-orange')}>
                            <div className={cx('info-wrapper')}>
                                <h3 className={cx('info-header')}>Tổng số điểm</h3>
                                <h2 className={cx('info-number')}>3</h2>
                            </div>
                        </div>
                    </div>

                    <div className={cx('content-section')}>
                        <div className={cx('card', 'table-card')}>
                            <div className={cx('table-wrapper')}>
                                <h3 className={cx('table-header')}>Điểm tập kết</h3>
                                <table className={cx('table')} rules='rows'>
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Tên</th>
                                            <th>Quản lý</th>
                                            <th>Số điện thoại</th>
                                            {/* <th>Email</th> */}
                                            <th>Ngày thêm</th>
                                            <th>Địa chỉ</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            stations.map((station, index) => {
                                                // const address = `${station.address.street}, ${station.address.district}, ${station.address.city}`
                                                return (
                                                    <tr className={cx('data-row')} key={station.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{station.name}</td>
                                                        <td>{station.station_lead.name}</td>
                                                        <td>{station.phone_number}</td> 
                                                        {/* <td>{station.email}</td> */}
                                                        <td>{station.create_date}</td>
                                                        <td>{station.address}</td>
                                                        <td>
                                                            <div className={cx('actions')}>
                                                                <Tippy 
                                                                    content='Sửa'
                                                                    placement='bottom'
                                                                >
                                                                    <Button className={cx('actions-btn')} outline onClick={() => handleEdit(station._id)}>
                                                                        <FontAwesomeIcon className={cx('actions-icon')} icon={faPenToSquare} />
                                                                    </Button>
                                                                </Tippy>
                                                            </div>
                                                            <div className={cx('actions')}>
                                                                <Tippy 
                                                                    content='Xóa'
                                                                    placement='bottom'
                                                                >
                                                                    <Button className={cx('actions-btn')} outline onClick= {()=> handleDelete(station._id)}>
                                                                        <FontAwesomeIcon className={cx('actions-icon')} icon={faTrash} />
                                                                    </Button>
                                                                </Tippy>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                
                            <Button primary onClick={handleAdd} leftIcon={<FontAwesomeIcon icon={faPlus} />}>Thêm</Button>
                        </div>
                    </div>
                </div>
    
                {showModal && 
                    <Modal className={cx('modal')} onClose={handleCloseModal}>
                        <StationForm station={station} />
                    </Modal>
                }
            </div>
        </div>
    );
}

export default StationManagement;