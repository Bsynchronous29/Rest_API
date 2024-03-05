const dbConn = require('../api');
const express = require('express');

const router = express.Router();

router.get('/projects', async (req, resp) => {
    try {
        const projects = await getProjects();
        resp.send(projects);
    } catch (err) {
        console.error('Error getting projects:', err);
        resp.status(500).send('Internal Server Error');
    }
});

router.get('/projects/:id', async (req, resp) => {
    try {
        const projects = await getProjects();

        fetchid=req.params.id;
        projects.find(({id:fetchid}),function(err,val){
            resp.send(val);
        });
        // resp.send(projects);
    } catch (err) {
        console.error('Error getting projects:', err);
        resp.status(500).send('Internal Server Error');
    }
});

router.get('/project/search', async (req, res) => {
    try {
        console.log('project search');
        const { keyword, status } = req.query;
        // Assuming getAllMachines() is a function that retrieves all machines from the database
        const projects = await searchProject(projectNo)

        // Filter machines based on search criteria
        const filteredProjects = projects.filter(machine => {
            // Check if keyword matches machine name or description
            const matchesKeyword = projects.ProjectNo.includes(keyword) || projects.Name.includes(keyword);
            // Check if machine status matches the provided status
            const matchesStatus = status ? projects.status === status : true;

            return matchesKeyword && matchesStatus;
        });

        res.json(filteredProjects);
        console.log(filteredProjects);
    } catch (err) {
        console.error('Error searching machines:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/projects/search/project=:projectNo', async (req, resp) => {
    try {
        const projectNo = req.params.projectNo;

        console.log(`Project Search ${projectNo}`);
        const projects = await searchProject(projectNo);
        resp.send(projects);
    } catch (err) {
        console.error('Error getting machines:', err);
        resp.status(500).send('Internal Server Error');
    }
    
});

async function getProjects(){
    return dbConn.retrieveData(`SELECT * FROM Projects where isDeleted != 1`);
}

async function searchProject(searchString){
    var temp = `SELECT * FROM Projects where isDeleted != 1 and 
    ProjectNo like '%${searchString}%' or 
    Name like '%${searchString}%' or 
    WorkScope like '%${searchString}%' or 
    FileName like '%${searchString}%' order by projectid desc`;
    console.log(temp);
    return dbConn.retrieveData(temp);
}

module.exports = router;
