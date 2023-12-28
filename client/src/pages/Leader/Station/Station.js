import classNames from "classnames/bind";
import styles from './Station.module.scss';
import { useEffect, useState } from "react";

import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid } from 'recharts';
import { LineChart, Line } from 'recharts';

import * as stationEmployeeService from '~/services/stationEmployeeService';

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

    // For line chart
    useEffect(() => {
        setOrderLine(ORDER);
    }, []);

    // For pie chart
    useEffect(() => {
        if (orderLine.length > 0) {
            setOrderPie([
                {
                    name: 'Tổng đơn hàng gửi',
                    value: orderLine.reduce((total, order) => {
                        return total + order.orderOut;
                    }, 0),
                },
                {
                    name: 'Tổng đơn hàng nhận',
                    value: orderLine.reduce((total, order) => {
                        return total + order.orderIn;
                    }, 0),
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
                        <h3 className={cx('info-header')}>Đơn hàng gửi</h3>
                        <h2 className={cx('info-number')}>{new Intl.NumberFormat().format(parseInt((orderPie.length > 0) ? orderPie[0].value : 0))}</h2>
                    </div>
                </div>
                <div className={cx('card', 'info-card')}>
                    <div className={cx('info-wrapper')}>
                        <h3 className={cx('info-header')}>Đơn hàng nhận</h3>
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