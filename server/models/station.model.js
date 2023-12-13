const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stationSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    station_lead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: false,
    },
    address: {
        type: String,
        require: false,
    },
})

module.exports = mongoose.model('Station', stationSchema);