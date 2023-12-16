const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const station = new Schema({
    station_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        require: true
    },
    received_time: {
        type: Date,
        require: true,
        default: null
    },
    send_time: {
        type: Date,
        require: true,
        default: null
    },
    staff_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
        default: null
    }
}, {
    _id: false
})

const office = new Schema({
    office_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Office',
        require: true
    },
    received_time: {
        type: Date
    },
    send_time: {
        type: Date
    },
    staff_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    _id: false

})

const client = new Schema({
    name: String,
    phone: String,
    email: String,
    address: String
}, {
    _id: false
})

const orderSchema = new Schema({
    code: {
        type: String,
        require: true,
        unique: true,
    },
    start_office: {
        type: office,
        require: true
    },
    end_office: {
        type: office
    },
    stations: {
        type: [station],
        require: false
    },
    sender : {
        type: client,
        require: true
    },
    receiver : {
        type: client,
        require: true
    },
    contents: {
        type: String,
        require: false,
    },
    weight: {
        type: Number,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
})

module.exports = mongoose.model('Order', orderSchema);