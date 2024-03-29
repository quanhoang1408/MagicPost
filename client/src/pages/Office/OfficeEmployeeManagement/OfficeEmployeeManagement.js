import classNames from 'classnames/bind';
import styles from './OfficeEmployeeManagement.module.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faKey, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import config from '~/config';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Button from '~/components/Button';
import { ToastContext } from '~/components/Toast/Toast';
import Modal from '~/components/Modal';
import EmployeeForm from '~/components/Modal/components/EmployeeForm';
import PasswordForm from '~/components/Modal/components/PasswordForm';

import * as officeEmployeeService from '~/services/officeEmployeeService';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

function OfficeEmployeesManagement() {
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [employee, setEmployee] = useState();
    const [workplace, setWorkplace] = useState();
    const [showPassModal, setShowPassModal] = useState(false);

    const toast = useContext(ToastContext);

    useEffect(()=> {
        officeEmployeeService.getAllOfficeEmployee()
            .then(data => {
                console.log(data);
                setEmployees(data);
            })
        userService.getUserById()
            .then(data => {
                setWorkplace(data.work_place);
            })
    }, [employees]);

    console.log(workplace);

    const handleEdit = (id) => {
        setShowModal(true);
        setShowPassModal(false);
        setEmployee(employees.find((employee) => employee._id === id));
    }

    const handleDelete = (id) => {
        officeEmployeeService.deleteOfficeEmployee(id)
            .then(data => {
                if(data.success === true) {
                    // window.location.reload();
                    toast.showSuccessToast("Xóa nhân viên thành công");
                }
            }
        )
    }

    const handleChangePassword = (id) => {
        setShowModal(false);
        setShowPassModal(true);
        setEmployee(employees.find((employee) => employee._id === id));
    }

    const handleAdd = () => {
        setShowModal(true);
        setShowPassModal(false);
        setEmployee();
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setShowPassModal(false);
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
                                                <tr className={cx('data-row')} key={index}>
                                                    <td className={cx('text-align-center')}>{index + 1}</td>
                                                    <td>{employee.name}</td>
                                                    <td>Nhân viên điểm giao dịch</td>
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
                                                                <Button className={cx('actions-btn', 'btn-green')} primary onClick={() => handleEdit(employee._id)}>
                                                                    <FontAwesomeIcon className={cx('actions-icon')} icon={faPen} />
                                                                </Button>
                                                            </Tippy>
                                                        </div>
                                                        <div className={cx('actions')}>
                                                            <Tippy 
                                                                content='Xóa'
                                                                placement='bottom'
                                                            >
                                                                <Button className={cx('actions-btn')} primary onClick={() => handleDelete(employee._id)}>
                                                                    <FontAwesomeIcon className={cx('actions-icon')} icon={faTrash} />
                                                                </Button>
                                                            </Tippy>
                                                        </div>
                                                        <div className={cx('actions')}>
                                                            <Tippy 
                                                                content='Đổi mật khẩu'
                                                                placement='bottom'
                                                            >
                                                                <Button className={cx('actions-btn', 'btn-yellow')} primary onClick={()=> handleChangePassword(employee._id)}>
                                                                    <FontAwesomeIcon className={cx('actions-icon')} icon={faKey} />
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
                        <EmployeeForm employee={employee} employeeRole='Nhân viên điểm giao dịch' workplace={workplace} handleCloseModal={handleCloseModal} />
                    </Modal>
                }
                {showPassModal &&
                    <Modal className={cx('password-modal')} onClose={handleCloseModal}>
                        <PasswordForm employee={employee} handleCloseModal={handleCloseModal} />
                    </Modal>
                }
            </div>
        </div>
    );
}

export default OfficeEmployeesManagement;