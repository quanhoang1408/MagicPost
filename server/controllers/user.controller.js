const User = require('../models/user.model');
const Station = require('../models/station.model');
const bcrypt = require('bcryptjs');

const addUser = async (req, res) => {
    try {
        const { email, name,password, role, work_place } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({message: "User already exists"});
        }
        //check for station_lead
        if( role == "station_lead"){
            const station = await Station.findById(work_place);
            console.log(station.station_lead);
            if(!station.station_lead.id){
                const user = await User.create({ email, name, password, role, work_place });
                await Station.updateOne({"_id" : user.work_place},{$set: {station_lead: {id:user._id, name:user.name}} });
                console.log("Station updated");
                return res.status(200).json({message: "Station lead created successfully", success: true, user});
            }else{
                return res.status(400).json({message: "Station lead already exists"});
            }
        }
        const user = await User.create({ email, name, password, role, work_place });
        res.status(200).json({message: "User created successfully", success: true, user});
    } catch (err) {
        res.status(500).json({message: err.message});
        console.log(err);
    }
}

const getUserInfoById = async (req, res) => {
    const userid = req.cookies.id;
    if (!userid) return res.status(401).json({message: "Unauthorized"});
    try {
        const user = await User.findById(userid);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json(err);
    }
}

const getAllStationLeads = async (req, res) => {
    try {
        let station_leads = await User.find({role: "station_lead"});
        for (let i = 0; i < station_leads.length; i++) {
            await Station.findById(station_leads[i].work_place).then(data => {
                station_leads[i].work_place_name = data.name;
            });
        }
        // console.log(station_leads)
        res.status(200).json(station_leads);
    } catch (err) {
        res.status(400).json(err);
    }
}

const updateUser = async (req, res) => {
    try {
        const { name, role, work_place } = req.body;
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({message: "User not found"});
        await User.updateOne({"_id" : req.params.id},{$set: { name, role, work_place} });
        res.status(200).json({message: "User updated successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({message: "User not found"});
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    addUser,
    getUserInfoById,
    getAllUsers,
    getAllStationLeads,
    updateUser,
    deleteUser
}