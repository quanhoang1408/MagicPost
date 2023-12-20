import classNames from 'classnames/bind';
import styles from './OfficeEmployeeManagement.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
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
        name: 'Nguyễn Văn C',
        birthday: '06/04/2003',
        gender: 'nữ',
        mobile: '0987654321',
        role: 'Nhân viên điểm giao dịch',
        work_place_name: 'Toà nhà Magic Post, 144 Xuân Thủy, Cầu Giấy, Hà Nội',
        address: '234 Phạm Văn Đồng, Bắc Từ Liêm, Hà Nội',
        email: 'c@gmail.com',
        password: '111111',
        avatar: '',
        joiningDate: '08/08/2016',
    },
]

function OfficeEmployeesManagement() {
    const [employees, setEmployees] = useState(EMPLOYEES);
    const [showModal, setShowModal] = useState(false);
    const [employee, setEmployee] = useState();

    const handleEdit = (id) => {
        setShowModal(true);
        setEmployee(employees.find((employee) => employee.id === parseInt(id)));
    }

    const handleDelete = () => {

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
                            <h3 className={cx('header')}>Quản lý nhân viên</h3>
                        </li>
                        <li className={cx('breadcrumb-item')}>
                            <Link to={config.routes.manage}>
                                <FontAwesomeIcon className={cx('breadcrumb-icon')} icon={faHouse} />
                                Trang chủ
                            </Link>
                        </li>
                        <li className={cx('breadcrumb-item')}>
                            Quản lý nhân viên
                        </li>
                    </ul>
                </div>
                
                <div className={cx('content')}>
                    <div className={cx('content-section')}>
                        <div className={cx('table-wrapper')}>
                            <h3 className={cx('table-header')}>Nhân viên</h3>
                            <table className={cx('table')} rules='rows'>
                                <thead>
                                    <tr>
                                        <th className={cx('text-align-center')}>STT</th>
                                        <th>Tên</th>
                                        <th>Chức vụ</th>
                                        {/* <th>Số điện thoại</th> */}
                                        <th>Email</th>
                                        <th>Cơ quan</th>
                                        {/* <th>Ngày gia nhập</th> */}
                                        <th className={cx('text-align-center')}>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        employees.map((employee, index) => {
                                            return (
                                                <tr className={cx('data-row')} key={employee.id}>
                                                    <td className={cx('text-align-center')}>{index + 1}</td>
                                                    <td>{employee.name}</td>
                                                    <td>{employee.role}</td>
                                                    {/* <td>{employee.mobile}</td> */}
                                                    <td>{employee.email}</td>
                                                    {/* <td>{employee.joiningDate}</td> */}
                                                    <td>{employee.work_place_name}</td>
                                                    <td className={cx('text-align-center')}>
                                                        <div className={cx('actions')}>
                                                            <Tippy 
                                                                content='Sửa'
                                                                placement='bottom'
                                                            >
                                                                <Button className={cx('actions-btn', 'btn-green')} primary onClick={() => handleEdit(employee.id)}>
                                                                    <FontAwesomeIcon className={cx('actions-icon')} icon={faPen} />
                                                                </Button>
                                                            </Tippy>
                                                        </div>
                                                        <div className={cx('actions')}>
                                                            <Tippy 
                                                                content='Xóa'
                                                                placement='bottom'
                                                            >
                                                                <Button className={cx('actions-btn')} primary onClick={handleDelete}>
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
                        <EmployeeForm employee={employee} employeeRole='Nhân viên điểm giao dịch' />
                    </Modal>
                }
            </div>
        </div>
    );
}

export default OfficeEmployeesManagement;