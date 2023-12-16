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
        const orders = await Order.find().or([{first_station: id}, {second_station: id}]);
        return orders
    } catch (error) {
        return error;
    }
}

const getAllOrdersByOfficeID = async(id) => {
    try {
        const orders = await Order.find().or([{first_office: id}, {second_office: id}]);
        return orders
    } catch (error) {
        return error;
    }
}

const getAllOrdersByOfficeStaffID = async(id) => {
    try {
        const office = await User.findById(id);
        console.log(office.work_place);
        const orders = await Order.find({user: id});
        return orders
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


module.exports = {
    getAllOrders,
    getAllOrdersByStationID,
    getAllOrdersByOfficeID,
    getAllOrdersByOfficeStaffID,
    generateOrderCode,
    validateForwardStation
}