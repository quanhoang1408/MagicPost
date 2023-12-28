import classNames from 'classnames/bind';
import { useContext, useState } from 'react';
import styles from './OrderForm.module.scss';

import Button from '~/components/Button';
import Input from '~/components/Input';
import { ToastContext } from '~/components/Toast/Toast';
import * as orderService from '~/services/orderService';

const cx = classNames.bind(styles);

function OrderForm({ order, handleCloseModal }) {
    const [name, setName] = useState(order !== undefined ? order.contents : '');

    const [fromName, setFromName] = useState(order !== undefined ? order.sender.name : '');
    const [fromAddress, setFromAddress] = useState(order !== undefined ? order.sender.address : '');
    const [fromPhoneNumber, setFromPhoneNumber] = useState(order !== undefined ? order.sender.phone : '');
    const [fromPostalCode, setFromPostalCode] = useState(order !== undefined ? order.sender.postal_code : '');

    const [type, setType] = useState(order !== undefined ? order.category : '')
    const [weight, setWeight] = useState(order !== undefined ? order.weight : undefined);
    const [forward, setForward] = useState(order !== undefined ? order.forward : false);

    const [mainPrice, setMainPrice] = useState(order !== undefined ? order.price.main : undefined);
    const [subPrice, setSubPrice] = useState(order !== undefined ? order.price.sub : undefined);
    const [GTGTPrice, setGTGTPrice] = useState(order !== undefined ? order.price.GTGT : undefined);

    const [toName, setToName] = useState(order !== undefined ? order.receiver.name : '');
    const [toAddress, setToAddress] = useState(order !== undefined ? order.receiver.address : '');
    const [toPhoneNumber, setToPhoneNumber] = useState(order !== undefined ? order.receiver.phone : '');
    const [toPostalCode, setToPostalCode] = useState(order !== undefined ? order.receiver.postal_code : '');

    const toast = useContext(ToastContext);
    const handleSave = () => {
        order = {
            contents: name,
            weight: weight,
            price: {
                main: mainPrice,
                sub: subPrice,
                GTGT: GTGTPrice
            },
            sender: {
                name: fromName,
                address: fromAddress,
                phone: fromPhoneNumber,
                postal_code: fromPostalCode
            },
            receiver: {
                name: toName,
                address: toAddress,
                phone: toPhoneNumber,
                postal_code: toPostalCode
            },
            category: type,
            forward: forward
        }
        orderService.createOrder(order)
            .then(data => {
                console.log(data);
                toast.showSuccessToast("Tạo đơn hàng thành công");
                handleCloseModal();
            })
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
                                Trọng lượng (kg):
                            </div>
                            <div className={cx('label')}>
                                Loại:
                            </div>
                            <div className={cx('label')}>
                                Chuyển tiếp:
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
                            <div className={cx('radio-wrapper')}>
                                <input
                                    className={cx('input-radio')}
                                    value={forward}
                                    type='checkbox'
                                    // checked={true}
                                    onChange={(e) => {setForward(e.target.checked)}}
                                />
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
                                    ? '0 VNĐ' 
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
                                type='text'
                                value={fromPhoneNumber}
                                placeholder='Số điện thoại' 
                                onChange={(e) => setFromPhoneNumber(e.target.value)}
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
                                onChange={(e) => setFromAddress(e.target.value)}
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