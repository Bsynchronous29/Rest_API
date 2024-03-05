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

router.get('/machines/projectNo=:projectNo', async (req, resp) => {
    try {
        const projectNo = req.params.projectNo;
        const machines = await getMachinesByProject(projectNo);
        resp.send(machines);
    } catch (err) {
        console.error('Error getting machines:', err);
        resp.status(500).send('Internal Server Error');
    }
    
});

router.get('/machines/search', async (req, res) => {
    try {
        console.log('machine search');
        const { keyword, status } = req.query;
        // Assuming getAllMachines() is a function that retrieves all machines from the database
        const machines = await getAllMachines();

        // Filter machines based on search criteria
        const filteredMachines = machines.filter(machine => {
            // Check if keyword matches machine name or description
            const matchesKeyword = machine.name.includes(keyword) || machine.description.includes(keyword);
            // Check if machine status matches the provided status
            const matchesStatus = status ? machine.status === status : true;

            return matchesKeyword && matchesStatus;
        });

        res.json(filteredMachines);
    } catch (err) {
        console.error('Error searching machines:', err);
        res.status(500).send('Internal Server Error');
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

async function getMachinesByProject(projectNo){
    return dbConn.retrieveData(`SELECT * FROM FixedAssets where ProjectNo like '%${projectNo}%'`);
}

async function getMachineLocationHistories(){
    return dbConn.retrieveData(`SELECT * FROM LocationHistories where isDeleted != 1`);
}

module.exports = router;
