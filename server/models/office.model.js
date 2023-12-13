const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const officeSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    office_lead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        require: true,
    }
})

module.exports = mongoose.model('Office', officeSchema);