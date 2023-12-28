import classNames from "classnames/bind";
import { useEffect, useState, useContext } from "react";
import styles from './ResearchOrder.module.scss';

import Button from '~/components/Button';
import Input from '~/components/Input';
import { SearchIcon } from '~/components/Icon';
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { ToastContext } from '~/components/Toast/Toast';

import * as orderService from '~/services/orderService';

const cx = classNames.bind(styles);

function ResearchOrder() {
    const [result, setResult] = useState();
    const [showResult, setShowResult] = useState(false);
    const [status, setStatus] = useState('Đã đến')
    const [searchTerm, setSearchTerm] = useState('');
    
    const toast = useContext(ToastContext);

    const handleSearch = () => {
        orderService.getLogs(searchTerm).then(res => {
            if (!res) {
                toast.showErrorToast("Không tìm thấy đơn hàng")
                console.log("No order found")
                return
            }
            // console.log(res)
            // console.log(err)
            // if (res.status === 404) {
            //     console.log(res)
            //     return
            // }
            // console.log(res)
            res.log = res.log.reverse()
            res.total_price = res.order.price.main + res.order.price.sub + res.order.price.GTGT
            setResult(res)
            // console.log(result)
        })
    }

    useEffect(() => {
        if (!!result) {
            setShowResult(true);
        }
    }, [result]);

    const handleBack = () => {
        setShowResult(false);
        setResult();
    }
    
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className={cx('wrapper')}>
            {showResult ? (
                <div className={cx('content')}>
                    <div className={cx('content-header')}>
                        <Button 
                            className={cx('back-btn')}
                            onClick={handleBack}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </Button>
                        <h3 className={cx('result-header')}>Tình trạng đơn hàng</h3>
                    </div>
                    
                    <div className={cx('grid-col-6-4')}>
                        <div className={cx('content-section')}>
                            <ul className={cx('status-list')}>
                                {
                                    result.log.map((msg, index) => {
                                        return (
                                            <li className={cx('status-item')}>{msg}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className={cx('content-section', 'separate')}>
                            <h3 className={cx('content-header')}>Thông tin trạng thái</h3>
                            <div className={cx('status-info')}>
                                <div className={cx('grid-col-2-8')}>
                                    <div className={cx('label')}>Trạng thái:</div>
                                    <div className={cx('status', { 
                                        success: (result.order.success === true), 
                                        fail: (result.order.success === false), 
                                    })}>
                                        {(result.order.success === true) &&  'Thành công'}
                                        {(result.order.success === false) &&  'Thất bại'}
                                        {(result.order.success === null) &&  'Đang giao'}
                                    </div>
                                </div>
                            </div>

                            <h3 className={cx('content-header')}>Thông tin người nhận</h3>
                            <div className={cx('customer-info')}>
                                <div className={cx('grid-col-2-8')}>
                                    <div className={cx('label')}>Tên:</div>
                                    <div className={cx('info')}>{result.order.receiver.name}</div>
                                </div>
                                <div className={cx('grid-col-2-8')}>
                                    <div className={cx('label')}>SĐT:</div>
                                    <div className={cx('info')}>{result.order.receiver.phone}</div>
                                </div>
                                <div className={cx('grid-col-2-8')}>
                                    <div className={cx('label')}>Địa chỉ:</div>
                                    <div className={cx('info')}>{result.order.receiver.address}</div>
                                </div>
                                <div className={cx('grid-col-2-8')}>
                                    <div className={cx('label')}>Cước:</div>
                                    <div className={cx('info')}>{new Intl.NumberFormat().format(result.total_price)} VNĐ</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('content')}>
                    <h3 className={cx('content-header')}>Mã bưu gửi</h3>
                    <div className={cx('grid-col-6-4')}>
                        <div className={cx('content-section')}>
                            <Input className={cx('input')}
                                type='text'
                                placeholder='Nhập mã bưu gửi'
                                value={searchTerm}
                                onChange={handleChange}/>
                            <Button 
                                className={cx('search-button')} 
                                primary 
                                leftIcon={<SearchIcon />}
                                onClick={handleSearch}
                            >
                                Tra cứu
                            </Button>
                        </div>
                        <div className={cx('content-section')}>
                            <img className={cx('image')} src={images.researchOrder} alt='research-order' />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ResearchOrder;