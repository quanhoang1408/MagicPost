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
    deleteOffice: async(req, res) => {
        try {
            const station = await Office.findById(req.params.id);
            if(!station) return res.status(404).json({message: "Office not found"});
            await Office.findByIdAndDelete(req.params.id);
            res.status(200).json({success: true, message: "Office deleted successfully"});
        } catch (error) {
            res.status(500).json({success:false, message: error.message});
        }
    },
    updateOffice: async(req, res) => {
        try {
            const { name, address, office_lead, station, phone_number } = req.body;
            const office = await Office.findById(req.params.id);
            if(!office) return res.status(404).json({success: false, message: "Office not found"});
            await Office.updateOne({"_id" : req.params.id},{$set: {name, station, address, office_lead, phone_number} });
            res.status(200).json({success: true, message: "Office updated successfully"});
        } catch (error) {
            res.status(500).json({success: false, message: error.message});
        }
    },

}

module.exports = officeController;