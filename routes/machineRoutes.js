const dbConn = require('../api');
const express = require('express');

const router = express.Router();

router.get('/machines', async (req, resp) => {
    try {
        const machines = await getAllFixedAssets();
        resp.send(machines);
    } catch (err) {
        console.error('Error getting machines:', err);
        resp.status(500).send('Internal Server Error');
    }
});

router.get('/machine-location-histories', async (req, resp) => {
    try {
        const machines = await getMachineLocationHistories();
        resp.send(machines);
    } catch (err) {
        console.error('Error getting machine location histories:', err);
        resp.status(500).send('Internal Server Error');
    }
});

async function getAllFixedAssets(){
    return dbConn.retrieveData(`SELECT * FROM FixedAssets where isDeleted != 1`);
}

async function getMachineLocationHistories(){
    return dbConn.retrieveData(`SELECT * FROM LocationHistories where isDeleted != 1`);
}

module.exports = router;
