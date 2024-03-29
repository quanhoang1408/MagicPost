import classNames from 'classnames/bind';
import styles from './Complete.module.scss';
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

import * as orderService from '~/services/orderService';
import formatDate from '~/utils/formatDate';

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

function Complete() {
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [order, setOrder] = useState();

    useEffect(() => {
        orderService.getStationOrder().then((res) => {
            setOrders(res.finished);
        })
    }, [orders])

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
                    <div className={cx('content-section')}>
                        <div className={cx('card', 'table-card')}>
                            <div className={cx('table-wrapper')}>
                                <h3 className={cx('table-header')}>Đơn hàng hoàn thành</h3>
                                <table className={cx('table')} rules='rows'>
                                    <thead>
                                        <tr>
                                            <th className={cx('text-align-center')}>STT</th>
                                            <th>Tên</th>
                                            <th>Code</th>
                                            {/* <th>Trạng thái</th> */}
                                            <th>Từ</th>
                                            <th>Thời gian</th>
                                            <th>Đến</th>
                                            <th>Cước</th>
                                            {/* <th className={cx('text-align-center')}>Hành động</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orders.map((order, index) => {
                                                return (
                                                    <tr className={cx('data-row')} key={index}>
                                                        <td className={cx('text-align-center')}>{index + 1}</td>
                                                        <td>{order.contents}</td>
                                                        <td>{order.code}</td>
                                                        {/* <td className={cx('text-align-center')}>
                                                            <div className={cx('order-status', { 
                                                                active: (order.status === 'Đã đến') ? 'active' : '', 
                                                            })}>
                                                                {order.status}
                                                            </div>
                                                        </td> */}
                                                        <td>{order.sender.address}</td>
                                                        <td>{formatDate(order.start_office.send_time)}</td>
                                                        <td>{order.receiver.address}</td>
                                                        <td>{new Intl.NumberFormat().format(parseInt(order.price.main) + parseInt(order.price.sub) + parseInt(order.price.GTGT))} VNĐ</td>

                                                        {/* <td className={cx('text-align-center')}>
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
                                                        </td> */}
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

export default Complete;