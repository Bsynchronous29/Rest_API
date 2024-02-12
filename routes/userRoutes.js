const dbConn = require('../api');
const express = require('express');

const router = express.Router();

router.get('/users', async (req, resp) => {
    try {
        users = await getAllUsers();
        resp.send(users);
    } catch (err) {
        console.error('Error getting users:', err);
        resp.status(500).send('Internal Server Error');
    }
});

function getUsers(){
    return users;
}

router.get('/users/id=:id', async (req, resp) => {
    try {
        const users = await getAllUsers();
        resp.send(users);
    } catch (err) {
        console.error('Error getting users:', err);
        resp.status(500).send('Internal Server Error');
    }
});

router.get('/users/:username', async (req, resp) => {
    try {
        const users = await getAllUsers();
        const userName = parseInt(req.params.username);
        const user = users.find(u => u.Username === userName);

        if (!user) {
            resp.status(404).send('User not found');
        } else {
            resp.send(user);
        }
    } catch (err) {
        console.error('Error getting users:', err);
        resp.status(500).send('Internal Server Error');
    }
});

async function getAllUsers(){
    users = dbConn.retrieveData(`Select * from Users WHERE isDeleted != 1`);
    return getUsers();
}

module.exports = router;
module.exports.getAllUsers = getAllUsers();
module.exports.getUsers = getUsers();

// const express = require('express');
// const router = express.Router();
// const swaggerJSDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

// const options = {
//     definition : {
//         openapi : '3.0.0',
//         info: {
//             title: 'Node JS Api Project',
//             version: '1.0.0'
//         },
//         servers: [
//             {
//                 api: 'http//localhost:3030/'
//             },
//         ],
//         apis: ['./user.js']
//     }
// };

// const swaggerSpec = swaggerJSDoc(options);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.get('/', (req, res) => {
//     resp.send('Welcome to IFG API');
// });

// app.get('/api/users', (req, res) => {
//     database.collection('user').find({}).toArray((err, result) => {
//         if(err) throw err
//         resp.send(result)
//     }) 
// });

// const getData = () => {
//     return [
//         { user: 'root', password: 'root' },
//         { user: 'admin', password: 'admin' }
//     ];
// };

// router.get('/', (req, res) => {
//     const data = getData();
//     res.json(data);
// });

// Export the getData function for use in index.js
// module.exports = { getData, router };
