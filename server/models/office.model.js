const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const officeSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    office_lead: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: false,
        },
        name: {
            type: String,
            require: false,
        },
    },
    station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        require: true,
    },
    station_name:{
        type: String,
        require: false,
    },
    address: {
        type: String,
        require: true,
    },
    create_date: {
        type: Date,
        default: Date.now,
    },
    phone_number: {
        type: String,
        require: true,
    }
})

module.exports = mongoose.model('Office', officeSchema);