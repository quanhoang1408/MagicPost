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
import * as orderService from '~/services/orderService';
import formatDate from '~/utils/formatDate';

const cx = classNames.bind(styles);

const OFFICE_ORDERS = [
    {
        name: 'Bưu cục Bách Khoa',
        orderIn: 10,
        orderOut: 2,
    },
    {
        name: 'Bưu cục Ba Vì',
        orderIn: 20,
        orderOut: 15,
    },
    {
        name: 'Bưu cục Ninh Bình',
        orderIn: 8,
        orderOut: 5,
    },
    {
        name: 'Bưu cục Trần Phú',
        orderIn: 5,
        orderOut: 7,
    },
    {
        name: 'Bưu cục Lâm Đồng',
        orderIn: 6,
        orderOut: 1,
    },
    {
        name: 'Bưu cục Đường Đệ',
        orderIn: 12,
        orderOut: 9,
    },
    {
        name: 'Bưu cục Thanh Xuân',
        orderIn: 3,
        orderOut: 4,
    },
    {
        name: 'Bưu cục Quang Trung',
        orderIn: 8,
        orderOut: 8,
    },
];

const STATION_ORDERS = [
    {
        name: 'Hà Nội',
        orderIn: 20,
        orderOut: 25,
    },
    {
        name: 'Đà Nẵng',
        orderIn: 30,
        orderOut: 20,
    },
    {
        name: 'Thanh Hóa',
        orderIn: 15,
        orderOut: 12,
    },
    {
        name: 'Bắc Giang',
        orderIn: 10,
        orderOut: 7,
    },
    {
        name: 'Ninh Bình',
        orderIn: 30,
        orderOut: 35,
    },
    {
        name: 'Quãng Ngãi',
        orderIn: 25,
        orderOut: 23,
    },
    {
        name: 'Bến Tre',
        orderIn: 20,
        orderOut: 22,
    },
    {
        name: 'Đà Lạt',
        orderIn: 40,
        orderOut: 35,
    },
];

const INCOME = [
    {
        name: '26/12/2023',
        value: 152,
    },
    {
        name: '27/12/2023',
        value: 100,
    },
    {
        name: '28/12/2023',
        value: 89,
    },
    {
        name: '29/12/2023',
        value: 203,
    },
];

const COLORS = ['#32CD32','#fe2c55', '#FFBB28', '#0088FE', '#00C49F', '#FF8042'];

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
    const [successOrder, setSuccessOrder] = useState(0);
    const [failOrder, setFailOrder] = useState(0);
    const [deliveryOrder, setDeliveryOrder] = useState(0);

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

    useEffect(() => {
        let success = 0, fail = 0, delivery = 0;
        orderService.getAllOrders().then(data => {
            console.log(data[0]);
            for(let i = 0; i < data.length; i++) {
                console.log("i", i, data[i].success);
                if(data[i].success === true) {
                    success++;
                }else if(data[i].success === false) {
                    fail++;
                }else if(data[i].success === null) {
                    delivery++;
                }
            }
            setSuccessOrder(success);
            setFailOrder(fail);
            setDeliveryOrder(delivery);
        })
    }, []);

    useEffect(() => {
        setOrders([
            { name: 'Thành công', value: successOrder },
            { name: 'Thất bại', value: failOrder },
            { name: 'Đang giao', value: deliveryOrder },
        ])
    }, [successOrder, failOrder, deliveryOrder]);
    // console.log(successOrder, failOrder, deliveryOrder);
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
        
        setOfficeOrder(OFFICE_ORDERS);
        setStationOrder(STATION_ORDERS);
        setIncome(INCOME);
    }, [successOrder, failOrder, deliveryOrder]);
    
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
                                <h3 className={cx('chart-header')}>Thống kê doanh thu</h3>
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