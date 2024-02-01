const ComplaintModel = require('../model/complaintSchema');
const acceptedConnectionsModel = require('../model/AcceptedConnections');

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
    const { name, canId, email, mobile, subject, description, resolved } = req.body;

    try {
        const addcomplaint = await ComplaintModel.create({ name, canId, email, mobile, subject, description, resolved });
        res.status(200).json(addcomplaint);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// '/complaints/:id', 
const handlecomplaint =async (req, res) => {
    console.log(req.body);
    const { _id } = req.body;
    // console.log(_id);
    try {
    //     const data = {resolved: "yes"};
    //   await ComplaintModel.findByIdAndUpdate('65aa99613e01c682f451a2a9',data,{new:true});
    const updateData = { resolved: "yes" };
    await ComplaintModel.findByIdAndUpdate(_id,updateData,{new:true}
    );
      res.status(200).json({ message: 'Complaint status updated' });
    } catch (e) {
      res.json({ error: 'Error updating complaint status',e });
      console.log(e);
    }
  };

  const searchCanId = async(req,res)=>{
    const {can} = req.params;
    try{
        const response = await acceptedConnectionsModel.findOne({can:can});
        if(!response){
            return res.status(400).json("No such can id found");
        }
        res.status(200).json(response)
  
    }
    catch(error){
        res.status(400).json("Error while getting can id");
    }
}


module.exports = {getComplaint, postComplaint, getComplaintOfUser, handlecomplaint, searchCanId}