import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from './ResearchOrder.module.scss';

import Button from '~/components/Button';
import Input from '~/components/Input';
import { SearchIcon } from '~/components/Icon';
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function ResearchOrder() {
    const [result, setResult] = useState();
    const [showResult, setShowResult] = useState(false);
    const [status, setStatus] = useState('Đã đến')

    const handleSearch = () => {
        setResult('data');
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
                                <li className={cx('status-item')}>01/07/2020 17:13 Người nhận: Nguyễn Văn A</li>
                                <li className={cx('status-item')}>01/07/2020 17:13 Giao hàng thành công: HUB Linh Trung - Võ Thanh Chí</li>
                                <li className={cx('status-item')}>01/07/2020 07:28 Giao bưu tá đi phát: HUB Linh Trung - Hồ Chí Minh</li>
                                <li className={cx('status-item')}>01/07/2020 06:58 Đã đến bưu cục: HUB Linh Trung - Hồ Chí Minh</li>
                                <li className={cx('status-item')}>30/06/2020 23:24 Đi khỏi bưu cục: Trung tâm HCM - Hồ Chí Minh</li>
                                <li className={cx('status-item')}>30/06/2020 23:24 Đã đến bưu cục: Trung tâm HCM - Hồ Chí Minh</li>
                                <li className={cx('status-item')}>30/06/2020 18:29 Đi khỏi bưu cục: Quận 12 - Hồ Chí Minh</li>
                                <li className={cx('status-item')}>30/06/2020 10:00 Chấp nhận gửi: Quận 12 - Hồ Chí Minh</li>
                                <li className={cx('status-item')}>29/06/2020 20:04 Đơn hàng chờ xử lý: Quận 12 - Hồ Chí Minh</li>
                                <li className={cx('status-item')}>28/06/2020 09/39 Giao bưu cục đi nhận: Quận 12 - Hồ Chí Minh</li>
                            </ul>
                        </div>
                        <div className={cx('content-section', 'separate')}>
                            <h3 className={cx('content-header')}>Thông tin trạng thái</h3>
                            <div className={cx('status-info')}>
                                <div className={cx('grid-col-2-8')}>
                                    <div className={cx('label')}>Trạng thái:</div>
                                    <div className={cx('status', { 
                                        active: (status === 'Đã đến') ? 'active' : '', 
                                    })}>
                                        {status}
                                    </div>
                                </div>
                            </div>

                            <h3 className={cx('content-header')}>Thông tin người nhận</h3>
                            <div className={cx('customer-info')}>
                                <div className={cx('grid-col-2-8')}>
                                    <div className={cx('label')}>Tên:</div>
                                    <div className={cx('info')}>Nguyễn Văn A</div>
                                </div>
                                <div className={cx('grid-col-2-8')}>
                                    <div className={cx('label')}>SĐT:</div>
                                    <div className={cx('info')}>0987654321</div>
                                </div>
                                <div className={cx('grid-col-2-8')}>
                                    <div className={cx('label')}>Địa chỉ:</div>
                                    <div className={cx('info')}>Võ Thanh Chí, Hồ Chí Minh</div>
                                </div>
                                <div className={cx('grid-col-2-8')}>
                                    <div className={cx('label')}>Cước:</div>
                                    <div className={cx('info')}>{new Intl.NumberFormat().format(100000)} VNĐ</div>
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
                            <Input className={cx('input')} placeholder='Nhập mã bưu gửi' />
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