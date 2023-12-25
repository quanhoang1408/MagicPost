import classNames from 'classnames/bind';
import styles from './StationLeaderManagement.module.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import config from '~/config';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
import EmployeeForm from '~/components/Modal/components/EmployeeForm';
import { ToastContext } from '~/components/Toast/Toast';

import * as stationLeadService from '~/services/stationLeadService';
import * as stationService from '~/services/stationService';
// import { set } from 'mongoose';

const cx = classNames.bind(styles);

function StationLeaderManagement() {
    const [stationLeads, setStationLeads] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [employee, setEmployee] = useState();

    const toast = useContext(ToastContext);

    useEffect(() => {
        stationLeadService.getAllStationLeads()
            .then(data => {
                setStationLeads(data);
            })
    }, []);

    const handleEdit = (id) => {
        setShowModal(true);
        setEmployee(stationLeads.find((employee) => employee._id === id));
    }

    const handleDelete = (id) => {
        stationLeadService.deleteStationLead(id)
            .then(data => {
                if(data.success === true) {
                    toast.showSuccessToast("Xóa trưởng điểm thành công");
                    window.location.reload();
                }
                else {
                    toast.showErrorToast(data.message);
                }
            }
        )
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
                            <h3 className={cx('header')}>Quản lý trưởng điểm tập kết</h3>
                        </li>
                        <li className={cx('breadcrumb-item')}>
                            <Link to={config.routes.boss}>
                                <FontAwesomeIcon className={cx('breadcrumb-icon')} icon={faHouse} />
                                Trang chủ
                            </Link>
                        </li>
                        <li className={cx('breadcrumb-item')}>
                            Quản lý trưởng điểm
                        </li>
                        <li className={cx('breadcrumb-item')}>
                            Quản lý trưởng điểm tập kết
                        </li>
                    </ul>
                </div>
                
                <div className={cx('content')}>
                    <div className={cx('content-section')}>
                        <div className={cx('table-wrapper')}>
                            <h3 className={cx('table-header')}>Trưởng điểm tập kết</h3>
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
                                        stationLeads.map((station_lead, index) => {
                                            return (
                                                <tr className={cx('data-row')} key={station_lead._id}>
                                                    <td className={cx('text-align-center')}>{index + 1}</td>
                                                    <td>{station_lead.name}</td>
                                                    <td>Trưởng điểm tập kết</td>
                                                    {/* <td>{employee.mobile}</td> */}
                                                    <td>{station_lead.email}</td>
                                                    <td>{station_lead.work_place_name}</td>
                                                    {/* <td>{employee.joiningDate}</td> */}
                                                    <td className={cx('text-align-center')}>
                                                        <div className={cx('actions')}>
                                                            <Tippy 
                                                                content='Sửa'
                                                                placement='bottom'
                                                            >
                                                                <Button className={cx('actions-btn', 'btn-green')} primary onClick={() => handleEdit(station_lead._id)}>
                                                                    <FontAwesomeIcon className={cx('actions-icon')} icon={faPen} />
                                                                </Button>
                                                            </Tippy>
                                                        </div>
                                                        <div className={cx('actions')}>
                                                            <Tippy 
                                                                content='Xóa'
                                                                placement='bottom'
                                                            >
                                                                <Button className={cx('actions-btn')} primary onClick={() => handleDelete(station_lead._id)}>
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
                        <EmployeeForm employee={employee} employeeRole='Trưởng điểm tập kết'/>
                    </Modal>
                }
            </div>
        </div>
    );
}

export default StationLeaderManagement;