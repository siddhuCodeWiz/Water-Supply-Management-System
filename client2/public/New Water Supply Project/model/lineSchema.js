const mongoose = require('mongoose')
const{Schema} = mongoose;

const lineSchema = new Schema({
    type: {
        type: String,
        enum: ['LineString'],
        default: 'LineString',
        required: true
    },
    coordinates: {
        type: [[Number]],
        required: true
    },
    properties: {
        name: String,
        description: String,
        supplied: String
    }
})

const lineModel = mongoose.model('lines', lineSchema);

module.exports = lineModel;