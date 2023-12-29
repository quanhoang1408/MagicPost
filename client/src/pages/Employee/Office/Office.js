import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import styles from './Office.module.scss';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import images from '~/assets/images';

import * as orderService from '~/services/orderService';

const cx = classNames.bind(styles);

function Office() {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [calendarDate, setCalendarDate] = useState(new Date());
    const [fail, setFail] = useState(0);
    const [success, setSuccess] = useState(0);
    const [sending, setSending] = useState();

    const formatTime = (val) => {
        if (val < 10) {
            return '0'
        } else {
            return '';
        }
    }

    useEffect(() => {
        orderService.getOfficeOrder().then((res) => {
            let fail_num =0, success_num = 0;
            setSending(res.arrived.length);
            for(let i = 0; i < res.finished.length; i++) {
                if(res.finished[i].success === false) {
                    fail_num++;
                } else {
                    success_num++;
                }
            }
            setFail(fail_num);
            setSuccess(success_num);
        })
    }, []);

    useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);

        return () => {
            clearInterval(timerId);
        }
    }, []);
    
    const tick = () => {
        const d = new Date();
        const h = d.getHours();
        const m = d.getMinutes();
        const s = d.getSeconds();

        const date = d.getDay() + 1;
        const day = d.getDate();
        const month = d.getMonth();
        const year = d.getFullYear();

        setTime(`${formatTime(h)}${h} : ${formatTime(m)}${m} : ${formatTime(s)}${s}`);
        setDate(`Thứ ${date}, ${formatTime(day)}${day} - ${formatTime(month)}${month} - ${year}`);
    }

    const changeDate = (myDate) => {
        setCalendarDate(myDate);
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid-col-6-4')}>
                <div className={cx('content-section')}>
                    <div className={cx('card', 'content-card')}>
                        <h3 className={cx('content-header', 'welcome-header')}>
                            {`Chào mừng quay trở lại!`}
                        </h3>
                        <p className={cx('content-quote')}>
                            Đừng bỏ cuộc nhé. Giông bão sẽ sớm qua đi và trời sẽ tiếp tục tươi xanh. 
                            Hãy là cái đầu lạnh với tinh thần thép và mọi chuyện rồi sẽ ổn.
                        </p>
                        <img className={cx('content-image')} src={images.workingImage} alt="working_image" />
                    </div>
                </div>
                <div className={cx('content-section')}>
                    <div className={cx('card', 'content-card')}>
                        <div className={cx('time-wrapper')}>
                            <div className={cx('time')}>
                                {time}
                            </div>
                            <div className={cx('date')}>
                                {date}
                            </div>
                            <Calendar className={cx('calendar')} onChange={changeDate} value={calendarDate} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('content-section', 'grid-col-2')}>
                <div className={cx('card', 'info-card')}>
                    <div className={cx('info-wrapper')}>
                        <h3 className={cx('info-header')}>Đơn hàng gửi thành công</h3>
                        <h2 className={cx('info-number')}>{new Intl.NumberFormat().format(parseInt(success))}</h2>
                    </div>
                </div>
                <div className={cx('card', 'info-card')}>
                    <div className={cx('info-wrapper')}>
                        <h3 className={cx('info-header')}>Đơn hàng gửi thất bại</h3>
                        <h2 className={cx('info-number')}>{new Intl.NumberFormat().format(parseInt(fail))}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Office;