import classNames from 'classnames/bind';
import styles from './StationManagement.module.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPen, faPlus, faPrint, faTrash } from '@fortawesome/free-solid-svg-icons';
import config from '~/config';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
import StationForm from '~/components/Modal/components/StationForm';
import { ToastContext } from '~/components/Toast/Toast';

import * as stationService from '~/services/stationService';
import formatDate from '../../../utils/formatDate';

const cx = classNames.bind(styles);

// const STATIONS = [
//     {
//         id: 1,
//         name: 'Điểm tập kết A',
//         station_lead: {
//             leaderId: 1,
//             name: 'Nguyễn Văn B',
//         },
//         phone_number: '0987654321',
//         email: 'A@gmail.com',
//         create_date: '06/04/2003',
//         address: '234 Phạm Văn Đồng, Bắc Từ Liêm, Hà Nội',
//     },
// ]

function StationManagement() {
    const [stations, setStations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [station, setStation] = useState();

    const toast = useContext(ToastContext);

    useEffect(() => {
        stationService.getAllStation()
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    data[i].create_date = new Date(data[i].create_date);
                    data[i].create_date = formatDate(data[i].create_date.toString());
                }
                console.log(data);
                setStations(data);
            })
    }, [stations]);

    const handleEdit = (id) => {
        setShowModal(true);
        setStation(stations.find((station) => station._id === id));
    }

    const handleDelete = (id) => {
        stationService.deleteStation(id)
            .then(data => {
                console.log(data);
                if (data.success === true) {
                    toast.showSuccessToast(data.message);
                    // window.location.reload();
                } else {
                    toast.showErrorToast(data.message);
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
                    <div className={cx('content-section')}>
                        <div className={cx('card', 'table-card')}>
                            <div className={cx('table-wrapper')}>
                                <h3 className={cx('table-header')}>Điểm tập kết</h3>
                                <table className={cx('table')} rules='rows'>
                                    <thead>
                                        <tr>
                                            <th className={cx('text-align-center')}>STT</th>
                                            <th>Tên</th>
                                            <th>Quản lý</th>
                                            <th>Số điện thoại</th>
                                            {/* <th>Email</th> */}
                                            <th>Ngày tạo</th>
                                            <th>Địa chỉ</th>
                                            <th className={cx('text-align-center')}>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            stations.map((station, index) => {
                                                return (
                                                    <tr className={cx('data-row')} key={index}>
                                                        <td className={cx('text-align-center')}>{index + 1}</td>
                                                        <td>{station.name}</td>
                                                        <td>{station.station_lead.name}</td>
                                                        <td>{station.phone_number}</td> 
                                                        {/* <td>{station.email}</td> */}
                                                        <td>{station.create_date}</td>
                                                        <td>{station.address}</td>
                                                        <td className={cx('text-align-center')}>
                                                            <div className={cx('actions')}>
                                                                <Tippy 
                                                                    content='Sửa'
                                                                    placement='bottom'
                                                                >
                                                                    <Button className={cx('actions-btn', 'btn-green')} primary onClick={() => handleEdit(station._id)}>
                                                                        <FontAwesomeIcon className={cx('actions-icon')} icon={faPen} />
                                                                    </Button>
                                                                </Tippy>
                                                            </div>
                                                            <div className={cx('actions')}>
                                                                <Tippy 
                                                                    content='Xóa'
                                                                    placement='bottom'
                                                                >
                                                                    <Button className={cx('actions-btn')} primary onClick= {()=> handleDelete(station._id)}>
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
                        <StationForm station={station} handleCloseModal={handleCloseModal} />
                    </Modal>
                }
            </div>
        </div>
    );
}

export default StationManagement;