import classNames from 'classnames/bind';
import styles from './StationOrderManagement.module.scss';
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
import OrderIn from './components/OrderIn';
import OrderOut from './components/OrderOut';
import Complete from './components/Complete';

const cx = classNames.bind(styles);

const ORDER_IN_TAB = 0;
const ORDER_OUT_TAB = 1;
const COMPLETE_TAB = 2;

function StationOrderManagement() {
    const [currentTab, setCurrentTab] = useState(ORDER_IN_TAB);
    const [children, setChildren] = useState(<OrderIn />);
    const orderTabRef = useRef();

    useEffect(() => {
        const orderTab = orderTabRef.current;
        const tabs = [...orderTab.childNodes].slice(0, orderTab.childNodes.length - 1);
        const line = [...orderTab.childNodes].at(orderTab.childNodes.length - 1);

        tabs.forEach(tab => {
            if (tab.classList.contains(cx('active'))) {
                line.style.left = `${tab.offsetLeft}px`;
                line.style.width = `${tab.offsetWidth}px`;
            }
        });
    }, []);

    const handleTabClick = (e) => {
        const orderTab = orderTabRef.current;
        const tabs = [...orderTab.childNodes].slice(0, orderTab.childNodes.length - 1);
        const line = [...orderTab.childNodes].at(orderTab.childNodes.length - 1);
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
        const orderTab = orderTabRef.current;
        const line = [...orderTab.childNodes].at(orderTab.childNodes.length - 1);
        const tab = e.currentTarget;

        line.style.left = `${tab.offsetLeft}px`;
        line.style.width = `${tab.offsetWidth}px`;
    }

    const handleTabNotHover = (e) => {
        const orderTab = orderTabRef.current;
        const tabs = [...orderTab.childNodes].slice(0, orderTab.childNodes.length - 1);
        const line = [...orderTab.childNodes].at(orderTab.childNodes.length - 1);

        tabs.forEach(tab => {
            if (tab.classList.contains(cx('active'))) {
                line.style.left = `${tab.offsetLeft}px`;
                line.style.width = `${tab.offsetWidth}px`;
            }
        });
    }

    useEffect(() => {
        switch(currentTab) {
            case ORDER_IN_TAB:
                setChildren(<OrderIn />);
                break;
            case ORDER_OUT_TAB:
                setChildren(<OrderOut />);
                break;
            case COMPLETE_TAB:
                setChildren(<Complete />);
                break;
            default:
                break;
        }
    }, [currentTab]);
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header-wrapper')}>
                    <ul className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}>
                            <h3 className={cx('header')}>Quản lý đơn hàng</h3>
                        </li>
                        <li className={cx('breadcrumb-item')}>
                            <Link to={config.routes.employee}>
                                <FontAwesomeIcon className={cx('breadcrumb-icon')} icon={faHouse} />
                                Trang chủ
                            </Link>
                        </li>
                        <li className={cx('breadcrumb-item')}>
                            Quản lý đơn hàng
                        </li>
                        {/* <li className={cx('breadcrumb-item')}>
                            Đơn hàng nhận
                        </li> */}
                    </ul>
                </div>
                
                <div className={cx('statistic-tab')} ref={orderTabRef}>
                    <Button 
                        className={cx('statistic-tab-btn', 'active')} 
                        onClick={(e) => handleTabClick(e)}
                        onMouseOver={(e) => handleTabHover(e)}
                        onMouseOut={(e) => handleTabNotHover(e)}
                    >
                        Đang đến
                    </Button>
                    <Button 
                        className={cx('statistic-tab-btn', 'disable')} 
                        onClick={(e) => handleTabClick(e)}
                        onMouseOver={(e) => handleTabHover(e)}
                        onMouseOut={(e) => handleTabNotHover(e)}
                    >
                        Đang gửi
                    </Button>
                    <Button 
                        className={cx('statistic-tab-btn', 'disable')} 
                        onClick={(e) => handleTabClick(e)}
                        onMouseOver={(e) => handleTabHover(e)}
                        onMouseOut={(e) => handleTabNotHover(e)}
                    >
                        Hoàn thành
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

export default StationOrderManagement;