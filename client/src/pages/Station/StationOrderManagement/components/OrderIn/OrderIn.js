import classNames from 'classnames/bind';
import styles from './OrderIn.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHouse, faXmark } from '@fortawesome/free-solid-svg-icons';
import config from '~/config';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
import LocationChoiceForm from '~/components/Modal/components/LocationChoiceForm';
import * as orderService from '~/services/orderService';

const cx = classNames.bind(styles);


function OrderIn() {
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [order, setOrder] = useState();

    useEffect(() => {
        orderService.getStationOrder().then((res) => {
            console.log(res.arriving);
            setOrders(res.arriving);
        })
    }, [orders]);


    const handleEdit = (id) => {
        setShowModal(true);
        setOrder(orders.find((order) => order._id === id));
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
                                <h3 className={cx('table-header')}>Đơn hàng đến</h3>
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
                                                        <td>{order.code}</td>
                                                        <td>{order.sender.address}</td>
                                                        <td>{order.start_office.send_time}</td>
                                                        <td>{order.receiver.address}</td>
                                                        <td>{new Intl.NumberFormat().format(parseInt(order.price.main) + parseInt(order.price.sub) + parseInt(order.price.GTGT))} VNĐ</td>
                                                        <td className={cx('text-align-center')}>
                                                                <div className={cx('actions')}>
                                                                    <Tippy 
                                                                        content='Xác nhận'
                                                                        placement='bottom'
                                                                    >
                                                                        <Button className={cx('actions-btn', 'btn-green')} primary onClick={() => handleEdit(order._id)}>
                                                                            <FontAwesomeIcon className={cx('actions-icon')} icon={faCheck} />
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
                        <LocationChoiceForm order={order} handleCloseModal={handleCloseModal} />
                    </Modal>
                }
            </div>
        </div>
    );
}

export default OrderIn;