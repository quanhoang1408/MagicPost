const Order = require('../models/order.model');
const User = require('../models/user.model');
const Office = require('../models/office.model');
const Station = require('../models/station.model');
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
                sender: req.body.sender,
                receiver: req.body.receiver,
                category: req.body.category,
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
        // console.log(user)
        
        if (req.user.role === constants.ROLES.BOSS) {
            orders = await orderService.getAllOrders();
        }
        // else if (req.user.role === constants.ROLES.STATION_LEAD) {
        //     orders = await orderService.getAllOrdersByStationID(user.work_place);
        // }
        // else if (req.user.role === constants.ROLES.OFFICE_LEAD) {
        //     orders = await orderService.getAllOrdersByOfficeID(user.work_place);
        // }
        else if (req.user.role === constants.ROLES.STATION_STAFF || req.user.role === constants.ROLES.STATION_LEAD) {
            orders = await orderService.getAllOrdersByStationStaffID(user.id);
        }
        else {
            orders = await orderService.getAllOrdersByOfficeStaffID(user.id);
        }
        // console.log(orders)
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json(error);
    }
}

const stats = async (req, res) => {
    try {
        const user = await User.findOne({email: req.user.email})
        if (req.user.role === constants.ROLES.BOSS) {
            const stats = await orderService.getBossStats();
            res.status(200).json(stats);
        }
        else if (req.user.role === constants.ROLES.STATION_LEAD) {
            const stats = await orderService.getStationLeadStats(user.work_place);
            res.status(200).json(stats);
        }
        else if (req.user.role === constants.ROLES.OFFICE_LEAD) {
            const stats = await orderService.getOfficeLeadStats(user.work_place);
            res.status(200).json(stats);
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json(error);
    }
}

const getOrdersCreated = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        const users_query = await User.find({});
        const users = new Map(
            users_query.map((user) => [user._id.toString(), user.name])
        );
        
        const orders = await Order.find({ "start_office.office_id": user.work_place });
        
        const ordersWithStaffNames = orders.map((order) => {
            const staffName = users.get(order.start_office.staff_id.toString());
            return { ...order.toObject(), staff_name: staffName };
        });
        
        // console.log(ordersWithStaffNames);
        
        res.status(200).json(ordersWithStaffNames);
    } catch (error) {
        res.status(400).json(error);
    }
};

const forward = async (req, res) => {
    try {
        const { id } = req.params;
        const { dest_id, is_to_station } = req.body;
        const order = await Order.findById(id);
        const staff = await User.findOne({ email: req.user.email });
        
        console.log(order)
        
        if (!order) return res.status(404).json({ message: "Order not found" });
        if (order.stations.length === 0)
            return res.status(400).json({ message: "Cannot forward order" });
        
        order.stations[order.stations.length - 1].received_time = new Date();
        order.stations[order.stations.length - 1].send_time = new Date();
        order.stations[order.stations.length - 1].staff_id = staff.id
        if (is_to_station) order.stations.push({station_id: dest_id})
        else order.end_office = { office_id: dest_id }
        console.log("hi")
        await order.save();
        console.log("hi")
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
        res.status(200).json({success:true, message: "Deliver created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOrderLogsByCode = async (req, res) => {
    try {
        const { code } = req.params;
        const order = await Order.findOne({ code: code });
        const stations_query = await Station.find({})
        const offices_query = await Office.find({})
        const stations = new Map(
            stations_query.map(station => [station._id.toString(), station.name])
        )
        const offices = new Map(
            offices_query.map(office => [office._id.toString(), office.name])
        )
        if (!order) return res.status(404).json({ message: "Order not found" });
        // if (order.length !== 1) return res.status(400).json({ message: "Invalid order" });
        // console.log(stations)
        return res.status(200).json({
            order: order,
            log: orderService.getOrderLogs(order, stations, offices)
        })
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateOrder = (req, res) => {
    try {
        const id = req.params.id;
        Order.findById(id).then((order) => {
            if (!order) return res.status(404).json({ message: "Order not found" });
            order.weight = req.body.weight;
            order.price = req.body.price;
            order.contents = req.body.contents;
            order.sender = req.body.sender;
            order.receiver = req.body.receiver;
            order.category = req.body.category;
            order.save();
            res.status(200).json({ message: "Order updated successfully" });
        })
        // console.log(order_id);
        // if (!order_id) return res.status(404).json({ message: "Order not found" });
        // console.log(req.body);
        // order.weight = req.body.weight;
        // order.price = req.body.price;
        // order.contents = req.body.contents;
        // order.sender = req.body.sender;
        // order.receiver = req.body.receiver;
        // order.category = req.body.category;
        // order.save();
        // res.status(200).json({ message: "Order updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    create,
    stats,
    getOrders,
    getAllOrders,
    getOrdersCreated,
    forward,
    getDelivers,
    createDeliver,
    confirmArrival,
    getOrderLogsByCode,
    updateOrder
}