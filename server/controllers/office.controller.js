const Office = require('../models/office.model');

const officeController = {
    addOffice: async(req, res) => {
        try {
            const {name, station, address, phone_number} = req.body;
            office_lead = null;
            const newOffice = await Office.create({name, station,office_lead, address, phone_number});
            res.status(201).json({message: 'Office added successfully', newOffice});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    getOffice: async(req, res) => {
        try {
            const station = await Office.find();
            res.status(200).json(station);
        } catch (error) {
            res.status(400).json(error);
        }
    },
}

module.exports = officeController;