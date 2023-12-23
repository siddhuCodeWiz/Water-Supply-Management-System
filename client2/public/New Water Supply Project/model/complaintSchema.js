const mongoose = require('mongoose')
const{Schema} = mongoose;

const ComplaintSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    houseid: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    mobile: {
        type: Number,
        required: false
    },
    complaint: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ComplaintModel = mongoose.model('complaints', ComplaintSchema);

module.exports = ComplaintModel;