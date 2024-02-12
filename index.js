const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const machineRoutes = require('./routes/machineRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// app.use('/api/users', userRoutes);
app.use('/api', userRoutes);
app.use('/api', machineRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
