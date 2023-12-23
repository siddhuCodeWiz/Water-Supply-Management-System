const express = require('express');
const router = require('./router/routes.js')
const databaseConnect = require('./config/databaseConfig.js')
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
databaseConnect();

app.use('/api', router);

app.use('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Sucessfully connected"
    });
})

module.exports = app;