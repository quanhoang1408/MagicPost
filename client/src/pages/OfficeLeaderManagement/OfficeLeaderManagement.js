import classNames from 'classnames/bind';
import styles from './OfficeLeaderManagement.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPenToSquare, faPlus, faPrint, faTrash } from '@fortawesome/free-solid-svg-icons';
import config from '~/config';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
import EmployeeForm from '~/components/Modal/components/EmployeeForm';

const cx = classNames.bind(styles);

const EMPLOYEES = [
    {
        id: 1,
        name: 'Nguyễn Văn B',
        birthday: '06/04/2003',
        gender: 'nữ',
        mobile: '0987654321',
        role: 'Trưởng điểm giao dịch',
        workPlace: 'Toà nhà Magic Post, 144 Xuân Thủy, Cầu Giấy, Hà Nội',
        address: '234 Phạm Văn Đồng, Bắc Từ Liêm, Hà Nội',
        email: 'b@gmail.com',
        password: '111111',
        avatar: '',
        joiningDate: '08/08/2016',
    },
]

function OfficeLeaderManagement() {
    const [employees, setEmployees] = useState(EMPLOYEES);
    const [showModal, setShowModal] = useState(false);
    const [employee, setEmployee] = useState();

    const handleEdit = (id) => {
        setShowModal(true);
        setEmployee(employees.find((employee) => employee.id === parseInt(id)));
    }

    const handleDelete = () => {

    }

    const handlePrint = () => {

    }

    const handleAdd = () => {
        setShowModal(true);
        setEmployee();
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
                            <h3 className={cx('header')}>Quản lý trưởng điểm giao dịch</h3>
                        </li>
                        <li className={cx('breadcrumb-item')}>
                            <Link to={config.routes.manage}>
                                <FontAwesomeIcon className={cx('breadcrumb-icon')} icon={faHouse} />
                                Trang chủ
                            </Link>
                        </li>
                        <li className={cx('breadcrumb-item')}>
                            Quản lý trưởng điểm
                        </li>
                        <li className={cx('breadcrumb-item')}>
                            Quản lý trưởng điểm giao dịch
                        </li>
                    </ul>
                </div>
                
                <div className={cx('content')}>
                    <div className={cx('content-section')}>
                        <div className={cx('table-wrapper')}>
                            <h3 className={cx('table-header')}>Trưởng điểm giao dịch</h3>
                            <table className={cx('table')} rules='rows'>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên</th>
                                        <th>Chức vụ</th>
                                        <th>Số điện thoại</th>
                                        <th>Email</th>
                                        <th>Ngày gia nhập</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        employees.map((employee, index) => {
                                            return (
                                                <tr className={cx('data-row')} key={employee.id}>
                                                    <td>{index + 1}</td>
                                                    <td className={cx('text-align-left')}>{employee.name}</td>
                                                    <td>{employee.role}</td>
                                                    <td>{employee.mobile}</td>
                                                    <td className={cx('text-align-left')}>{employee.email}</td>
                                                    <td className={cx('text-align-left')}>{employee.workPlace}</td>
                                                    <td>{employee.joiningDate}</td>
                                                    <td>
                                                        <div className={cx('actions')}>
                                                            <Tippy 
                                                                content='Sửa'
                                                                placement='bottom'
                                                            >
                                                                <Button className={cx('actions-btn')} outline onClick={() => handleEdit(employee.id)}>
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
    
                {showModal && 
                    <Modal className={cx('modal')} onClose={handleCloseModal}>
                        <EmployeeForm employee={employee} employeeRole='Trưởng điểm giao dịch' />
                    </Modal>
                }
            </div>
        </div>
    );
}

export default OfficeLeaderManagement;