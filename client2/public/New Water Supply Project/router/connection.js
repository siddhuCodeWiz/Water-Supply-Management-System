const express = require('express');
const router = express.Router();

const {addConnection, searchConnection} = require('../controller/connections')

router.post("/addconnection", addConnection);
router.post("/searchuserconnection", searchConnection)

module.exports = router;