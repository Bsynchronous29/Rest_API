const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const machineRoutes = require('./routes/machineRoutes');
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
// const ipAddress = '94.201.146.218';
const port = 8888;

app.use(cors());

// app.use('/api/users', userRoutes);

app.get('/', function(req, res) {
    const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;
    res.send(ipAddress);
  });

app.use('/api', userRoutes);
app.use('/api', machineRoutes);
app.use('/api', projectRoutes);
app.use('/auth', authRoutes);

// app.listen(port, ipAddress, () => {
//     console.log(`Server is running on ${ipAddress}:${port}`);
// });

// app.listen(443, '94.201.146.218', function() {

//     console.log('Server is listening on port 443 and IP address 94.201.146.218');
  
//   });

// app.listen()

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});