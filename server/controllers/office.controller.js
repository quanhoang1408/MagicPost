const {Office} = require('../models/office.model');

const officeController = {
    addOffice: async(req, res) => {
        try {
            console.log("hi");
            const {name, office_lead, station} = req.body;
            res.status(200).json(req.body);
            // const newStation = new Station({name, station_lead});
            // await newStation.save();
            // res.status(201).json({message: 'Station added successfully'});
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