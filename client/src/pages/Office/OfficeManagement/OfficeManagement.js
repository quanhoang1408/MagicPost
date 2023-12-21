import classNames from 'classnames/bind';
import styles from './OfficeManagement.module.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPenToSquare, faPlus, faPrint, faTrash } from '@fortawesome/free-solid-svg-icons';
import config from '~/config';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
import OfficeForm from '~/components/Modal/components/OfficeForm';
import { ToastContext } from '~/components/Toast/Toast';

import * as officeService from '~/services/officeService';
import formatDate from '../../../utils/formatDate';

const cx = classNames.bind(styles);

const OFFICES = [
    {
        id: 1,
        name: 'Điểm tập kết A',
        office_lead: {
            leaderId: 1,
            name: 'Nguyễn Văn B',
        },
        phone_number: '0987654321',
        email: 'A@gmail.com',
        create_date: '06/04/2003',
        address: '234 Phạm Văn Đồng, Bắc Từ Liêm, Hà Nội',
    },
]

function OfficeManagement() {
    const [offices, setOffices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [office, setOffice] = useState();

    const toast = useContext(ToastContext);

    useEffect(() => {
        officeService.getAllOffice()
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    data[i].create_date = new Date(data[i].create_date);
                    data[i].create_date = formatDate(data[i].create_date.toString());
                }
                console.log(data);
                setOffices(data);
            })
    }, []);

    const handleEdit = (id) => {
        setShowModal(true);
        setOffice(offices.find((office) => office._id === id));
    }

    const handleDelete = (id) => {
        officeService.deleteOffice(id)
            .then(data => {
                console.log(data);
                if (data.success === true) {
                    toast.showSuccessToast(data.message);
                    window.location.reload();
                }
                else {
                    toast.showErrorToast(data.message);
                }
        })
    }

    const handlePrint = () => {

    }

    const handleAdd = () => {
        setShowModal(true);
        setOffice();
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
                            <h3 className={cx('header')}>Quản lý điểm giao dịch</h3>
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
                            Điểm giao dịch
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
                                            <th>Tập kết</th>
                                            <th>Ngày tạo</th>
                                            <th>Địa chỉ</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            offices.map((office, index) => {
                                                return (
                                                    <tr className={cx('data-row')} key={office._id}>
                                                        <td>{index + 1}</td>
                                                        <td className={cx('text-align-left')}>{office.name}</td>
                                                        <td className={cx('text-align-left')}>{office.office_lead.name}</td>
                                                        <td>{office.phone_number}</td> 
                                                        <td>{office.station_name}</td>
                                                        <td>{office.create_date}</td>
                                                        <td className={cx('text-align-left')}>{office.address}</td>
                                                        <td>
                                                            <div className={cx('actions')}>
                                                                <Tippy 
                                                                    content='Sửa'
                                                                    placement='bottom'
                                                                >
                                                                    <Button className={cx('actions-btn')} outline onClick={() => handleEdit(office._id)}>
                                                                        <FontAwesomeIcon className={cx('actions-icon')} icon={faPenToSquare} />
                                                                    </Button>
                                                                </Tippy>
                                                            </div>
                                                            <div className={cx('actions')}>
                                                                <Tippy 
                                                                    content='Xóa'
                                                                    placement='bottom'
                                                                >
                                                                    <Button className={cx('actions-btn')} outline onClick={() => handleDelete(office._id)}>
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
                        <OfficeForm office={office} />
                    </Modal>
                }
            </div>
        </div>
    );
}

export default OfficeManagement;