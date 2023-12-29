import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import styles from './Print.module.scss';

import images from '~/assets/images';
import Button from '~/components/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Print({ props }) {
    const location = useLocation();
    const data = location.state;
    
    const [time, setTime] = useState();

    const handlePrint = () => {
        window.print();
    }

    useEffect(() => {
        if (data) {
            let time = data.start_office.send_time.split('.')[0];
            time = time.split('T').join(' / ');
            setTime(time);
        }
    }, [data]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('content-section')}>
                        <div id={cx('content-print')}>
                            <div className={cx('content-header')}>
                                <div className={cx('content-logo')}>
                                    <img className={cx('logo')} src={images.logo} alt='Magic Post' />
                                </div>
                                <div className={cx('content-qr')}>
                                    QR
                                </div>
                            </div>
    
                            <div className={cx('content-body')}>
                                <div className={cx('flex-row')}>
                                    <div className={cx('grid-col-2')}>
                                        <div className={cx('info-wrapper', 'flex-row')}>
                                            <div className={cx('info-label')}>
                                                <strong>1. Họ tên địa chỉ người gửi:</strong>
                                            </div>
                                            <div className={cx('info-detail')}>
                                                {data.sender.name}
                                            </div>
                                            <div className={cx('info-detail', 'add-space')}>
                                                {data.sender.address}
                                            </div>
                                            <div className={cx('flex-col', 'space-between')}>
                                                <div className={cx('flex-col')}>
                                                    <div className={cx('info-label')}>
                                                        <strong>Điện thoại:</strong>
                                                    </div>
                                                    <div className={cx('info-detail')}>
                                                        {data.sender.phone}
                                                    </div>
                                                </div>
                                                <div className={cx('flex-col')}>
                                                    <div className={cx('info-label')}>
                                                        <strong>Mã bưu chính:</strong>
                                                    </div>
                                                    <div className={cx('info-detail')}>
                                                        {data.sender.postal_code}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('info-wrapper', 'flex-row')}>
                                            <div className={cx('info-label')}>
                                                <strong>2. Họ tên địa chỉ người nhận:</strong>
                                            </div>
                                            <div className={cx('info-detail')}>
                                                {data.receiver.name}
                                            </div>
                                            <div className={cx('info-detail', 'add-space')}>
                                                {data.receiver.address}
                                            </div>
                                            <div className={cx('flex-col', 'space-between')}>
                                                <div className={cx('flex-col')}>
                                                    <div className={cx('info-label')}>
                                                        <strong>Điện thoại:</strong>
                                                    </div>
                                                    <div className={cx('info-detail')}>
                                                        {data.receiver.phone}
                                                    </div>
                                                </div>
                                                <div className={cx('flex-col')}>
                                                    <div className={cx('info-label')}>
                                                        <strong>Mã bưu chính:</strong>
                                                    </div>
                                                    <div className={cx('info-detail')}>
                                                        {data.receiver.postal_code}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('grid-col-2')}>
                                        <div className={cx('flex-row')}>
                                            <div className={cx('info-wrapper')}>
                                                <div className={cx('info-label')}>
                                                    <strong>3. Loại hàng gửi:</strong>
                                                </div>
                                                <div className={cx('info-detail')}>
                                                    <div className={cx('flex-col', 'space-around')}>
                                                        <div className={cx('flex-col')}>
                                                            <div className={cx('check-box', { active: (data.category === 'Tài liệu') })}></div>
                                                            <div className={cx('info-detail')}>Tài liệu</div>
                                                        </div>
                                                        <div className={cx('flex-col')}>
                                                            <div className={cx('check-box', { active: (data.category === 'Hàng hóa') })}></div>
                                                            <div className={cx('info-detail')}>Hàng hóa</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={cx('info-label')}>
                                                    <strong>4. Nội dung trị giá bưu gửi:</strong>
                                                </div>
                                                <div className={cx('info-detail')}>
                                                    <table className={cx('table')} rules='all'>
                                                        <thead>
                                                            <tr>
                                                                <th>Nội dung</th>
                                                                <th>Số lượng</th>
                                                                <th>Trị giá</th>
                                                                <th>Giấy tờ đính kèm</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Tổng</td>
                                                                <td>0</td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className={cx('info-wrapper')}>
                                                <div className={cx('info-label')}>
                                                    <strong>5. Dịch vụ đặc biệt/Cộng thêm:</strong>
                                                </div>
                                                <div className={cx('info-detail', 'dotted-line')}></div>
                                                <div className={cx('info-detail', 'dotted-line')}></div>
                                                <div className={cx('info-detail')}>
                                                    Mã hợp đồng MPC/PPA
                                                </div>
                                            </div>
                                            <div className={cx('info-wrapper')}>
                                                <div className={cx('info-label')}>
                                                    <strong>6. Chỉ dẫn của người gửi khi không phát được bưu gửi:</strong>
                                                </div>
                                                <div className={cx('info-detail')}>
                                                    <div className={cx('flex-col', 'space-around')}>
                                                        <div>
                                                            <div className={cx('flex-col')}>
                                                                <div className={cx('check-box')}></div>
                                                                <div className={cx('info-detail', 'small-text')}>Chuyển hoàn ngay</div>
                                                            </div>
                                                            <div className={cx('flex-col')}>
                                                                <div className={cx('check-box')}></div>
                                                                <div className={cx('info-detail', 'small-text')}>Chuyển hoàn trước ngày</div>
                                                            </div>
                                                            <div className={cx('flex-col')}>
                                                                <div className={cx('check-box')}></div>
                                                                <div className={cx('info-detail', 'small-text')}>Hủy</div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className={cx('flex-col')}>
                                                                <div className={cx('check-box')}></div>
                                                                <div className={cx('info-detail', 'small-text')}>Gọi điện cho người gửi/BC gửi</div>
                                                            </div>
                                                            <div className={cx('flex-col')}>
                                                                <div className={cx('check-box')}></div>
                                                                <div className={cx('info-detail', 'small-text')}>Chuyển hoàn khi hết thời gian lưu trữ</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('info-wrapper')}>
                                                <div className={cx('info-label')}>
                                                    <strong>7. Cam kết của người gửi:</strong>
                                                </div>
                                                <div className={cx('info-detail')}>
                                                    Tôi chấp nhận các điều khoản và cam đoan bưu gửi này không chứa
                                                    các mặt hàng nguy hiểm, cấm gửi. Trường hợp không phát được hãy 
                                                    thực hiện chỉ dẫn tại mục 6, tôi sẽ trả cước chuyển hoàn.
                                                </div>
                                                <div className={cx('flex-col', 'space-between')}>
                                                    <div>
                                                        <div className={cx('info-label')}>
                                                            <strong>8. Ngày giờ gửi:</strong>
                                                        </div>
                                                        <div className={cx('info-detail')}>
                                                            {time}
                                                        </div>
                                                    </div>
                                                    <div className={cx('info-label')}>
                                                        <strong>Chữ ký người gửi</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('flex-row', 'flex-1')}>
                                            <div className={cx('grid-col-2', 'flex-1')}>
                                                <div className={cx('flex-row', 'flex-1')}>
                                                    <div className={cx('info-wrapper')}>
                                                        <div className={cx('info-label')}>
                                                            <strong>9. Cước:</strong>
                                                        </div>
                                                        <div className={cx('flex-col', 'space-between')}>
                                                            <div>
                                                                <div className={cx('info-label')}>
                                                                    a. Cước chính:
                                                                </div>
                                                                <div className={cx('info-label')}>
                                                                    b. Phụ phí:
                                                                </div>
                                                                <div className={cx('info-label')}>
                                                                    c. Cước GTGT:
                                                                </div>
                                                                <div className={cx('info-label')}>
                                                                    <strong>d. Tổng thu:</strong>
                                                                </div>
                                                            </div>
                                                            <div className={cx('text-align-right')}>
                                                                <div className={cx('info-detail')}>
                                                                    {`${new Intl.NumberFormat().format(parseInt(data.price.main))} VNĐ`}
                                                                </div>
                                                                <div className={cx('info-detail')}>
                                                                    {`${new Intl.NumberFormat().format(parseInt(data.price.sub))} VNĐ`}
                                                                </div>
                                                                <div className={cx('info-detail')}>
                                                                    {`${new Intl.NumberFormat().format(parseInt(data.price.GTGT))} VNĐ`}
                                                                </div>
                                                                <div className={cx('info-detail')}>
                                                                    <strong>{`${new Intl.NumberFormat().format(parseInt(data.price.main) + parseInt(data.price.sub) + parseInt(data.price.GTGT))} VNĐ`}</strong>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cx('info-wrapper')}>
                                                        <div className={cx('info-label')}>
                                                            <strong>11. Thu của người nhận:</strong>
                                                        </div>
                                                        <div className={cx('flex-col', 'space-between')}>
                                                            <div>
                                                                <div className={cx('info-label')}>
                                                                    a. COD:
                                                                </div>
                                                                <div className={cx('info-label')}>
                                                                    b. Thu khác:
                                                                </div>
                                                                <div className={cx('info-label')}>
                                                                    c. Tổng thu:
                                                                </div>
                                                            </div>
                                                            <div className={cx('text-align-right')}>
                                                                <div className={cx('info-detail')}>
                                                                    0
                                                                </div>
                                                                <div className={cx('info-detail')}>
                                                                    0
                                                                </div>
                                                                <div className={cx('info-detail')}>
                                                                    0
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cx('info-wrapper', 'flex-1', 'flex-row')}>
                                                        <div className={cx('info-label')}>
                                                            <strong>13. Bưu cục chấp nhận:</strong>
                                                        </div>
                                                        <div className={cx('info-detail', 'text-align-center')}>
                                                            Chữ ký GDV nhận
                                                        </div>
                                                        <div className={cx('flex-1')}></div>
                                                        <div className={cx('info-detail', 'text-align-center')}>
                                                            {`GDV: ${data.staff_name}`}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={cx('flex-row', 'flex-1')}>
                                                    <div className={cx('info-wrapper')}>
                                                        <div className={cx('info-label')}>
                                                            <strong>10. Khối lượng (kg):</strong>
                                                        </div>
                                                        <div className={cx('flex-col', 'space-between')}>
                                                            <div>
                                                                <div className={cx('info-label')}>
                                                                    Khối lượng thực tế:
                                                                </div>
                                                                <div className={cx('info-label')}>
                                                                    Khối lượng quy đổi:
                                                                </div>
                                                            </div>
                                                            <div className={cx('text-align-right')}>
                                                                <div className={cx('info-detail')}>
                                                                    {data.weight}
                                                                </div>
                                                                <div className={cx('info-detail')}>
                                                                    0
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cx('info-wrapper', 'flex-1')}>
                                                        <div className={cx('info-label')}>
                                                            <strong>12. Chú dẫn nghiệp vụ:</strong>
                                                        </div>
                                                        <div className={cx('info-detail')}>
                                                            0
                                                        </div>
                                                    </div>
                                                    <div className={cx('info-wrapper', 'flex-1')}>
                                                        <div className={cx('info-label')}>
                                                            <strong>14. Ngày giờ nhận:</strong>
                                                        </div>
                                                        <div className={cx('info-detail')}>
                                                            .....h.....-...../...../20.....
                                                        </div>
                                                        <div className={cx('info-detail', 'text-align-center')}>
                                                            Người nhận/Người được ủy quyền nhận
                                                        </div>
                                                        <div className={cx('info-detail', 'text-align-center')}>
                                                            (Ký, ghi rõ họ tên)
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div className={cx('content-footer', 'text-align-center')}>
                                <strong>Hotline: 19008095 - Website: magicpost.com.vn - Email: cskh@magicpost.com.vn</strong>
                            </div>
                        </div>

                        <Button 
                            className={cx('print-btn')} 
                            primary
                            leftIcon={<FontAwesomeIcon icon={faPrint} />}
                            onClick={handlePrint}
                        >
                            In
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Print;