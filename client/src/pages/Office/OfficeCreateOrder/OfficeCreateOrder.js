import classNames from 'classnames/bind';
import styles from './OfficeCreateOrder.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPen, faPlus, faPrint, faTrash } from '@fortawesome/free-solid-svg-icons';
import config from '~/config';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
import OrderForm from '~/components/Modal/components/OrderForm';
import * as orderService from '~/services/orderService';
import formatDate from '~/utils/formatDate';

const cx = classNames.bind(styles);

function OfficeCreateOrder() {
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [order, setOrder] = useState();

    useEffect(() => {
        orderService.getOrdersCreated().then((res) => {
            // console.log(res);
            setOrders(res);
        })
    }, [orders]);

    const handleEdit = (id) => {
        setShowModal(true);
        console.log(orders.find((order) => (order._id === id)));
        setOrder(orders.find((order) => (order._id === id)));
    }

    const handlePrint = () => {

    }

    const handleAdd = () => {
        setShowModal(true);
        setOrder();
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
                            <h3 className={cx('header')}>Tạo đơn hàng</h3>
                        </li>
                        <li className={cx('breadcrumb-item')}>
                            <Link to={config.routes.manage}>
                                <FontAwesomeIcon className={cx('breadcrumb-icon')} icon={faHouse} />
                                Trang chủ
                            </Link>
                        </li>
                        <li className={cx('breadcrumb-item')}>
                            Tạo đơn hàng
                        </li>
                    </ul>
                </div>
                
                <div className={cx('content')}>
                    <div className={cx('content-section')}>
                        <div className={cx('card', 'table-card')}>
                            <div className={cx('table-wrapper')}>
                                <h3 className={cx('table-header')}>Đơn hàng tạo</h3>
                                <table className={cx('table')} rules='rows'>
                                    <thead>
                                        <tr>
                                            <th className={cx('text-align-center')}>STT</th>
                                            <th>Tên</th>
                                            <th>Từ</th>
                                            <th>Loại</th>
                                            <th>Thời gian</th>
                                            <th>Đến</th>
                                            <th>Người thêm</th>
                                            <th className={cx('text-align-center')}>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orders.map((order, index) => {
                                                return (
                                                    <tr className={cx('data-row')} key={index}>
                                                        <td className={cx('text-align-center')}>{index + 1}</td>
                                                        <td>{order.contents}</td>
                                                        <td>{order.sender.address}</td>
                                                        <td>{order.category}</td>
                                                        <td>{formatDate(order.start_office.send_time)}</td>
                                                        <td>{order.receiver.address}</td>
                                                        <td>{order.staff_name}</td>
                                                        <td className={cx('text-align-center')}>
                                                            <div className={cx('actions')}>
                                                                <Tippy 
                                                                    content='Sửa'
                                                                    placement='bottom'
                                                                >
                                                                    <Button className={cx('actions-btn', 'btn-green')} primary onClick={() => handleEdit(order._id)}>
                                                                        <FontAwesomeIcon className={cx('actions-icon')} icon={faPen} />
                                                                    </Button>
                                                                </Tippy>
                                                            </div>
                                                            <div className={cx('actions')}>
                                                                <Link to={config.routes.print}>
                                                                    <Tippy 
                                                                        content='In'
                                                                        placement='bottom'
                                                                    >
                                                                        <Button className={cx('actions-btn', 'btn-yellow')} primary onClick={handlePrint}>
                                                                            <FontAwesomeIcon className={cx('actions-icon')} icon={faPrint} />
                                                                        </Button>
                                                                    </Tippy>
                                                                </Link>
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
                        <OrderForm order={order} handleCloseModal={handleCloseModal} />
                    </Modal>
                }
            </div>
        </div>
    );
}

export default OfficeCreateOrder;