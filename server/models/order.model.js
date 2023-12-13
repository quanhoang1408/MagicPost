const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    code: {
        type: String,
        require: true,
    },
    start_office: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Office',
        require: true,
    },
    end_office: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Office',
        require: true,
    },
    status: {
        type: String,
        require: true,
    },
    start_station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station'
    },
    end_station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station'
    },
    creator : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    sender : {
        name: {
            type: String,
            require: true,
        },
        phone: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        address: {
            type: String,
            require: true,
        }
    },
    receiver : {
        name: {
            type: String,
            require: true,
        },
        phone: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        address: {
            type: String,
            require: true,
        }
    },
    logs: {
        type: Array,
        require: false,
    },
})

module.exports = mongoose.model('Order', orderSchema);