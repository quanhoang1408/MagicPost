import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import styles from './Station.module.scss';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import images from '~/assets/images';

const cx = classNames.bind(styles);

function Station() {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [calendarDate, setCalendarDate] = useState(new Date());

    const formatTime = (val) => {
        if (val < 10) {
            return '0'
        } else {
            return '';
        }
    }

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
                        <Calendar className={cx('calendar')} onChange={changeDate} value={calendarDate} />
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Station;