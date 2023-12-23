const mongoose = require('mongoose')
const{Schema} = mongoose;

const pointSchema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    },
    properties: {
        name: String,
        description: String,
        supplied: String
    }
});


const pointModel = mongoose.model('points', pointSchema);

module.exports = pointModel;