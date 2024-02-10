const dbConn = require('../api');


async function getAllFixedAssets(){
    return dbConn.retrieveData(`SELECT * FROM FixedAssets where isDeleted != 1`);
}

async function getMachineLocationHistories(){
    return dbConn.retrieveData(`SELECT * FROM LocationHistories where isDeleted != 1`);
}

module.exports = { getAllFixedAssets, getMachineLocationHistories}
