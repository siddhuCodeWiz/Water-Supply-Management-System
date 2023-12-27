const express = require('express');
const router = express.Router();

const {getComplaint, postComplaint, getComplaintOfUser, handlecomplaint} = require('../controller/complaint');

router.get("/getcomplaints", getComplaint);
router.post("/postcomplaint", postComplaint);
router.post("/usercomplaint", getComplaintOfUser);
router.put("/complaints/${complaintId}", handlecomplaint)

module.exports = router;