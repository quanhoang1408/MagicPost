import classNames from 'classnames/bind';
import styles from './OfficeManagement.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPenToSquare, faPlus, faPrint, faTrash } from '@fortawesome/free-solid-svg-icons';
import config from '~/config';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
import OfficeForm from '~/components/Modal/components/OfficeForm';

const cx = classNames.bind(styles);

const OFFICES = [
    {
        id: 1,
        name: 'Điểm giao dịch A',
        leader: {
            leaderId: 2,
            name: 'Nguyễn Văn C',
        },
        mobile: '0987654321',
        email: 'A@gmail.com',
        create_date: '06/04/2003',
        address: {
            city: 'Hà Nội',
            district: 'Bắc Từ Liêm',
            street: '234 Phạm Văn Đồng',
        },
    },
]

function OfficeManagement() {
    const [offices, setOffices] = useState(OFFICES);
    const [showModal, setShowModal] = useState(false);
    const [office, setOffice] = useState();

    const handleEdit = (id) => {
        setShowModal(true);
        setOffice(offices.find((office) => office.id === parseInt(id)));
    }

    const handleDelete = () => {

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
                                            <th>Email</th>
                                            <th>Ngày thêm</th>
                                            <th>Địa chỉ</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            offices.map((office, index) => {
                                                const address = `${office.address.street}, ${office.address.district}, ${office.address.city}`
                                                return (
                                                    <tr className={cx('data-row')} key={office.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{office.name}</td>
                                                        <td>{office.leader.name}</td>
                                                        <td>{office.mobile}</td>
                                                        <td>{office.email}</td>
                                                        <td>{office.create_date}</td>
                                                        <td>{address}</td>
                                                        <td>
                                                            <div className={cx('actions')}>
                                                                <Tippy 
                                                                    content='Sửa'
                                                                    placement='bottom'
                                                                >
                                                                    <Button className={cx('actions-btn')} outline onClick={() => handleEdit(office.id)}>
                                                                        <FontAwesomeIcon className={cx('actions-icon')} icon={faPenToSquare} />
                                                                    </Button>
                                                                </Tippy>
                                                            </div>
                                                            <div className={cx('actions')}>
                                                                <Tippy 
                                                                    content='Xóa'
                                                                    placement='bottom'
                                                                >
                                                                    <Button className={cx('actions-btn')} outline onClick={handleDelete}>
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