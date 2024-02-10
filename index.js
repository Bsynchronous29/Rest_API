    const api = require('./api');
    const userRoute = require('./routes/user');
    const machineRoute = require('./routes/machines');
    const cors = require('cors');
    const express = require('express');
    const app = express();
    const port = 8080;

    app.use(cors()); // Correct usage of cors middleware
    app.use(express.json());

    // Initialize user data
    // let users = api.getAllUsers(); // Assuming api.getAllUsers() returns an array of users

    // ... (other routes)

    app.get('/api/users', async (req, resp) => {
        try {
            const users = await userRoute.getAllUsers();
            resp.send(users);
        } catch (err) {
            console.error('Error getting users:', err);
            resp.status(500).send('Internal Server Error');
        }
    });

    
    app.get('/api/machines', async (req, resp) => {
        try {
            const machines = await machineRoute.getAllFixedAssets();
            resp.send(machines);
        } catch (err) {
            console.error('Error getting users:', err);
            resp.status(500).send('Internal Server Error');
        }
    });

    app.get('/api/machine-location-histories', async (req, resp) => {
        try {
            const machines = await machineRoute.getMachineLocationHistories();
            resp.send(machines);
        } catch (err) {
            console.error('Error getting users:', err);
            resp.status(500).send('Internal Server Error');
        }
    });

    // app.get('/api/users/:id', async (req, resp) => {
    //     try {
    //         const users = await api.getAllUsers();
    //         const userId = parseInt(req.params.id);
    //         const user = users.find(u => u.UserId === userId);

    //         if (!user) {
    //             resp.status(404).send('User not found');
    //         } else {
    //             resp.send(user);
    //         }
    //     } catch (err) {
    //         console.error('Error getting users:', err);
    //         resp.status(500).send('Internal Server Error');
    //     }
    // });

    // app.get('/api/users/:username', async (req, resp) => {
    //     try {
    //         const users = await api.getAllUsers();
    //         const userName = parseInt(req.params.username);
    //         const user = users.find(u => u.Username === userName);

    //         if (!user) {
    //             resp.status(404).send('User not found');
    //         } else {
    //             resp.send(user);
    //         }
    //     } catch (err) {
    //         console.error('Error getting users:', err);
    //         resp.status(500).send('Internal Server Error');
    //     }
    // });

    // ... (other routes)

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
