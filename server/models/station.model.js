const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stationSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    station_lead: {
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
    address: {
        type: String,
        require: false,
    },
    create_date: {
        type: Date,
        default: Date.now,
    },
    phone_number: {
        type: String,
        require: false,
    },
})

module.exports = mongoose.model('Station', stationSchema);