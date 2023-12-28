import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import styles from './Boss.module.scss';

import { ToastContext } from '~/components/Toast/Toast';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid } from 'recharts';
import { LineChart, Line } from 'recharts';

import * as stationLeadService from '~/services/stationLeadService';
import * as officeLeadService from '~/services/officeLeadService';
import * as stationService from '~/services/stationService';
import * as officeService from '~/services/officeService';
import formatDate from '~/utils/formatDate';

const cx = classNames.bind(styles);

const ORDERS = [
    {
        name: 'Tổng số hàng gửi',
        value: 400,
    },
    {
        name: 'Tổng số hàng nhận',
        value: 600,
    },
];

const OFFICE_ORDERS = [
    {
        name: 'Điểm giao dịch 1',
        orderIn: 100,
        orderOut: 200,
    },
    {
        name: 'Điểm giao dịch 2',
        orderIn: 300,
        orderOut: 200,
    },
    {
        name: 'Điểm giao dịch 3',
        orderIn: 500,
        orderOut: 300,
    },
    {
        name: 'Điểm giao dịch 4',
        orderIn: 200,
        orderOut: 700,
    },
    {
        name: 'Điểm giao dịch 5',
        orderIn: 300,
        orderOut: 500,
    },
    {
        name: 'Điểm giao dịch 6',
        orderIn: 500,
        orderOut: 600,
    },
];

const STATION_ORDERS = [
    {
        name: 'Điểm tập kết 1',
        orderIn: 100,
        orderOut: 200,
    },
    {
        name: 'Điểm tập kết 2',
        orderIn: 300,
        orderOut: 200,
    },
    {
        name: 'Điểm tập kết 3',
        orderIn: 500,
        orderOut: 300,
    },
    {
        name: 'Điểm tập kết 4',
        orderIn: 200,
        orderOut: 700,
    },
    {
        name: 'Điểm tập kết 5',
        orderIn: 300,
        orderOut: 500,
    },
    {
        name: 'Điểm tập kết 6',
        orderIn: 500,
        orderOut: 600,
    },
];

const INCOME = [
    {
        name: 'Jan',
        value: 100,
    },
    {
        name: 'Feb',
        value: 200,
    },
    {
        name: 'Mar',
        value: 100,
    },
    {
        name: 'Apr',
        value: 400,
    },
    {
        name: 'May',
        value: 500,
    },
    {
        name: 'Jun',
        value: 200,
    },
    {
        name: 'Jul',
        value: 700,
    },
    {
        name: 'Aug',
        value: 300,
    },
    {
        name: 'Sep',
        value: 500,
    },
    {
        name: 'Oct',
        value: 300,
    },
    {
        name: 'Nov',
        value: 1000,
    },
    {
        name: 'Dec',
        value: 800,
    },
];

const COLORS = ['#289cf5', '#FFBB28', '#0088FE', '#00C49F', '#FF8042'];

function Boss() {
    const [stationLeads, setStationLeads] = useState([]);
    const [officeLeads, setOfficeLeads] = useState([]);
    const [stations, setStations] = useState([]);
    const [offices, setOffices] = useState([]);

    // Chart data
    const [orders, setOrders] = useState([]);
    const [officeOrder, setOfficeOrder] = useState([]);
    const [stationOrder, setStationOrder] = useState([]);
    const [income, setIncome] = useState([]);

    const toast = useContext(ToastContext);

    useEffect(() => {
        const url = window.history.state.prevUrl;
        if (url) {
            const urlComponents = url.split('/');
            const prevPage = urlComponents[urlComponents.length - 1];
            if (prevPage === 'authentication') {
                toast.showSuccessToast('Đăng nhập thành công');
            }
        }
        // console.log('[boss]', url);
    }, []);

    // Station leads
    useEffect(() => {
        stationLeadService.getAllStationLeads()
            .then(data => {
                setStationLeads(data);
            })
    }, []);

    // Office leads
    useEffect(() => {
        officeLeadService.getAllOfficeLeads()
            .then(data => {
                setOfficeLeads(data);
            })
    }, []);

    // Stations
    useEffect(() => {
        stationService.getAllStation()
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    data[i].create_date = new Date(data[i].create_date);
                    data[i].create_date = formatDate(data[i].create_date.toString());
                }
                console.log(data);
                setStations(data);
            })
    }, []);

    // Offices
    useEffect(() => {
        officeService.getAllOffice()
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    data[i].create_date = new Date(data[i].create_date);
                    data[i].create_date = formatDate(data[i].create_date.toString());
                }
                console.log(data);
                setOffices(data);
            })
    }, []);

    useEffect(() => {
        setOrders(ORDERS);
        setOfficeOrder(OFFICE_ORDERS);
        setStationOrder(STATION_ORDERS);
        setIncome(INCOME);
    }, []);
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header-wrapper')}>
                    <ul className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}>
                            <h3 className={cx('header')}>Trang chủ</h3>
                        </li>
                        <li className={cx('breadcrumb-item')}>
                            <FontAwesomeIcon className={cx('breadcrumb-icon')} icon={faHouse} />
                            Trang chủ
                        </li>
                    </ul>
                </div>
                <div className={cx('content')}>
                    <div className={cx('content-section', 'grid-col-4')}>
                        <div className={cx('card', 'info-card')}>
                            <div className={cx('info-wrapper')}>
                                <h3 className={cx('info-header')}>Trưởng tập kết</h3>
                                <h2 className={cx('info-number')}>{new Intl.NumberFormat().format(parseInt(stationLeads.length))}</h2>
                            </div>
                        </div>
                        <div className={cx('card', 'info-card')}>
                            <div className={cx('info-wrapper')}>
                                <h3 className={cx('info-header')}>Trưởng giao dịch</h3>
                                <h2 className={cx('info-number')}>{new Intl.NumberFormat().format(parseInt(officeLeads.length))}</h2>
                            </div>
                        </div>
                        <div className={cx('card', 'info-card')}>
                            <div className={cx('info-wrapper')}>
                                <h3 className={cx('info-header')}>Điểm tập kết</h3>
                                <h2 className={cx('info-number')}>{new Intl.NumberFormat().format(parseInt(stations.length))}</h2>
                            </div>
                        </div>
                        <div className={cx('card', 'info-card')}>
                            <div className={cx('info-wrapper')}>
                                <h3 className={cx('info-header')}>Điểm giao dịch</h3>
                                <h2 className={cx('info-number')}>{new Intl.NumberFormat().format(parseInt(offices.length))}</h2>
                            </div>
                        </div>
                    </div>
                    <div className={cx('grid-col-4-6')}>
                        <div className={cx('content-section')}>
                            <div className={cx('card', 'chart-card')}>
                                <h3 className={cx('chart-header')}>Thống kê tổng số hàng</h3>
                                <div className={cx('pie-chart-wrapper')}>
                                    <PieChart width={290} height={290}>
                                        <Pie 
                                            dataKey="value"
                                            isAnimationActive={true}
                                            data={orders}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            fill="#fe2c55"
                                            label
                                            startAngle={90}
                                            endAngle={-450}
                                        >
                                            {orders.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </div>
                            </div>
                        </div>
                        <div className={cx('content-section')}>
                            <div className={cx('card', 'chart-card')}>
                                <h3 className={cx('chart-header')}>Tổng doanh thu</h3>
                                <div className={cx('line-chart-wrapper')}>
                                    <LineChart width={500} height={300} data={income}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="value" stroke="#fe2c55" />
                                    </LineChart>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('grid-col-2')}>
                        <div className={cx('content-section')}>
                            <div className={cx('card', 'chart-card')}>
                                <h3 className={cx('chart-header')}>Thống kê hàng từng điểm giao dịch</h3>
                                <div className={cx('bar-chart-wrapper')}>
                                    <BarChart width={800} height={300} data={officeOrder}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="orderIn" fill="#289cf5" />
                                        <Bar dataKey="orderOut" fill="#FFBB28" />
                                    </BarChart>
                                </div>
                            </div>
                        </div>
                        <div className={cx('content-section')}>
                            <div className={cx('card', 'chart-card')}>
                                <h3 className={cx('chart-header')}>Thống kê hàng từng điểm tập kết</h3>
                                <div className={cx('bar-chart-wrapper')}>
                                    <BarChart width={800} height={300} data={stationOrder}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="orderIn" fill="#289cf5" />
                                        <Bar dataKey="orderOut" fill="#FFBB28" />
                                    </BarChart>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Boss;