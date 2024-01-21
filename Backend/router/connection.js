const express = require('express');
const router = express.Router();

const {addConnection, searchConnection, receivedConnections, acceptConneciton, AcceptedConnectionsList} = require('../controller/connections')

// url is forwarded by connection/

// citizen
router.post("/addconnection", addConnection);
router.get("/searchuserconnection/:name", searchConnection)//not working

//admin
router.get("/receivedconnections", receivedConnections)
router.delete("/acceptconnection/:id", acceptConneciton)
router.get("/acceptedconnectionslist", AcceptedConnectionsList)

module.exports = router;