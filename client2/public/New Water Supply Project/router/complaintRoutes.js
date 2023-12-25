const express = require('express');
const router = express.Router();

const {getComplaint, postComplaint, getComplaintOfUser} = require('../controller/complaint');

router.get("/getcomplaints", getComplaint);
router.post("/postcomplaint", postComplaint);
router.post("/usercomplaint", getComplaintOfUser);

module.exports = router;