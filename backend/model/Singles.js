const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const singleSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    sport: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Single', singleSchema);