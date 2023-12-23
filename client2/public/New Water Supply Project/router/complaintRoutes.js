const express = require('express');
const router = express.Router();

const {getComplaint, postComplaint} = require('../controller/complaint');

router.get("/getcomplaints", getComplaint);
router.post("/postcomplaint", postComplaint);

module.exports = router;