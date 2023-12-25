const ComplaintModel = require('../model/complaintSchema');

const getComplaint = async (req, res) => {
    try {
        const complaints = await ComplaintModel.find({}).sort({ createdAt: -1 });
        res.status(200).json(complaints);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const getComplaintOfUser = async (req, res) => {
    try {
        const {name} = req.body;
        const complaints = await ComplaintModel.find({"name":name}).sort({ createdAt: -1 });
        res.status(200).json(complaints);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const postComplaint = async (req, res) => {
    const { name, houseid, email, mobile, subject, description, resolved } = req.body;

    try {
        const addcomplaint = await ComplaintModel.create({ name, houseid, email, mobile, subject, description, resolved });
        res.status(200).json(addcomplaint);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = {getComplaint, postComplaint, getComplaintOfUser}