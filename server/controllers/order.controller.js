const Order = require('../models/order.model');

const orderController = {
    addOrder: async (req, res) => {
        try {
            const { code, start_office, end_office, start_station, end_station, creator, sender, receiver, logs } = req.body;
            const newOrder = await Order.create({ code, start_office, end_office, start_station, end_station, creator, sender, receiver, logs });
            res.status(201).json({ message: 'Order added successfully', newOrder });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find();
            res.status(200).json(orders);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}

module.exports = orderController;