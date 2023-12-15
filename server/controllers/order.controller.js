const Order = require('../models/order.model');
const User = require('../models/user.model');
const orderService = require('../services/orderService');
const constants = require("../utils/constants");

const create = async (req, res) => {
    try {
        const staff = await User.findOne({ email: req.user.email });
        const code = await orderService.generateOrderCode();
        const office = {
            office_id: staff.work_place,
            received_time: Date.now(),
            send_time: null,
            staff_id: staff.id
        }
        const order = new Order(
            {
                code: code,
                start_office: office,
                weight: req.body.weight,
                price: req.body.price,
                contents: req.body.contents,
            }
        )
        
        if (req.body.forward) {
            order.end_office = office
        }
        else {
            // create first station
        }
        await order.save();
        res.status(201).json({ message: 'Order added successfully', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }
}

const getOrders= async (req, res) => {
    try {
        let orders;
        const user = await User.findOne({email: req.user.email})
        // orders = await orderService.getAllOrdersByOfficeStaffID("657299afd9155a24a1916505");
        
        if (req.user.role === constants.ROLES.BOSS) {
            orders = await orderService.getAllOrders();
        }
        else if (req.user.role === constants.ROLES.STATION_LEAD) {
            orders = await orderService.getAllOrdersByStationID(user.work_place);
        }
        else if (req.user.role === constants.ROLES.OFFICE_LEAD) {
            orders = await orderService.getAllOrdersByOfficeID(user.work_place);
        }
        else {
            orders = await orderService.getAllOrdersByOfficeStaffID("657299afd9155a24a1916505");
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json(error);
    }
}

const forwardToStation = async (req, res) => {
    try {
        const { id } = req.params;
        const { station } = req.body;
        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        await Order.updateOne({ "_id": id }, { $set: { "start_station": station } });
        res.status(200).json({ message: "Order forwarded to station successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const forwardToOffice = async (req, res) => {

}

const confirmArrival = async (req, res) => {

}

const getDelivers = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.status(200).json(order.logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createDeliver = async (req, res) => {
    try {
        const { id } = req.params;
        const { deliver } = req.body;
        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        await Order.updateOne({ "_id": id }, { $push: { "logs": deliver } });
        res.status(200).json({ message: "Deliver created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    create,
    getOrders,
    forwardToStation,
    forwardToOffice,
    getDelivers,
    createDeliver,
    confirmArrival
}