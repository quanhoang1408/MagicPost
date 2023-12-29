import classNames from "classnames/bind";
import styles from './Station.module.scss';
import { useEffect, useState } from "react";

import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid } from 'recharts';
import { LineChart, Line } from 'recharts';

import * as stationEmployeeService from '~/services/stationEmployeeService';
import * as orderService from '~/services/orderService';
import formatDate from '~/utils/formatDate';

const cx = classNames.bind(styles);

const ORDER = [
    {
        name: 'Jan',
        orderIn: 100,
        orderOut: 200,
    },
    {
        name: 'Feb',
        orderIn: 200,
        orderOut: 300,
    },
    {
        name: 'Mar',
        orderIn: 100,
        orderOut: 600,
    },
    {
        name: 'Apr',
        orderIn: 400,
        orderOut: 200,
    },
    {
        name: 'May',
        orderIn: 500,
        orderOut: 300,
    },
    {
        name: 'Jun',
        orderIn: 200,
        orderOut: 600,
    },
    {
        name: 'Jul',
        orderIn: 700,
        orderOut: 200,
    },
    {
        name: 'Aug',
        orderIn: 300,
        orderOut: 400,
    },
    {
        name: 'Sep',
        orderIn: 500,
        orderOut: 300,
    },
    {
        name: 'Oct',
        orderIn: 300,
        orderOut: 400,
    },
    {
        name: 'Nov',
        orderIn: 1000,
        orderOut: 300,
    },
    {
        name: 'Dec',
        orderIn: 800,
        orderOut: 500,
    },
]

const COLORS = ['#289cf5', '#FFBB28', '#0088FE', '#00C49F', '#FF8042'];

function Station() {
    const [orderPie, setOrderPie] = useState([]);
    const [orderLine, setOrderLine] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [orders, setOrders] = useState({});
    
    useEffect(() => {
        orderService.getStationOrder()
            .then(data => {
                setOrders(data);
            })
    }, [])

    // For line chart
    useEffect(() => {
        const line = Array(5);
        for (let i = 0; i < 5; i++) {
            line[i] = {
                name: `${formatDate(new Date(Date.now() - 86400000 * (4 - i)))}`,
                orderIn: 0,
                orderOut: 0,
            }
        }
        if (orders.finished !== undefined) {
            orders.finished.forEach(order => {
                let date
                order.stations.forEach(station => {
                    // console.log(station)
                    if (station.station_id === orders.station_id) {
                        date = station.send_time;
                        // console.log("hi")
                        // console.log(station)
                    }
                })
                // console.log(Date.now() - date)
                // console.log(Date.now())
                const index = parseInt(4 - (Date.now() - new Date(date)) / 86400000);
                // console.log(index)
                if (index >= 0) {
                    line[index].orderIn++;
                }
            })
            orders.forwarding.forEach(order => {
                let date
                order.stations.forEach(station => {
                    // console.log(station)
                    if (station.station_id === orders.station_id) {
                        date = station.send_time;
                        // console.log("hi")
                        // console.log(station)
                    }
                })
                // console.log(Date.now() - date)
                // console.log(Date.now())
                const index = parseInt(4 - (Date.now() - new Date(date)) / 86400000);
                // console.log(index)
                if (index >= 0) {
                    line[index].orderIn++;
                }
            })
        }
        
        setOrderLine(line)
        // setOrderLine(ORDER)
    }, [orders]);

    // For pie chart
    useEffect(() => {
        if (orders.finished !== undefined) {
            setOrderPie([
                {
                    name: 'Tổng đơn hàng đang đến',
                    value: orders.arriving.length,
                },
                {
                    name: 'Tổng đơn hàng gửi',
                    value: orders.forwarding.length + orders.finished.length,
                },
            ]);
        }
        
    }, [orderLine]);

    useEffect(()=> {
        stationEmployeeService.getAllStationEmployees()
            .then(data => {
                setEmployees(data);
            })
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-section', 'grid-col-3')}>
                <div className={cx('card', 'info-card')}>
                    <div className={cx('info-wrapper')}>
                        <h3 className={cx('info-header')}>Nhân viên</h3>
                        <h2 className={cx('info-number')}>{new Intl.NumberFormat().format(parseInt(employees.length))}</h2>
                    </div>
                </div>
                <div className={cx('card', 'info-card')}>
                    <div className={cx('info-wrapper')}>
                        <h3 className={cx('info-header')}>Đơn hàng đang đến</h3>
                        <h2 className={cx('info-number')}>{new Intl.NumberFormat().format(parseInt((orderPie.length > 0) ? orderPie[0].value : 0))}</h2>
                    </div>
                </div>
                <div className={cx('card', 'info-card')}>
                    <div className={cx('info-wrapper')}>
                        <h3 className={cx('info-header')}>Đơn hàng gửi</h3>
                        <h2 className={cx('info-number')}>{new Intl.NumberFormat().format(parseInt((orderPie.length > 0) ? orderPie[1].value : 0))}</h2>
                    </div>
                </div>
            </div>
            <div className={cx('grid-col-4-6')}>
                <div className={cx('content-section')}>
                    <div className={cx('card', 'chart-card')}>
                        <h3 className={cx('chart-header')}>Thống kê  hàng</h3>
                        <div className={cx('pie-chart-wrapper')}>
                            <PieChart width={290} height={290}>
                                <Pie 
                                    dataKey="value"
                                    isAnimationActive={true}
                                    data={orderPie}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#fe2c55"
                                    label
                                    startAngle={90}
                                    endAngle={-450}
                                >
                                    {orderPie.map((entry, index) => (
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
                        <h3 className={cx('chart-header')}>Thống kê hàng chi tiết</h3>
                        <div className={cx('line-chart-wrapper')}>
                            <LineChart width={500} height={300} data={orderLine}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="orderOut" stroke="#289cf5" />
                                <Line type="monotone" dataKey="orderIn" stroke="#FFBB28" />
                            </LineChart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Station;