const Order = require('../models/order.model');
const User = require('../models/user.model');
const dateUtil = require('../utils/dateUtil')
const constants = require("../utils/constants");

const getAllOrders = async() => {
    try {
        const orders = await Order.find();
        return orders
    } catch (error) {
        return error;
    }
}

const getAllOrdersByStationID = async(id) => {
    try {
        const orders = await Order.find({stations: {$elemMatch: {station_id: id}}})
        return orders
    } catch (error) {
        return error;
    }
}

const getAllOrdersByOfficeID = async(id) => {
    try {
        const orders = await Order.find().or([{start_office: id}, {end_office: id}]);
        return orders
    } catch (error) {
        return error;
    }
}

const getAllOrdersByStationStaffID = async(id) => {
    try {
        const user = await User.findById(id);
        const users_query = await User.find({work_place: user.work_place});
        const users = new Map(
            users_query.map((user) => [user._id.toString(), user.name])
        );
        // console.log(users)
        
        const result = {
            arriving: [],
            forwarding: [],
            finished: []
        }
        const orders = await Order.find({stations: {$elemMatch: {station_id: user.work_place}}});
        // console.log(orders)
        
        orders.forEach(order => {
            if (order.stations[order.stations.length - 1].station_id.toString() === user.work_place.toString()) {
                // console.log("haha")
                if (order.end_office === null) {
                    // console.log("hahaha")
                    result.arriving.push(order);
                }
                // else if (user.role === constants.ROLES.STATION_LEAD || user.id.toString() === order.stations[order.stations.length - 1].staff_id.toString()) {
                else {
                    order.destination = order.end_office.office_id;
                    const staff_name = users.get(order.stations[order.stations.length - 1].staff_id.toString())
                    const dum = {
                        ...order.toObject(),
                        staff_name: staff_name
                    }
                    if (order.end_office.staff_id === null || order.end_office.staff_id === undefined)
                        result.forwarding.push(dum);
                    else
                        result.finished.push(dum);
                }
            }
            else {
                for (let i = 0; i < order.stations.length - 1; i++) {
                    if (order.stations[i].station_id.toString() === user.work_place.toString()) {
                        // if (user.role === constants.ROLES.STATION_LEAD || user.id.toString() === order.stations[i].staff_id.toString()) {
                        // order.destination = order.stations[i + 1].station_id;
                        const staff_name = users.get(order.stations[i].staff_id.toString())
                        if (order.stations[i + 1].staff_id === null || order.stations[i + 1].staff_id === undefined)
                            result.forwarding.push({
                                ...order.toObject(),
                                staff_name});
                        else
                            result.finished.push({
                                ...order.toObject(),
                                staff_name
                            });
                        // }
                        break
                    }
                }
            }
        });
        
        return result
    } catch (error) {
        return error;
    }
}

const getAllOrdersByOfficeStaffID = async(id) => {
    try {
        const user = await User.findById(id);
        const users_query = await User.find({work_place: user.work_place});
        const users = new Map(
            users_query.map((user) => [user._id.toString(), user.name])
        );
        // console.log(user.work_place);
        const result = {
            arriving: [],
            arrived: [],
            finished: [],
            sending: [],
            sent: []
        }
        // const orders = await Order.find({end_office: {office_id: user.work_place}})
        const orders = await Order.find({ $or:[ {"end_office.office_id": user.work_place},
                {"start_office.office_id": user.work_place}] } )
        // console.log(orders)
        
        orders.forEach(order => {
            if (order.start_office.office_id.toString() === user.work_place.toString()
                && (order.end_office === null || order.end_office === undefined || order.end_office.office_id.toString() !== user.work_place.toString())) {
                // if (user.role === constants.ROLES.OFFICE_LEAD || user.id.toString() === order.start_office.staff_id.toString()) {
                const staff_name = users.get(order.start_office.staff_id.toString())
                if (order.stations[0].staff_id === null || order.stations[0].staff_id === undefined)
                    result.sending.push({
                        ...order.toObject(),
                        staff_name
                    })
                else
                    result.sent.push({
                        ...order.toObject(),
                        staff_name
                    })
                // }
            }
            else if (order.end_office.staff_id === null || order.end_office.staff_id === undefined) {
                result.arriving.push(order);
            }
            
            // else if (order.end_office.staff_id.toString() === user.id.toString() || user.role === constants.ROLES.OFFICE_LEAD) {
            else {
                if (order.success !== null) {
                    const staff_name = users.get(order.end_office.staff_id.toString())
                    result.finished.push({
                        ...order.toObject(),
                        staff_name
                    });
                }
                else {
                    const staff_name = users.get(order.end_office.staff_id.toString())
                    result.arrived.push({
                        ...order.toObject(),
                        staff_name
                    });
                }
            }
        });
        
        return result
    } catch (error) {
        return error;
    }
}

const validateForwardStation = (user, order) => {
    try {
        if (order.stations.length > 0) return order.stations[order.stations.length - 1].station_id.toString() === user.work_place.toString();
        return order.start_office.office_id.toString() === user.work_place.toString()
    } catch (error) {
        return error;
    }
}

const generateOrderCode = async () => {
    const order = {}
    // Generate a timestamp-based order ID
    const timestamp = new Date().toISOString().replace(/\D/g, ''); // Remove non-numeric characters from timestamp
    order.code = `ORD-${timestamp}`; // Prefix with 'ORD-' for orders
    // order.qr = await qrcode.toDataURL(order.code)
    return order.code;
}

const getOrderLogs = (order, stations, offices) => {
    const res = []
    // console.log(order)
    // console.log(order.stations)
    // console.log(stations)
    // console.log(offices)
    
    if (order.stations) {
        order.stations.forEach(station => {
            if (station.received_time) res.push(`Đã đến điểm tập kết ${stations.get(station.station_id.toString())} lúc ${dateUtil.formatDateTime(station.received_time)}`)
            else res.push(`Đang vận chuyển tới điểm tập kết ${stations.get(station.station_id.toString())}`)
        })
    }
    // console.log(order.sta}tions)
    if (order.end_office) {
        if (order.end_office.received_time) {
            res.push(`Đã đến điểm giao dịch ${offices.get(order.end_office.office_id.toString())} lúc ${dateUtil.formatDateTime(order.end_office.received_time)}`)
            if (order.success) res.push(`Đơn hàng gửi thành công`)
            else res.push(`Đơn hàng gửi thất bại`)
        }
        else res.push(`Đang vận chuyển tới điểm giao dịch ${offices.get(order.end_office.office_id.toString())}`)
    }
    return res
}

const getBossStats = async (station_id) => {
    try {
    
    } catch (error) {
        return error;
    }
}

const getOfficeLeadStats = async (office_id) => {
    try {
        // console.log(office_id)
        const orders = await Order.find({
            $or: [
                { "end_office.office_id": office_id },
                { "start_office.office_id": office_id }
            ]
        });
        console.log(orders)
        return orders
        
    } catch (error) {
        return error;
    }
}

const getStationLeadStats = async (station_id) => {
    try {
        const orders = await Order.find({stations: {$elemMatch: {station_id: station_id}}})
        console.log(orders)
        return orders
    } catch (error) {
        return error;
    }
    
}

module.exports = {
    getAllOrders,
    getAllOrdersByStationID,
    getAllOrdersByOfficeID,
    getAllOrdersByStationStaffID,
    getAllOrdersByOfficeStaffID,
    generateOrderCode,
    validateForwardStation,
    getOrderLogs,
    getBossStats,
    getOfficeLeadStats,
    getStationLeadStats
}