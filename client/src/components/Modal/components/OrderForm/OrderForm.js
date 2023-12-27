import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './OrderForm.module.scss';

import Button from '~/components/Button';
import Input from '~/components/Input';

const cx = classNames.bind(styles);

function OrderForm({ order, handleCloseModal }) {
    const [name, setName] = useState(order !== undefined ? order.name : '');

    const [fromName, setFromName] = useState(order !== undefined ? order.from.name : '');
    const [fromAddress, setFromAddress] = useState(order !== undefined ? order.from.address : '');
    const [fromPhoneNumber, setFromPhoneNumber] = useState(order !== undefined ? order.from.phoneNumber : '');
    const [fromPostalCode, setFromPostalCode] = useState(order !== undefined ? order.from.postalCode : '');

    const [type, setType] = useState(order !== undefined ? order.type : '')
    const [time, setTime] = useState(order !== undefined ? order.date.time.split('h').join(':') : '');
    const [date, setDate] = useState(order !== undefined ? order.date.date.split('/').reverse().join('-') : '');
    const [weight, setWeight] = useState(order !== undefined ? order.weight : undefined);

    const [mainPrice, setMainPrice] = useState(order !== undefined ? order.price.main : undefined);
    const [subPrice, setSubPrice] = useState(order !== undefined ? order.price.sub : undefined);
    const [GTGTPrice, setGTGTPrice] = useState(order !== undefined ? order.price.GTGT : undefined);

    const [toName, setToName] = useState(order !== undefined ? order.to.name : '');
    const [toAddress, setToAddress] = useState(order !== undefined ? order.to.address : '');
    const [toPhoneNumber, setToPhoneNumber] = useState(order !== undefined ? order.to.phoneNumber : '');
    const [toPostalCode, setToPostalCode] = useState(order !== undefined ? order.to.postalCode : '');

    const handleSave = () => {
        // if success -> close modal, else not
        handleCloseModal();
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <h2 className={cx('header')}>Thông tin đơn hàng</h2>

                <h4 className={cx('info-header')}>Thông tin cơ bản</h4>
                <div className={cx('grid-col-2')}>
                    <div className={cx('grid-col-2-8')}>
                        <div className={cx('info-label')}>
                            <div className={cx('label')}>
                                Tên đơn hàng:
                            </div>
                            <div className={cx('label')}>
                                Thời gian:
                            </div>
                            <div className={cx('label')}>
                                Ngày:
                            </div>
                            <div className={cx('label')}>
                                Trọng lượng (kg):
                            </div>
                            <div className={cx('label')}>
                                Loại:
                            </div>
                        </div>
                        <div className={cx('info-detail')}>
                            <Input 
                                className={cx('input-wrapper')}
                                type='text' 
                                value={name}
                                placeholder='Tên đơn hàng' 
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Input 
                                className={cx('input-wrapper')}
                                type='time' 
                                value={time}
                                onChange={(e) => {setTime(e.target.value)}}
                            />
                            <Input 
                                className={cx('input-wrapper')}
                                type='date' 
                                value={date}
                                onChange={(e) => {setDate(e.target.value)}}
                            />
                            <Input 
                                className={cx('input-wrapper')}
                                type='number' 
                                value={weight}
                                placeholder='Trọng lượng'
                                onChange={(e) => setWeight(e.target.value)}
                            />
                            <div className={cx('radio-wrapper')}>
                                <input 
                                    className={cx('input-radio')}
                                    id='order-form-type-document'
                                    type='radio' 
                                    checked={type.toLowerCase() === 'tài liệu'}
                                    onChange={() => {setType('Tài liệu')}}
                                />
                                <label className={cx('label')} htmlFor='order-form-type-document'>
                                    Tài liệu
                                </label>
                                <input 
                                    className={cx('input-radio')}
                                    id='order-form-type-product'
                                    type='radio' 
                                    checked={type.toLowerCase() === 'hàng hóa'}
                                    onChange={() => {setType('Hàng hóa')}}
                                />
                                <label className={cx('label')} htmlFor='order-form-type-product'>
                                    Hàng hóa
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={cx('grid-col-2-8')}>
                        <div className={cx('info-label')}>
                            <div className={cx('label')}>
                                Cước chính:
                            </div>
                            <div className={cx('label')}>
                                Phụ phí:
                            </div>
                            <div className={cx('label')}>
                                Cước GTGT:
                            </div>
                            <div className={cx('label')}>
                                Tổng cước:
                            </div>
                        </div>
                        <div className={cx('info-detail')}>
                            <Input 
                                className={cx('input-wrapper')}
                                inputClassName={cx('input')}
                                type='number' 
                                value={mainPrice}
                                placeholder='Cước chính'
                                onChange={(e) => {setMainPrice(e.target.value)}}
                            />
                            <Input 
                                className={cx('input-wrapper')}
                                inputClassName={cx('input')}
                                type='number' 
                                value={subPrice}
                                placeholder='Phụ phí'
                                onChange={(e) => {setSubPrice(e.target.value)}}
                            />
                            <Input 
                                className={cx('input-wrapper')}
                                inputClassName={cx('input')}
                                type='number' 
                                value={GTGTPrice}
                                placeholder='Cước GTGT'
                                onChange={(e) => {setGTGTPrice(e.target.value)}}
                            />
                            <Input 
                                className={cx('input-wrapper')}
                                type='text' 
                                value={isNaN(parseInt(mainPrice)) || isNaN(parseInt(subPrice)) || isNaN(parseInt(GTGTPrice)) 
                                    ? '0 VND' 
                                    : `${new Intl.NumberFormat().format(parseInt(mainPrice) + parseInt(subPrice) + parseInt(GTGTPrice))} VNĐ`
                                }
                                readOnly
                            />
                        </div>
                    </div>
                </div>

                <h4 className={cx('info-header')}>Thông tin người gửi</h4>
                <div className={cx('grid-col-2')}>
                    <div className={cx('grid-col-2-8')}>
                        <div className={cx('info-label')}>
                            <div className={cx('label')}>
                                Tên:
                            </div>
                            <div className={cx('label')}>
                                Số điện thoại:
                            </div>
                        </div>
                        <div className={cx('info-detail')}>
                            <Input 
                                className={cx('input-wrapper')}
                                type='text' 
                                value={fromName}
                                placeholder='Tên khách hàng' 
                                onChange={(e) => setFromName(e.target.value)}
                            />
                            <Input 
                                className={cx('input-wrapper')}
                                type='number' 
                                value={fromPhoneNumber}
                                placeholder='Số điện thoại' 
                                onChange={(e) => setFromAddress(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={cx('grid-col-2-8')}>
                        <div className={cx('info-label')}>
                            <div className={cx('label')}>
                                Địa chỉ:
                            </div>
                            <div className={cx('label')}>
                                Mã bưu điện:
                            </div>
                        </div>
                        <div className={cx('info-detail')}>
                            <Input 
                                className={cx('input-wrapper')}
                                type='text' 
                                value={fromAddress}
                                placeholder='Địa chỉ' 
                                onChange={(e) => setFromPhoneNumber(e.target.value)}
                            />
                            <Input 
                                className={cx('input-wrapper')}
                                type='text' 
                                value={fromPostalCode}
                                placeholder='Mã bưu điện' 
                                onChange={(e) => setFromPostalCode(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <h4 className={cx('info-header')}>Thông tin người nhận</h4>
                <div className={cx('grid-col-2')}>
                    <div className={cx('grid-col-2-8')}>
                        <div className={cx('info-label')}>
                            <div className={cx('label')}>
                                Tên:
                            </div>
                            <div className={cx('label')}>
                                Số điện thoại:
                            </div>
                        </div>
                        <div className={cx('info-detail')}>
                            <Input 
                                className={cx('input-wrapper')}
                                type='text' 
                                value={toName}
                                placeholder='Tên khách hàng' 
                                onChange={(e) => setToName(e.target.value)}
                            />
                            <Input 
                                className={cx('input-wrapper')}
                                type='text' 
                                value={toPhoneNumber}
                                placeholder='Số điện thoại' 
                                onChange={(e) => setToPhoneNumber(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={cx('grid-col-2-8')}>
                        <div className={cx('info-label')}>
                            <div className={cx('label')}>
                                Địa chỉ:
                            </div>
                            <div className={cx('label')}>
                                Mã bưu điện:
                            </div>
                        </div>
                        <div className={cx('info-detail')}>
                            <Input 
                                className={cx('input-wrapper')}
                                type='text' 
                                value={toAddress}
                                placeholder='Địa chỉ' 
                                onChange={(e) => setToAddress(e.target.value)}
                            />
                            <Input 
                                className={cx('input-wrapper')}
                                type='text' 
                                value={toPostalCode}
                                placeholder='Mã bưu điện' 
                                onChange={(e) => setToPostalCode(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <Button 
                    className={cx('submit-btn')} 
                    primary
                    onClick={handleSave}
                >
                    Save
                </Button>
                
            </div>
        </div>
    );
}

export default OrderForm;