import classNames from 'classnames/bind';
import styles from './Customer.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHouse, faXmark } from '@fortawesome/free-solid-svg-icons';
import config from '~/config';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
import OrderForm from '~/components/Modal/components/OrderForm';

const cx = classNames.bind(styles);

const ORDERS = [
    {
        id: 1,
        name: 'Product 1',
        from: {
            name: 'Nguyen Van A',
            address: 'Ho Chi Minh',
            phoneNumber: '0123456789',
            postalCode: '10179',
        },
        type: 'Tài liệu',
        date: {
            time: '07h52',
            date: '18/10/2023',
        },
        to: {
            name: 'Nguyen Van B',
            address: 'Da Nang',
            phoneNumber: '0987654321',
            postalCode: '10179',
        },
        price: {
            main: 9500,
            sub: 1900,
            GTGT: 0,
        },
        weight: 30,
        status: 'Đã đến',
    },{
        id: 2,
        name: 'Product 2',
        from: {
            name: 'Nguyen Van C',
            address: 'Ho Chi Minh',
            phoneNumber: '0123456789',
            postalCode: '10179',
        },
        type: 'Hàng hóa',
        date: {
            time: '07h52',
            date: '18/10/2023',
        },
        to: {
            name: 'Nguyen Van D',
            address: 'Da Nang',
            phoneNumber: '0987654321',
            postalCode: '10179',
        },
        price: {
            main: 9500,
            sub: 1900,
            GTGT: 0,
        },
        weight: 30,
        status: 'Đang chuyển',
    },{
        id: 3,
        name: 'Product 3',
        from: {
            name: 'Nguyen Van E',
            address: 'Ho Chi Minh',
            phoneNumber: '0123456789',
            postalCode: '10179',
        },
        type: 'Tài liệu',
        date: {
            time: '07h52',
            date: '18/10/2023',
        },
        to: {
            name: 'Nguyen Van F',
            address: 'Da Nang',
            phoneNumber: '0987654321',
            postalCode: '10179',
        },
        price: {
            main: 9500,
            sub: 1900,
            GTGT: 0,
        },
        weight: 30,
        status: 'Đã đến',
    },
]

function Customer() {
    const [orders, setOrders] = useState(ORDERS);
    const [showModal, setShowModal] = useState(false);
    const [order, setOrder] = useState();

    const handleEdit = (id) => {
        setShowModal(true);
        setOrder(orders.find((order) => order.id === parseInt(id)));
    }

    const handleDelete = () => {

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
                <div className={cx('content')}>
                    <div className={cx('content-section', 'grid-col-4')}>
                        <div className={cx('card', 'info-card', 'bg-purple')}>
                            <div className={cx('info-wrapper')}>
                                <h3 className={cx('info-header')}>Đơn trong ngày</h3>
                                <h2 className={cx('info-number')}>0</h2>
                            </div>
                        </div>
                        <div className={cx('card', 'info-card', 'bg-blue')}>
                            <div className={cx('info-wrapper')}>
                                <h3 className={cx('info-header')}>Đơn trong tháng</h3>
                                <h2 className={cx('info-number')}>0</h2>
                            </div>
                        </div>
                        <div className={cx('card', 'info-card', 'bg-green')}>
                            <div className={cx('info-wrapper')}>
                                <h3 className={cx('info-header')}>Đơn trong năm</h3>
                                <h2 className={cx('info-number')}>3</h2>
                            </div>
                        </div>
                        <div className={cx('card', 'info-card', 'bg-orange')}>
                            <div className={cx('info-wrapper')}>
                                <h3 className={cx('info-header')}>Tổng số đơn hàng</h3>
                                <h2 className={cx('info-number')}>3</h2>
                            </div>
                        </div>
                    </div>
                    
                    <div className={cx('content-section')}>
                        <div className={cx('card', 'table-card')}>
                            <div className={cx('table-wrapper')}>
                                <h3 className={cx('table-header')}>Đơn hàng gửi</h3>
                                <table className={cx('table')} rules='rows'>
                                    <thead>
                                        <tr>
                                            <th className={cx('text-align-center')}>STT</th>
                                            <th>Tên</th>
                                            <th>Code</th>
                                            <th>Trạng thái</th>
                                            <th>Từ</th>
                                            <th>Thời gian</th>
                                            <th>Đến</th>
                                            <th>Cước</th>
                                            <th className={cx('text-align-center')}>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orders.map((order, index) => {
                                                return (
                                                    <tr className={cx('data-row')} key={index}>
                                                        <td className={cx('text-align-center')}>{index + 1}</td>
                                                        <td>{order.name}</td>
                                                        <td>{order.from.postalCode}</td>
                                                        <td className={cx('text-align-center')}>
                                                            <div className={cx('order-status', { 
                                                                active: (order.status === 'Đã đến') ? 'active' : '', 
                                                            })}>
                                                                {order.status}
                                                            </div>
                                                        </td>
                                                        <td>{order.from.address}</td>
                                                        <td>{order.date.date}</td>
                                                        <td>{order.to.address}</td>
                                                        <td>{new Intl.NumberFormat().format(parseInt(order.price.main) + parseInt(order.price.sub) + parseInt(order.price.GTGT))} VNĐ</td>
                                                        <td className={cx('text-align-center')}>
                                                            <div className={cx('actions')}>
                                                                <Tippy 
                                                                    content='Xác nhận'
                                                                    placement='bottom'
                                                                >
                                                                    <Button className={cx('actions-btn', 'btn-green')} primary onClick={() => handleEdit(order.id)}>
                                                                        <FontAwesomeIcon className={cx('actions-icon')} icon={faCheck} />
                                                                    </Button>
                                                                </Tippy>
                                                            </div>
                                                            <div className={cx('actions')}>
                                                                <Tippy 
                                                                    content='Hủy'
                                                                    placement='bottom'
                                                                >
                                                                    <Button className={cx('actions-btn')} primary onClick={handleDelete}>
                                                                        <FontAwesomeIcon className={cx('actions-icon')} icon={faXmark} />
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

export default Customer;