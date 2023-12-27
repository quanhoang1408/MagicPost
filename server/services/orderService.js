const Order = require('../models/order.model');
const User = require('../models/user.model');

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
        const result = {
            arriving: [],
            forwarding: [],
            finished: []
        }
        const orders = await Order.find({stations: {$elemMatch: {station_id: user.work_place}}});
        
        orders.forEach(order => {
            if (order.stations[order.stations.length - 1].station_id.toString() === user.work_place.toString()) {
                console.log("haha")
                if (order.end_office === null) {
                    console.log("hahaha")
                    result.arriving.push(order);
                }
                else if (order.end_office.staff_id === null || order.end_office.staff_id === undefined) {
                    order.destination = order.end_office.office_id;
                    result.forwarding.push(order);
                }
                else {
                    order.destination = order.end_office.office_id;
                    result.finished.push(order);
                }
            }
            else {
                for (let i = 0; i < order.stations.length - 1; i++) {
                    if (order.stations[i].station_id === user.work_place) {
                        order.destination = order.stations[i + 1].station_id;
                        result.forwarding.push(order);
                        break;
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
                {"start_office.staff_id": user._id}] } )
        // console.log(orders)
        
        orders.forEach(order => {
            if (order.start_office.staff_id.toString() === user._id.toString()
                && (order.end_office === null || order.end_office === undefined || order.end_office.office_id.toString() !== user.work_place.toString())) {
                if (order.stations[0].staff_id === null || order.stations[0].staff_id === undefined) {
                    result.sending.push(order);
                }
                else {
                    result.sent.push(order);
                }
            }
            else if (order.end_office.staff_id === null || order.end_office.staff_id === undefined) {
                result.arriving.push(order);
            }
            else if (order.success === null) {
                result.arrived.push(order);
            }
            else {
                result.finished.push(order);
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
    console.log(order.stations)
    console.log(stations)
    
    if (order.stations) {
        order.stations.forEach(station => {
            if (station.received_time) res.push(`Received at ${stations.get(station.station_id.toString())} on ${station.received_time}`)
            else res.push(`Arriving to ${stations.get(station.station_id.toString())} station`)
        })
    }
        // console.log(order.sta}tions)
    if (order.end_office) {
        if (order.end_office.received_time) {
            res.push(`Received at ${offices[order.end_office.office_id]} on ${order.end_office.received_time}`)
            if (order.success) res.push(`Order completed`)
            else res.push(`Order failed`)
        }
        else res.push(`Arriving to ${order.end_office.office_id.name}`)
    }
    return res
}

module.exports = {
    getAllOrders,
    getAllOrdersByStationID,
    getAllOrdersByOfficeID,
    getAllOrdersByStationStaffID,
    getAllOrdersByOfficeStaffID,
    generateOrderCode,
    validateForwardStation,
    getOrderLogs
}