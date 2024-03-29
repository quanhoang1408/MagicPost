import classNames from 'classnames/bind';
import styles from './OfficeManagement.module.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
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
    }, [offices]);

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
                    // window.location.reload();
                }
                else {
                    toast.showErrorToast(data.message);
                }
        })
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
                                            <th>Tập kết</th>
                                            <th>Ngày tạo</th>
                                            <th>Địa chỉ</th>
                                            <th className={cx('text-align-center')}>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            offices.map((office, index) => {
                                                return (
                                                    <tr className={cx('data-row')} key={index}>
                                                        <td className={cx('text-align-center')}>{index + 1}</td>
                                                        <td>{office.name}</td>
                                                        <td>{office.office_lead.name}</td>
                                                        <td>{office.phone_number}</td> 
                                                        <td>{office.station_name}</td>
                                                        <td>{office.create_date}</td>
                                                        <td>{office.address}</td>
                                                        <td className={cx('text-align-center')}>
                                                            <div className={cx('actions')}>
                                                                <Tippy 
                                                                    content='Sửa'
                                                                    placement='bottom'
                                                                >
                                                                    <Button className={cx('actions-btn', 'btn-green')} primary onClick={() => handleEdit(office._id)}>
                                                                        <FontAwesomeIcon className={cx('actions-icon')} icon={faPen} />
                                                                    </Button>
                                                                </Tippy>
                                                            </div>
                                                            <div className={cx('actions')}>
                                                                <Tippy 
                                                                    content='Xóa'
                                                                    placement='bottom'
                                                                >
                                                                    <Button className={cx('actions-btn')} primary onClick={() => handleDelete(office._id)}>
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
                        <OfficeForm office={office} handleCloseModal={handleCloseModal} />
                    </Modal>
                }
            </div>
        </div>
    );
}

export default OfficeManagement;