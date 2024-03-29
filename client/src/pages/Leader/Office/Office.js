import classNames from "classnames/bind";
import styles from './Office.module.scss';
import { useEffect, useState } from "react";

import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid } from 'recharts';
import { LineChart, Line } from 'recharts';

import * as officeEmployeeService from '~/services/officeEmployeeService';
import * as orderService from '~/services/orderService';
import formatDate from '~/utils/formatDate';

const cx = classNames.bind(styles);

const COLORS = ['#5ad529','#fe2c55', '#FFBB28'];

function Office() {
    const [orderPie, setOrderPie] = useState([]);
    const [orderLine, setOrderLine] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [orders, setOrders] = useState({});
    const [total, setTotal] = useState({
        totalSuccess: 0,
        totalFail: 0,
        totalCreate: 0
    });
    
    useEffect(() => {
        orderService.getStationOrder()
            .then(data => {
                setOrders(data);
                // console.log(data);
                // console.log(orders);
            })
    }, [])
    
    // For line chart
    useEffect(() => {
        const line = Array(5);
        let { totalSuccess, totalFail, totalCreate } = total;
        for (let i = 0; i < 5; i++) {
            line[i] = {
                name: `${formatDate(new Date(Date.now() - 86400000 * (4 - i)))}`,
                success: 0,
                fail: 0,
                create: 0
            }
        }
        if (orders.finished !== undefined) {
            // console.log(orders)
            orders.finished.forEach(order => {
                console.log(order.end_office.received_time)
                const date = order.end_office.received_time;
                const index = parseInt(5 - ((new Date()).setHours(23, 59, 59) - new Date(date)) / 86400000);
                console.log(index)
                if (index >= 0) {
                    if (order.success === true)
                        line[index].success++;
                    else
                        line[index].fail++;
                    // if (order.start_office === orders.office_id)
                    //     line[index].create++;
                }
                if (order.success === true)
                    totalSuccess++;
                else
                    totalFail++;
            })
            const dum = orders.finished.concat(
                orders.sending,
                orders.sent,
                orders.arrived
            )
            console.log(orders.office_id)
            console.log(dum)
            dum.forEach(order => {
                if (order.start_office.office_id === orders.office_id) {
                    console.log(order.start_office)
                    const date = order.start_office.send_time;
                    const index = parseInt(5 - ((new Date()).setHours(23, 59, 59) - new Date(date)) / 86400000);
                    console.log(index)
                    if (index >= 0) {
                        line[index].create++;
                    }
                    totalCreate++;
                }
            })
            console.log(line)
            // orders.sending.f
        }
        setTotal({
            totalSuccess,
            totalFail,
            totalCreate
        })
        console.log(total)
        
        setOrderLine(line)
        // setOrderLine(ORDER)
    }, [orders]);
    
    // For pie chart
    useEffect(() => {
        if (orders.finished !== undefined) {
            setOrderPie([
                {
                    name: 'Tổng đơn hàng gửi thành công',
                    value: total.totalSuccess,
                },
                {
                    name: 'Tổng đơn hàng gửi thất bại',
                    value: total.totalFail,
                },
            ]);
        }
        
    }, [orderLine]);

    useEffect(()=> {
        officeEmployeeService.getAllOfficeEmployee()
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
                        <h3 className={cx('chart-header')}>Thống kê hàng gửi</h3>
                        <div className={cx('pie-chart-wrapper')}>
                            <PieChart width={290} height={290}>
                                <Pie 
                                    dataKey="value"
                                    isAnimationActive={true}
                                    data={orderPie}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
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
                            <LineChart width={570} height={300} data={orderLine}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="success" stroke="#5ad529" />
                                <Line type="monotone" dataKey="fail" stroke="#fe2c55" />
                                <Line type="monotone" dataKey="create" stroke="#FFBB28" />
                            </LineChart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Office;