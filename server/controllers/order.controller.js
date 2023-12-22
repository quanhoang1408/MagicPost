const Order = require('../models/order.model');
const User = require('../models/user.model');
const Office = require('../models/office.model');
const orderService = require('../services/orderService');
const constants = require("../utils/constants");

const create = async (req, res) => {
    try {
        const staff = await User.findOne({ email: req.user.email });
        const code = await orderService.generateOrderCode();
        const office = {
            office_id: staff.work_place,
            received_time: new Date(),
            send_time: new Date(),
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
        
        if (!req.body.forward) {
            order.end_office = office
        }
        else {
            const office = await Office.findOne({_id: staff.work_place})
            order.stations.push({station_id: office.station})
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
        console.log(user)
        
        if (req.user.role === constants.ROLES.BOSS) {
            orders = await orderService.getAllOrders();
        }
        else if (req.user.role === constants.ROLES.STATION_LEAD) {
            orders = await orderService.getAllOrdersByStationID(user.work_place);
        }
        else if (req.user.role === constants.ROLES.OFFICE_LEAD) {
            orders = await orderService.getAllOrdersByOfficeID(user.work_place);
        }
        else if (req.user.role === constants.ROLES.STATION_STAFF) {
            orders = await orderService.getAllOrdersByStationStaffID(user.id);
        }
        else {
            orders = await orderService.getAllOrdersByOfficeStaffID(user.id);
        }
        console.log(orders)
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json(error);
    }
}

const forward = async (req, res) => {
    try {
        const { id } = req.params;
        const { dest_id, is_to_station } = req.body;
        const order = await Order.findById(id);
        const staff = await User.findOne({ email: req.user.email });
        
        if (!order) return res.status(404).json({ message: "Order not found" });
        if (order.stations.length === 0)
            return res.status(400).json({ message: "Cannot forward order" });
        
        order.stations[order.stations.length - 1].received_time = new Date();
        order.stations[order.stations.length - 1].send_time = new Date();
        order.stations[order.stations.length - 1].staff_id = staff.id
        if (is_to_station) order.stations.push({station_id: dest_id})
        else order.end_office = { office_id: dest_id }
        await order.save();
        res.status(200).json({ message: "Order forwarded to station successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const confirmArrival = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        const staff = await User.findOne({ email: req.user.email });
        
        if (!order) return res.status(404).json({ message: "Order not found" });
        if (order.end_office.office_id.toString() !== staff.work_place.toString())
            return res.status(400).json({ message: "Cannot confirm arrival" });
        
        order.end_office.received_time = new Date();
        order.end_office.staff_id = staff.id;
    
        await order.save();
        res.status(200).json({ message: "Order arrived successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getDelivers = async (req, res) => {
    try {
        const staff = await User.findOne({ email: req.user.email });
        const orders = await Order.find({ "end_office.office_id": staff.work_place });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createDeliver = async (req, res) => {
    try {
        const { id } = req.params;
        const { success } = req.body;
        const order = await Order.findById(id);
        
        if (!order) return res.status(404).json({ message: "Order not found" });
        
        order.success = success;
        await order.save();
        res.status(200).json({ message: "Deliver created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    create,
    getOrders,
    forward,
    getDelivers,
    createDeliver,
    confirmArrival
}