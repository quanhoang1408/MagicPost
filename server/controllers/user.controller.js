const User = require('../models/user.model');
const Station = require('../models/station.model');
const Office = require('../models/office.model');

const addUser = async (req, res) => {
    try {
        console.log(req.body);
        const { email, name,password, role, work_place, sex, phone_number } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({message: "User already exists"});
        }
        //check for station_lead
        if( role == "station_lead"){
            const station = await Station.findById(work_place);
            if(!station.station_lead.id){
                const user = await User.create({ email, name, password, role, work_place, sex, phone_number });
                await Station.updateOne({"_id" : user.work_place},{$set: {station_lead: {id:user._id, name:user.name}} });
                console.log("Station updated");
                return res.status(200).json({success: true, message: "Station lead created successfully", user});
            }else{
                return res.status(400).json({success: false,message: "Station lead already exists"});
            }
        }
        if( role == "office_lead"){
            const office = await Office.findById(work_place);
            if(!office.office_lead.id){
                const user = await User.create({ email, name, password, role, work_place, sex, phone_number });
                await Office.updateOne({"_id" : user.work_place},{$set: {office_lead: {id:user._id, name:user.name}} });
                console.log("Office updated");
                return res.status(200).json({success: true, message: "Office lead created successfully", user});
            }else{
                return res.status(400).json({success: false,message: "Office lead already exists"});
            }
        }
        const user = await User.create({ email, name, password, role, work_place, sex, phone_number });
        res.status(200).json({success: true, message: "User created successfully", success: true, user});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
        console.log(err);
    }
}

const getUserInfoById = async (req, res) => {
    const userid = req.cookies.id;
    if (!userid) return res.status(401).json({message: "Unauthorized"});
    try {
        const user = await User.findById(userid);
        if(user.role == "station_lead"|| user.role == "station_staff"){
            await Station.findById(user.work_place).then(data => {
                user.work_place_name = data.name;
            });
        }
        if(user.role == "office_lead"|| user.role == "office_staff"){
            await Office.findById(user.work_place).then(data => {
                user.work_place_name = data.name;
            });
        }
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
        console.log(station_leads)
        res.status(200).json(station_leads);
    } catch (err) {
        res.status(400).json(err);
    }
}

const getAllOfficeLeads = async (req, res) => {
    try {
        let office_leads = await User.find({role: "office_lead"});
        for (let i = 0; i < office_leads.length; i++) {
            await Office.findById(office_leads[i].work_place).then(data => {
                console.log(data);
                office_leads[i].work_place_name = data.name;
            });
        }
        res.status(200).json(office_leads);
    } catch (err) {
        res.status(400).json(err);
    }
}

const getAllStaffAtStation = async (req, res) => {
    const id = req.cookies.work_place;
    try {
        let staffs = await User.find({role: "station_staff", work_place: id});
        for (let i = 0; i < staffs.length; i++) {
            await Station.findById(staffs[i].work_place).then(data => {
                staffs[i].work_place_name = data.name;
            });
        }
        res.status(200).json(staffs);
    } catch (err) {
        res.status(400).json(err);
    }
}

const getAllStaffAtOffice = async (req, res) => {
    const id = req.cookies.work_place;
    try {
        let staffs = await User.find({role: "office_staff", work_place: id});
        res.status(200).json(staffs);
    } catch (err) {
        res.status(400).json(err);
    }
}

const updateUser = async (req, res) => {
    try {
        const { name, sex, phone_number } = req.body;
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({message: "User not found"});
        await User.updateOne({"_id" : req.params.id},{$set: { name, sex, phone_number} });
        res.status(200).json({success:true, message: "User updated successfully"});
    } catch (error) {
        res.status(500).json({success:false, message: error.message});
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(user.role == "station_lead"){
            await Station.updateOne({"_id" : user.work_place},{$set: {station_lead: {id: null, name:null}} });
        }
        if(user.role == "office_lead"){
            await Office.updateOne({"_id" : user.work_place},{$set: {office_lead: {id: null, name:null}} });
        }
        if(!user) return res.status(404).json({message: "User not found"});
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({success: true,message: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

module.exports = {
    addUser,
    getUserInfoById,
    getAllUsers,
    getAllStationLeads,
    getAllOfficeLeads,
    getAllStaffAtStation,
    getAllStaffAtOffice,
    updateUser,
    deleteUser
}