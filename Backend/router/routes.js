const express = require('express')
const {addPoint, getData, addLine,getlinedata} = require('../controller/addPointCor.js')
const updatedata = require('../controller/updatedata.js')
const router = express.Router();

router.post('/addpoint', addPoint);
router.get('/getdata', getData);
router.post('/addline', addLine);
router.get('/getlinedata',getlinedata);
router.post('/updatepoint', updatedata);

module.exports = router;