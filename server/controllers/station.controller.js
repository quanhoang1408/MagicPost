const Station = require('../models/station.model');

const stationController = {
    addStation: async(req, res) => {
        try {
            const { name, address, phone_number } = req.body;
            station_lead = {id: null, name: null}
            const newStation = await Station.create({name, address, phone_number, station_lead});
            res.status(201).json({message: 'Station added successfully', newStation});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    getStation: async(req, res) => {
        try {
            const station = await Station.find();
            res.status(200).json(station);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    getStationById: async(req, res) => {
        try {
            const station = await Station.findById(req.params.id);
            if(!station) return res.status(404).json({message: "Station not found"});
            res.status(200).json(station);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    updateStation: async(req, res) => {
        try {
            const { name, address, station_lead, phone_number } = req.body;
            const station = await Station.findById(req.params.id);
            if(!station) return res.status(404).json({message: "Station not found"});
            await Station.updateOne({"_id" : req.params.id},{$set: {name, station_lead, address, phone_number} });
            res.status(200).json({message: "Station updated successfully"});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    deleteStation: async(req, res) => {
        try {
            const station = await Station.findById(req.params.id);
            if(!station) return res.status(404).json({success: false,message: "Station not found"});
            await Station.findByIdAndDelete(req.params.id);
            res.status(200).json({success: true, message: "Station deleted successfully"});
        } catch (error) {
            res.status(500).json({success:true, message: error.message});
        }
    }
}

module.exports = stationController;