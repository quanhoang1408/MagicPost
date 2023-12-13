const Station = require('../models/station.model');

const stationController = {
    addStation: async(req, res) => {
        try {
            const { name, address } = req.body;
            const newStation = await Station.create({name, address});
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
    updateStation: async(req, res) => {
        try {
            const { name, address, station_lead } = req.body;
            const station = await Station.findById(req.params.id);
            if(!station) return res.status(404).json({message: "Station not found"});
            await Station.updateOne({"_id" : req.params.id},{$set: {name, station_lead, address} });
            res.status(200).json({message: "Station updated successfully"});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    deleteStation: async(req, res) => {
        try {
            const station = await Station.findById(req.params.id);
            if(!station) return res.status(404).json({message: "Station not found"});
            await Station.findByIdAndDelete(req.params.id);
            res.status(200).json({message: "Station deleted successfully"});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = stationController;