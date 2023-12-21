const Office = require('../models/office.model');
const Station = require('../models/station.model');

const officeController = {
    addOffice: async(req, res) => {
        try {
            const {name, station, address, phone_number} = req.body;
            office_lead = {id: null, name: null};
            const newOffice = await Office.create({name, station,office_lead, address, phone_number});
            res.status(201).json({success: true, message: 'Office added successfully', newOffice});
        } catch (error) {
            res.status(500).json({success: false, message: error.message});
        }
    },
    getOffice: async(req, res) => {
        try {
            const office = await Office.find();
            for (let i = 0; i < office.length; i++) {
                await Station.findById(office[i].station).then(data => {
                    office[i].station_name = data.name;
                });
            }
            res.status(200).json(office);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    getOfficeHasNoLead: async(req, res) => {
        try {
            const office = await Office.find({"office_lead.id" : null});
            res.status(200).json(office);
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