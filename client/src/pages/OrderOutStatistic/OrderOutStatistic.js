import classNames from 'classnames/bind';
import styles from './OrderOutStatistic.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPenToSquare, faPlus, faPrint, faTrash } from '@fortawesome/free-solid-svg-icons';
import config from '~/config';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
import OrderForm from '~/components/Modal/components/OrderForm';
import Overall from './components/Overall';
import Station from './components/Station';
import Office from './components/Office';

const cx = classNames.bind(styles);

const OVERALL_TAB = 0;
const STATION_TAB = 1;
const OFFICE_TAB = 2;

function OrderOutStatistic() {
    const [currentTab, setCurrentTab] = useState(OVERALL_TAB);
    const [children, setChildren] = useState(<Overall />);
    const statisticTabRef = useRef();

    useEffect(() => {
        const statisticTab = statisticTabRef.current;
        const tabs = [...statisticTab.childNodes].slice(0, statisticTab.childNodes.length - 1);
        const line = [...statisticTab.childNodes].at(statisticTab.childNodes.length - 1);

        tabs.forEach(tab => {
            if (tab.classList.contains(cx('active'))) {
                line.style.left = `${tab.offsetLeft}px`;
                line.style.width = `${tab.offsetWidth}px`;
            }
        });
    }, []);

    const handleTabClick = (e) => {
        const statisticTab = statisticTabRef.current;
        const tabs = [...statisticTab.childNodes].slice(0, statisticTab.childNodes.length - 1);
        const line = [...statisticTab.childNodes].at(statisticTab.childNodes.length - 1);
        const tab = e.currentTarget;
        
        tabs.forEach(tab => {
            if (tab.classList.contains(cx('active'))) {
                tab.classList.remove(cx('active'));
            }
            if (!tab.classList.contains(cx('disable'))) {
                tab.classList.add(cx('disable'));
            }
        });

        if (tab.classList.contains(cx('disable'))) {
            tab.classList.remove(cx('disable'));
        }
        if (!tab.classList.contains(cx('active'))) {
            tab.classList.add(cx('active'));
        }

        tabs.forEach((tab, index) => {
            if (tab.classList.contains(cx('active'))) {
                line.style.left = `${tab.offsetLeft}px`;
                line.style.width = `${tab.offsetWidth}px`;
                setCurrentTab(index);
            }
        });
    }

    const handleTabHover = (e) => {
        const statisticTab = statisticTabRef.current;
        const line = [...statisticTab.childNodes].at(statisticTab.childNodes.length - 1);
        const tab = e.currentTarget;

        line.style.left = `${tab.offsetLeft}px`;
        line.style.width = `${tab.offsetWidth}px`;
    }

    const handleTabNotHover = (e) => {
        const statisticTab = statisticTabRef.current;
        const tabs = [...statisticTab.childNodes].slice(0, statisticTab.childNodes.length - 1);
        const line = [...statisticTab.childNodes].at(statisticTab.childNodes.length - 1);

        tabs.forEach(tab => {
            if (tab.classList.contains(cx('active'))) {
                line.style.left = `${tab.offsetLeft}px`;
                line.style.width = `${tab.offsetWidth}px`;
            }
        });
    }

    useEffect(() => {
        switch(currentTab) {
            case OVERALL_TAB:
                setChildren(<Overall />);
                break;
            case STATION_TAB:
                setChildren(<Station />);
                break;
            case OFFICE_TAB:
                setChildren(<Office />);
                break;
            default:
                setChildren(<Overall />);
                break;
        }
    }, [currentTab]);
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header-wrapper')}>
                    <ul className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}>
                            <h3 className={cx('header')}>Thống kê hàng gửi</h3>
                        </li>
                        <li className={cx('breadcrumb-item')}>
                            <Link to={config.routes.boss}>
                                <FontAwesomeIcon className={cx('breadcrumb-icon')} icon={faHouse} />
                                Trang chủ
                            </Link>
                        </li>
                        <li className={cx('breadcrumb-item')}>
                            Thống kê hàng
                        </li>
                        <li className={cx('breadcrumb-item')}>
                            Hàng nhận
                        </li>
                    </ul>
                </div>
                
                <div className={cx('statistic-tab')} ref={statisticTabRef}>
                    <Button 
                        className={cx('statistic-tab-btn', 'active')} 
                        onClick={(e) => handleTabClick(e)}
                        onMouseOver={(e) => handleTabHover(e)}
                        onMouseOut={(e) => handleTabNotHover(e)}
                    >
                        Toàn quốc
                    </Button>
                    <Button 
                        className={cx('statistic-tab-btn', 'disable')} 
                        onClick={(e) => handleTabClick(e)}
                        onMouseOver={(e) => handleTabHover(e)}
                        onMouseOut={(e) => handleTabNotHover(e)}
                    >
                        Điểm tập kết
                    </Button>
                    <Button 
                        className={cx('statistic-tab-btn', 'disable')} 
                        onClick={(e) => handleTabClick(e)}
                        onMouseOver={(e) => handleTabHover(e)}
                        onMouseOut={(e) => handleTabNotHover(e)}
                    >
                        Điểm giao dịch
                    </Button>
                    <div className={cx('statistic-tab-line')}></div>
                </div>

                <div className={cx('content')}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default OrderOutStatistic;