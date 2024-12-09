const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boxSchema = new Schema({
    brand: {
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

module.exports = mongoose.model('Box', boxSchema);