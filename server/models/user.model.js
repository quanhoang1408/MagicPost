const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        require: [true,"Email is required"],
        trim: true,
        unique: true,
    },
    name: {
        type: String,
        require: [true,"Name is required"],
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        require: [true,"Password is required"],
        trim: true
    },
    role: {
        type: String,
        require: true
    },
    work_place: {
        type: mongoose.Schema.Types.ObjectId,
        rel: ['Office','Station'],
        require: false
    },
    work_place_name: {
        type: String,
        require: false
    },
});

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 14);
});

module.exports = mongoose.model('User', userSchema);