const sql = require('mssql');

const config = {
    user: 'sa',
    password: 'asksrf@7528',
    server: 'SRVIFG2016',
    database: 'IFGDBTest',
    options: {
        encrypt: false, // For Azure databases, set this to true
        trustedConnection: true
    }
};

async function getAllUsers(userId = null){
    try {
        await connectToDatabase();
        const res = await queryDatabase();
        return res;
    }
    catch(err) {
        console.error('Error executing query:', err);
        throw err;
    } finally{
        await closeConnection();
    }
}

async function connectToDatabase() {
    try {
        await sql.connect(config);
        console.log('Connected to the database');
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
}

async function queryDatabase(UserId = null) {
    try {
        var condition;
        if(UserId != null)
            condition = `where UserId = ${UserId}`;
        const result = await sql.query(`SELECT * FROM Users ${condition}`);
        return result.recordset;
    } catch (err) {
        console.error('Error executing query:', err);
    }
}

async function closeConnection() {
    try {
        await sql.close();console.log('Connection Closed.');
    } catch (err) {
        console.error('Error closing connection:', err);
    }
}

module.exports = { getAllUsers,closeConnection,connectToDatabase }